function ChatSystem() {
  return (
    <div>
      <h3>Ask About Your System</h3>
      <input type="text" placeholder="Ask something about your project..." />
      <button>Send</button>

      <div className="output-box">
System response will appear here...
      </div>
    </div>
  );
}

export default ChatSystem;
