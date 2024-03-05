import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-envelope"></i>
                <Link href="mailto:kisanraj@gmail.com" className="ms-2">kisanraj@gmail.com</Link>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <Link href="tel:+916304214514" className="ms-2">+91 63042 14514</Link>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span className="ms-2">Bapatla, India</span>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
              <li><Link to="/"><i className="fab fa-twitter"></i></Link></li>
              <li><Link to="/"><i className="fab fa-instagram"></i></Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>Site Map</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
