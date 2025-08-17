import React, { useState } from 'react';
import './css/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Doctor AI 💊</div>

      {/* Hamburger icon */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#buy-med">Buy Medicine</a></li>
        <li><a href="#health-tip">Health Tips</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
}
