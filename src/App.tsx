import React from "react";
import Recorder from "./components/Recorder";
import "./App.css";

function App() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>UrbanSound Classifier 🔊</h1>
      <Recorder />
    </div>
  );
}

export default App;
