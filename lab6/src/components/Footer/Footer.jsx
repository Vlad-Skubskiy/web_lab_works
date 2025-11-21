import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="branding-stuff">
          <h3>Branding stuff</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="footer-logo">Zoo-Market</div>
        <div className="social-links">
          <a href="#" className="social-icon facebook">
            <img src="/facebook.png" alt="Facebook" />
          </a>
          <a href="#" className="social-icon">
            <img src="/twitter.png" alt="Twitter" />
          </a>
          <a href="#" className="social-icon">
            <img src="/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="#" className="social-icon">
            <img src="/google.png" alt="Google" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2025 IoT © Copyright all rights reserved, bla bla</p>
      </div>
    </footer>
  );
};

export default Footer;