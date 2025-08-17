import React, { useState } from "react";
import "./css/MedicineSlider.css";

import ParacetamolImg from "../assets/paracetamol.jpg";
import IbuprofenImg from "../assets/ibuprofen.jpg";
import AmoxicillinImg from "../assets/amoxicillin.jpg";
import BenadrylImg from "../assets/benadryl.jpg";
import CofsilsImg from "../assets/cofsils.jpg";
import VitaminCImg from "../assets/vitamin-c.jpg";

const medicines = [
  { name: "Paracetamol", price: "$5", description: "Pain reliever.", image: ParacetamolImg },
  { name: "Ibuprofen", price: "$6", description: "Reduces inflammation.", image: IbuprofenImg },
  { name: "Amoxicillin", price: "$10", description: "Antibiotic.", image: AmoxicillinImg },
  { name: "Benadryl", price: "$7", description: "Relieves allergy.", image: BenadrylImg },
  { name: "Cofsils", price: "$4", description: "Cough suppressant.", image: CofsilsImg },
  { name: "Vitamin C", price: "$8", description: "Boosts immunity.", image: VitaminCImg }
];

export default function MedicineSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 3) % medicines.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 3 + medicines.length) % medicines.length);
  };

  const getVisibleSlides = () => {
    let slides = [];
    for (let i = 0; i < 3; i++) {
      slides.push(medicines[(index + i) % medicines.length]);
    }
    return slides;
  };

  return (
    <div className="slider-wrapper" id="buy-med">
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="cards-container">
        {getVisibleSlides().map((med, i) => (
          <div key={i} className="card">
            <img src={med.image} alt={med.name} />
            <h3>{med.name}</h3>
            <p>{med.description}</p>
            <p className="price">{med.price}</p>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}
