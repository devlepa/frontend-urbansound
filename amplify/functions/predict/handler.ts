import type { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("event", JSON.stringify(event));

  let length = 0;

  try {
    if (event.body) {
      const body = JSON.parse(event.body);
      if (Array.isArray(body.audio)) {
        length = body.audio.length;
      }
    }
  } catch (err) {
    console.error("Error parseando body", err);
  }

  return {
    statusCode: 200,
    // CORS básico, luego lo puedes ajustar
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({
      message: "Audio recibido correctamente desde Lambda",
      length,
    }),
  };
};
