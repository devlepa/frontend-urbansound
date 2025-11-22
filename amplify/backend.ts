import { defineBackend, defineFunction } from '@aws-amplify/backend';

export const backend = defineBackend({
  predictfunction: defineFunction({
    name: "predictfunction",
    entry: "./amplify/lambda/predict/index.mjs",
    runtime: "nodejs18.x",
  }),
});
