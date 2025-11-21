import React from 'react';
import Header from './components/Header/Header.jsx';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import ProductTiles from './components/ProductTiles/ProductTiles.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <HeroSection />
        <ProductTiles />
      </main>
      <Footer />
    </div>
  );
}

export default App;