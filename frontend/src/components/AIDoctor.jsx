import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function AIDoctor() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askAI = () => {
    if (!question) return setAnswer("Please type a question.");
    setAnswer(`AI Doctor: Based on your question "${question}", please consult a licensed physician for accurate guidance.`);
  };

  return (
    <section id="aidoctor" className="section aidoctor">
      <h2>AI Doctor 🤖</h2>
      <div className="ai-box">
        <FontAwesomeIcon icon={faRobot} size="5x" className="ai-icon" />
        <p>Ask the AI doctor your symptoms and get instant guidance.</p>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Type your question..." />
        <button onClick={askAI}>Ask</button>
        <div>{answer}</div>
      </div>
    </section>
  );
}
