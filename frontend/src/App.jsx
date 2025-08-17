// src/App.jsx
import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "doctor", text: "Hello! I'm Dr. Sumit . Tell me your symptoms or press the mic to speak." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize SpeechRecognition if available
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
      rec.onerror = (e) => {
        console.error("Speech recognition error:", e);
        setListening(false);
      };
      recognitionRef.current = rec;
    }
  }, []);

  // Speak text using Web Speech API
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      // pick first en voice if available
      const enVoice = voices.find(v => v.lang?.startsWith("en")) || voices[0];
      if (enVoice) utter.voice = enVoice;
      utter.rate = 1;
      utter.pitch = 1;
      window.speechSynthesis.cancel(); // stop previous speeches
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.error("TTS error:", e);
    }
  };

  // Toggle microphone
  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    try {
      if (listening) {
        rec.stop();
        setListening(false);
      } else {
        rec.start();
        setListening(true);
      }
    } catch (e) {
      console.error(e);
      setListening(false);
    }
  };

  // Send message (text or from mic)
  const handleSend = async (textArg) => {
    const text = (textArg !== undefined ? textArg : input).trim();
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

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server ${res.status}: ${txt}`);
      }

      const data = await res.json();
      const botReply = data.response || data.reply || "Sorry, no reply.";
      setMessages(prev => [...prev, { sender: "doctor", text: botReply }]);

      // Speak reply
      speakText(botReply);
    } catch (err) {
      console.error("Network/backend error:", err);
      setMessages(prev => [...prev, { sender: "system", text: "⚠️ Backend error. Check server console." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Dr. AI Assistant</h1>

        <div className="doctor-area">
          <img src="/doc.gif" alt="Doctor" className="doctor-gif" />
        </div>

        <div className="chat-card">
          <div className="messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.sender === "user" ? "msg-user" : m.sender === "doctor" ? "msg-doctor" : "msg-system"}`}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesRef} />
          </div>

          <div className="composer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type symptoms (e.g. 'fever and cough')..."
              className="input"
            />
            <button onClick={() => handleSend()} className="btn send" disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
            <button onClick={toggleListening} className={`btn mic ${listening ? "listening" : ""}`}>
              {listening ? "🛑" : "🎤"}
            </button>
          </div>
        </div>

        <div className="note">Tip: Use the mic button to speak. Doctor will respond by voice too.</div>
      </div>
    </div>
  );
}

