import React from 'react';
import "./css/Home.css";
import Navbar  from './Navbar';
import DoctorChat from './DoctorChat';
import MedicineRecommendation from './MedicineRecommendation';
import MedicineSlider from './MedicineSlider';

export default function Home() {
  return (
    <>
    <div>
        <Navbar/>
      <section id="home" className="section home">
        <h1>Welcome to Home-AI 💊</h1>
         
         {/* Horizontal container */}
      <div className="horizontal-container">
        <MedicineRecommendation />
        <DoctorChat />
      </div>
      
        <p>Your personal health companion with AI support.</p>
        <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
          Explore Features
        </button>
      </section>

      {/* <section id="summary" className="section summary">
        <h2>About HealthAI</h2>
        <p>
          HealthAI is an AI-powered health assistant that helps you check symptoms, get medicine suggestions, 
          and consult a virtual doctor in real-time. Our goal is to make healthcare advice accessible and fast, 
          right from your browser.
        </p>
      </section> */}
      </div>
    </>
  );
}
