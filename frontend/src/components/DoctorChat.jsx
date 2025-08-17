import React, { useState, useEffect, useRef } from "react";
import micIcon from "../assets/mic.gif";   // Mic icon
import stopIcon from "../assets/stop.gif"; // Optional stop icon
import "./css/DoctorChat.css";

export default function DoctorChat() {
  const [messages, setMessages] = useState([
    { sender: "doctor", text: "Hello! I'm Dr. Sumit. Tell me your symptoms or press the mic to speak." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SpeechRecognition init
  useEffect(() => {
    const WinSpeech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (WinSpeech) {
      const rec = new WinSpeech();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (ev) => {
        const text = ev.results[0][0].transcript;
        setInput(text);
        handleSend(text);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  // Speak text
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utter.voice = voices.find(v => v.lang?.startsWith("en")) || voices[0];
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // Mic toggle
  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      rec.start();
      setListening(true);
    }
  };

  // Send message
  const handleSend = async (textArg) => {
    const text = (textArg ?? input).trim();
    if (!text) return;

    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      const botReply = data.response || data.reply || "Sorry, no reply.";
      setMessages(prev => [...prev, { sender: "doctor", text: botReply }]);
      speakText(botReply);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "system", text: "⚠️ Backend error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-chat-container">
      
      {/* Doctor Avatar */}
      <div className="doctor-avatar">
        <img src="/doc.gif" alt="Doctor" className="avatar-img" />
        <div className="doctor-name">Dr. Sumit</div>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message-bubble ${
              m.sender === "user"
                ? "user-msg"
                : m.sender === "doctor"
                ? "doctor-msg"
                : "system-msg"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="loader">
            <span className="dot delay-0"></span>
            <span className="dot delay-1"></span>
            <span className="dot delay-2"></span>
            <span className="loader-text">Doctor is thinking...</span>
          </div>
        )}

        <div ref={messagesRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type symptoms..."
          className="chat-input"
        />
        <button
          onClick={() => handleSend()}
          className="send-btn"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
        <button
          onClick={toggleListening}
          className={`mic-btn ${listening ? "listening" : ""}`}
        >
          <img src={listening ? stopIcon : micIcon} alt="mic" className="mic-img" />
        </button>
      </div>
    </div>
  );
}
