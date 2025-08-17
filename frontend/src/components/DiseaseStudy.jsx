// src/components/DiseaseStudy.jsx
import React from "react";
import "./css/DiseaseStudy.css";

const diseases = [
  { name: "Diabetes", link: "https://en.wikipedia.org/wiki/Diabetes" },
  { name: "Hypertension", link: "https://en.wikipedia.org/wiki/High_blood_pressure" },
  { name: "COVID-19", link: "https://en.wikipedia.org/wiki/COVID-19" },
  { name: "Asthma", link: "https://en.wikipedia.org/wiki/Asthma" },
  { name: "Heart Disease", link: "https://en.wikipedia.org/wiki/Heart_disease" },
];

export default function DiseaseStudy() {
  return (
    <div className="disease-study-container">
      <h2 className="disease-title">🩺 Study About Diseases</h2>
      <div className="disease-grid">
        {diseases.map((d, i) => (
          <a 
            key={i} 
            href={d.link} 
            className="disease-card" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <h3>{d.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
