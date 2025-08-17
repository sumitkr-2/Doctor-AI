import React, { useState } from 'react';
import './css/MedicineRecommendation.css';

import ParacetamolImg from "../assets/paracetamol.jpg";
import IbuprofenImg from "../assets/ibuprofen.jpg";
import CoughSyrupImg from "../assets/cofsils.jpg"; // add this image in your assets

export default function MedicineRecommendation() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [image, setImage] = useState(null);

  const recommendMedicine = () => {
    const medicines = {
      fever: {
        text: "Paracetamol 500mg every 6–8 hours. Drink water.",
        image: ParacetamolImg
      },
      cough: {
        text: "Cough Syrup (Dextromethorphan) for dry cough.",
        image: CoughSyrupImg
      },
      headache: {
        text: "Ibuprofen 400mg or Paracetamol 500mg.",
        image: IbuprofenImg
      }
    };

    const recommendation = medicines[input.toLowerCase()];
    if (recommendation) {
      setOutput(recommendation.text);
      setImage(recommendation.image);
    } else {
      setOutput("No recommendation found. Consult a doctor.");
      setImage(null);
    }
  };

  return (
    <section className="medicine-section">
      <h2>Medicine Recommendation</h2>
      <div className="input-container">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter condition or symptom..."
        />
        <button onClick={recommendMedicine}>Get Recommendation</button>
      </div>

      {output && (
        <div className="recommendation-card">
          {image && <img src={image} alt="Medicine" />}
          <p>{output}</p>
        </div>
      )}
    </section>
  );
}
