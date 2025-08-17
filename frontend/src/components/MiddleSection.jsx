import React from "react";
import MedicineSlider from "./MedicineSlider";
import "./css/MiddleSection.css";

export default function MiddleSection() {
  const redirectToAmazon = () => {
    window.open("https://www.amazon.in/pharmacy", "_blank");
  };

  return (
    <section className="middle-section">
      <div className="slider-container">
        <MedicineSlider />
      </div>
      <div className="button-container">
        <button className="amazon-btn" onClick={redirectToAmazon}>
          Buy Medicines on Amazon Pharmacy
        </button>
      </div>
    </section>
  );
}
