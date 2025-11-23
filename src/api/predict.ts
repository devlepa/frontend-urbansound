export async function classifyAudio(file: File) {
  const base64 = await fileToBase64(file);

  const res = await fetch(import.meta.env.VITE_API_URL + "/predict", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: base64,
  });

  if (!res.ok) {
    throw new Error("Error calling API");
  }

  return res.json();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
