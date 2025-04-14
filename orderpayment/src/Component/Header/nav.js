import React, { useState } from 'react';
import './nav.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Logo" />
        <span>FoodieExpress</span>
      </div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="#">Menu</a>
        <a href="#">Restaurants</a>
        <a href="#">Contact</a>
        <a href="#">Deliveries</a>
        <a href="/cart">My Cart</a>
        
        <button className="login-btn">Login</button>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'rotate1' : ''}`}></div>
        <div className={`bar ${isOpen ? 'hide' : ''}`}></div>
        <div className={`bar ${isOpen ? 'rotate2' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
