import React from "react";
import Recorder from "./components/Recorder";

export default function App() {
  return (
    <main>
      <h1>UrbanSound Audio Classifier</h1>
      <p>Graba un audio y se enviará a la Lambda.</p>
      <Recorder />
    </main>
  );
}
