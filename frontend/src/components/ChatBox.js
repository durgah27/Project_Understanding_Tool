function ChatBox() {
  return (
    <>
      <h3>Ask About Your Project</h3>
      <input type="text" placeholder="Ask something about your project..." />
      <button>Send</button>

      <div className="output-box">
        Output will appear here...
      </div>
    </>
  );
}

export default ChatBox;
