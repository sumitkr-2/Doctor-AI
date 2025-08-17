// src/components/Footer.jsx
import React from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/sumit-kumar2004" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/sumitkr-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="mailto:sumit.kumar120664@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
        <a href="https://twitter.com/collageuse2004" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://t.me/sumit_kr_2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-telegram-plane"></i>
        </a>
      </div>
      <p id="copyright">© 2025 Sumit. All rights reserved.</p>
    </footer>
  );
}
