// src/components/HealthDashboard.jsx
import React from "react";
import HealthTips from "./HealthTips";
import DiseaseStudy from "./DiseaseStudy";
import "./css/HealthDashboard.css";

export default function HealthDashboard() {
  return (
    <section className="health-dashboard">
      <h1 className="dashboard-title">🌿 Health & Disease Dashboard</h1>
      <div className="dashboard-grid">
        <HealthTips />
        <DiseaseStudy />
      </div>
    </section>
  );
}
