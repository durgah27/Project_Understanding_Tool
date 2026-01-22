import { useState } from "react";
import { askQuestion } from "../services/api";

function ChatSystem() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("System response will appear here...");

  const handleAsk = async () => {
    try {
      setAnswer("Thinking...");
      const res = await askQuestion(question);
      setAnswer(res.answer);
    } catch (err) {
      console.log(err);
      setAnswer("❌ Backend not connected / upload files first.");
    }
  };

  return (
    <div>
      <h3>Ask About Your System</h3>
      <input
        type="text"
        placeholder="Ask something about your project..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk}>Send</button>

      <div className="output-box">{answer}</div>
    </div>
  );
}

export default ChatSystem;
