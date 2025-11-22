import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import {
  RestApi,
  LambdaIntegration,
  Cors,
  AuthorizationType,
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { predictFunction } from "./functions/predict/resource";

const backend = defineBackend({
  auth,
  data,
  predictFunction, // nuestra Lambda
});

// ====== API GATEWAY + RUTA /predict ======

const apiStack = backend.createStack("urbansound-api-stack");

const restApi = new RestApi(apiStack, "UrbanSoundApi", {
  restApiName: "UrbanSoundApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,   // luego lo puedes restringir
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

const lambdaIntegration = new LambdaIntegration(
  backend.predictFunction.resources.lambda
);

// /predict (POST) protegido con IAM (lo usa el cliente Amplify)
const predictPath = restApi.root.addResource("predict", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
});

predictPath.addMethod("POST", lambdaIntegration);

// ====== PERMISOS IAM PARA QUE TU APP PUEDA INVOCAR EL API ======

const apiPolicy = new Policy(apiStack, "UrbanSoundApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        restApi.arnForExecuteApi("POST", "/predict", "dev"),
        restApi.arnForExecuteApi("POST", "/predict/*", "dev"),
      ],
    }),
  ],
});

// Damos permiso a usuarios autenticados y no autenticados
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiPolicy);

// ====== EXPORTAR INFO DEL API PARA EL FRONTEND ======

backend.addOutput({
  custom: {
    API: {
      [restApi.restApiName]: {
        endpoint: restApi.url,
        region: Stack.of(restApi).region,
        apiName: restApi.restApiName,
      },
    },
  },
});

export default backend;
