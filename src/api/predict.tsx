import { post } from "aws-amplify/api";

export async function sendAudio(blob: Blob) {
  const buffer = await blob.arrayBuffer();
  const uint8 = Array.from(new Uint8Array(buffer));

  const { body } = await post({
    apiName: "UrbanSoundApi",   // mismo nombre que RestApi.restApiName
    path: "/predict",
    options: {
      body: { audio: uint8 },
    },
  }).response;

  const data = await body.json();
  console.log("Respuesta Lambda:", data);
  return data;
}
