import React from 'react';
import './HeroSection.css'
const HeroSection = () => {
  return (
    <section className="hero-section"> 
      <div className="hero-content">
        <h1>Zoo Market</h1>
        <p>Welcome to the Zoo Market! You can buy any type of animal, or sell it</p>
    
        <button className="hero-button">Shop Now</button> 
      </div>
    </section>
  );
};

export default HeroSection;