export const handler = async (event) => {
  console.log("Body recibido:", event.body);

  const body = JSON.parse(event.body || "{}");
  const audio = body.audio;

  console.log("Audio bytes length:", audio?.length);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: true,
      length: audio?.length || 0,
    }),
  };
};
