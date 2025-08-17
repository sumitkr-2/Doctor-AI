// import { useState } from "react";
// import axios from "axios";

// export default function ChatBox() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       console.log("👉 Sending question:", userMsg.text);

//       const res = await axios.post("http://127.0.0.1:5000/api/ask", {
//         question: userMsg.text,
//       });

//       const botMsg = { sender: "bot", text: res.data.answer };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       console.error("❌ Error from backend:", err);
//       const errorMsg = { sender: "bot", text: "⚠️ Error: Could not reach doctor!" };
//       setMessages((prev) => [...prev, errorMsg]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ width: "400px", border: "1px solid gray", padding: "10px", borderRadius: "10px" }}>
//       <div style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}>
//         {messages.map((msg, i) => (
//           <p key={i} style={{ color: msg.sender === "user" ? "blue" : "green" }}>
//             <b>{msg.sender}:</b> {msg.text}
//           </p>
//         ))}
//         {loading && <p style={{ color: "gray" }}>🤖 Doctor is thinking...</p>}
//       </div>
//       <div style={{ display: "flex", gap: "5px" }}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your symptoms..."
//           style={{ flex: 1, padding: "5px" }}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }
