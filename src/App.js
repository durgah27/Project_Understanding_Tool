import "./App.css";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Explain My System</h1>

      <div className="card">
        <FileUpload />
      </div>

      <div className="card">
        <ChatBox />
      </div>

      <div className="footer">
        AI Project Understanding Tool
      </div>
    </div>
  );
}

export default App;
