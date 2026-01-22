import { useState } from "react";
import { generateDoc } from "../services/api";

function DocumentationPanel() {
  const [output, setOutput] = useState("");

  const run = async (task) => {
    try {
      setOutput("Generating...");
      const res = await generateDoc(task);
      setOutput(res.result);
    } catch (err) {
  console.log(err);
  setOutput("❌ Error: " + (err.response?.data?.error || err.message));
}

  };

  return (
    <>
      <h3>Documentation Generator</h3>

      <button onClick={() => run("Generate a project summary (6-8 lines)")}>
        Summary
      </button>{" "}
      <button onClick={() => run("Explain workflow step-by-step")}>
        Workflow
      </button>{" "}
      <button onClick={() => run("List modules/components with 1 line each")}>
        Modules
      </button>{" "}
      <button onClick={() => run("Explain system architecture and data flow")}>
        Architecture
      </button>{" "}
      <button onClick={() => run("Generate 10 viva questions and answers")}>
        Viva Q&A
      </button>

      <div className="output-box">{output}</div>
    </>
  );
}

export default DocumentationPanel;
