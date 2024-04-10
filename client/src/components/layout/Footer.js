import React from "react";

//css
import "../../assets/css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Blood Bank Management System</h3>
        <p>Helping to save lives, one donation at a time.</p>
        <ul className="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Blood Bank Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
