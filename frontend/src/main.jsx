// src/main.jsx
// import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import Home from "./components/Home"; 
import MedicineRecommendation from "./components/MedicineRecommendation";
import MedicineSlider from "./components/MedicineSlider";
import MiddleSection from "./components/MiddleSection";
import HealthTips from "./components/HealthTips";
import DiseaseStudy from "./components/DiseaseStudy";
import HealthDashboard from "./components/HealthDashboard";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";     
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home/>
    {/* <App/> */}
    {/* <MedicineRecommendation/>  */}
    {/* <MedicineSlider/> */}
    <MiddleSection/>
   
   <HealthDashboard/>
   <Disclaimer/>
  
    <Footer/>
  </React.StrictMode>
);
