import React, { useState } from "react";
import { classifyAudio } from "../api/predict";

const Recorder: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setPrediction(null);
  };

  const sendToAPI = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const result = await classifyAudio(file);
      setPrediction(result.prediction || JSON.stringify(result));
    } catch (err) {
      console.error(err);
      setPrediction("Error calling prediction API");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Clasificador UrbanSound</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />

      <button
        style={{
          marginTop: 15,
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onClick={sendToAPI}
        disabled={!file || loading}
      >
        {loading ? "Clasificando..." : "Enviar audio"}
      </button>

      {prediction && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#f0f0f0",
            borderRadius: 6,
          }}
        >
          <h3>Resultado</h3>
          <p style={{ fontWeight: 600 }}>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default Recorder;
