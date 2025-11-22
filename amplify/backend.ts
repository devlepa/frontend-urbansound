import { defineBackend } from '@aws-amplify/backend';
import { restApi } from '@aws-amplify/backend';
import { auth } from './auth/resource';

const backend = defineBackend({
  auth,
  api: restApi({
    name: "urbansoundAPI",
    routes: {
      "/predict": {
        method: "POST",
        function: "./lambda/predict",
      },
    },
  }),
});

export default backend;
