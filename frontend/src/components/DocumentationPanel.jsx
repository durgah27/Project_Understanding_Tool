import { useState } from "react";
import { generateDoc } from "../services/api";

function DocumentationPanel() {
  const [output, setOutput] = useState("Generated documentation preview will appear here...");

  const runTask = async (task) => {
    try {
      setOutput("Generating...");
      const res = await generateDoc(task);
      setOutput(res.result);
    } catch (err) {
      console.log(err);
      setOutput("❌ Upload files first / backend issue.");
    }
  };

  return (
    <>
      <h3>Documentation Generator</h3>

      <button onClick={() => runTask("Generate README documentation")}>Generate README</button>{" "}
      <button onClick={() => runTask("Generate API documentation")}>Generate API Docs</button>{" "}
      <button onClick={() => runTask("Generate setup guide")}>Generate Setup Guide</button>

      <div className="output-box">{output}</div>
    </>
  );
}

export default DocumentationPanel;
