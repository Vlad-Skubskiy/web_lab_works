import React from 'react';
import './Header.css'
const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Zoo-Market</div>
      </div>
      <nav className="header-nav">
        <ul>
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#catalog">Catalog</a></li>
          <li><a href="#cart">Cart</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;