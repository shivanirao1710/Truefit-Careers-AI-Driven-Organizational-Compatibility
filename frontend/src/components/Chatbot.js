import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/chatbot", {
        user_input: userInput,
      });

      const botResponse = res.data.response;

      setChatHistory((prev) => [
        ...prev,
        { sender: "You", text: userInput },
        { sender: "Bot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }

    setUserInput("");
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chatbot</h1>

      {/* Chat messages */}
      <div className="chat-window">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message-box ${msg.sender === "You" ? "user" : "bot"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area always stays at bottom */}
      <form onSubmit={sendMessage} className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>

      <button className="btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default Chatbot;
