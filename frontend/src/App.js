import { useState } from "react";
import "./App.css";

import UploadSection from "./components/UploadSection";
import OverviewDashboard from "./components/OverviewDashboard";
import ArchitectureView from "./components/ArchitectureView";
import FileExplorer from "./components/FileExplorer";
import ChatSystem from "./components/ChatSystem";
import AnalysisReport from "./components/AnalysisReport";
import DocumentationPanel from "./components/DocumentationPanel";

function App() {
  const [files, setFiles] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="app-container">
      <h1 className="app-title">Explain My System</h1>

      <div className="card">
        <UploadSection
          onFilesSelected={setFiles}
          onAnalyze={() => setAnalyzed(true)}
          files={files}
        />
      </div>

      {analyzed && files.length > 0 && (
        <>
          <div className="card"><OverviewDashboard files={files} /></div>
          <div className="card"><ArchitectureView files={files} /></div>

          <div
            className="card"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px" }}
          >
            <FileExplorer files={files} />
            <ChatSystem files={files} />
          </div>

          <div className="card"><AnalysisReport files={files} /></div>
          <div className="card"><DocumentationPanel files={files} /></div>
        </>
      )}

      <div className="footer">
        AI Project Understanding Tool
      </div>
    </div>
  );
}

export default App;
