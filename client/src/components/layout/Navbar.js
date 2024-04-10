import React from "react";
import bdrop from "../../assets/img/bdrop.png";

import "../../assets/css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/home" className="navbar-brand">
          <img src={bdrop} alt="bdrop logo" className="navbar-logo" />
          <a href="/home" className="navbar-item">Home</a>
        </a>
        <div className="navbar-menu">
          <a href="/about" className="navbar-item">About</a>
          <a href="/donate" className="navbar-item">Donate/Request</a>
          <a href="/feedback" className="navbar-item">Feedback</a>
          <a href="/contact" className="navbar-item">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
