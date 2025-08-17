// src/components/HealthTips.jsx
import React, { useEffect, useState } from "react";
import "./css/HealthTips.css";
import healthTipsData from "../../../backend/database/healthTips.json";

export default function HealthTips() {
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setTips(healthTipsData);
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped); // toggle flip on each click

    if (flipped) {
      // If it was already flipped (back shown), move to next tip
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }
    // Otherwise just flip to back and wait
  };

  if (tips.length === 0) return null;

  const currentTip = tips[currentTipIndex];

  return (
    <div className="health-tips-container" id="health-tip">
      <h2 className="tips-title">💡 Health Tips</h2>
      <div className="flip-card-single" onClick={handleFlip}>
        <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
          <div className="flip-card-front">
            <h3 className="tip-title">{currentTip.title}</h3>
          </div>
          <div className="flip-card-back">
            <p className="tip-desc">{currentTip.description}</p>
          </div>
        </div>
      </div>
      <button className="flip-btn" onClick={handleFlip}>
        {flipped ? "Next Tip" : "Show Tip"}
      </button>
    </div>
  );
}
