import { useState } from "react";
import { askQuestion } from "../services/api";

function ChatSystem() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");

  const send = async () => {
    try {
      setAns("Thinking...");
      const res = await askQuestion(q);
      setAns(res.answer); // ✅ REAL AI answer
    } catch (err) {
      console.error(err);
      setAns("❌ Backend error / upload files first.");
    }
  };

  return (
    <div>
      <h3>Ask About Your System</h3>

      <input
        type="text"
        placeholder="Ask something about your project..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <button onClick={send}>Send</button>

      <div className="output-box">{ans}</div>
    </div>
  );
}

export default ChatSystem;
