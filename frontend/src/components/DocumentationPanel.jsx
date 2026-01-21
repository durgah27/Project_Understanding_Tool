function DocumentationPanel() {
  return (
    <>
      <h3>Documentation Generator</h3>

      <button>Generate README</button>{" "}
      <button>Generate API Docs</button>{" "}
      <button>Generate Setup Guide</button>

      <div className="output-box">
Generated documentation preview will appear here...
      </div>
    </>
  );
}

export default DocumentationPanel;
