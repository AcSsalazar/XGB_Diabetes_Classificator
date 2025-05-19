import React from "react";
import { Link } from "react-router-dom";
import "../../src/styles/Footer.css";

function Footer() {


  return (
    <footer className="rc-footer">
      <div className="footer-content">


        <div className="footer-section">
          <h3>Desarrollado por:</h3>

          <ul>
            <li><a>Andres Salazar</a></li>
            <li><a>Rafael Gonzalez</a></li>

            <div>
            <li>Medellín, CO</li>

            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Powered by <a>XGBoost</a></Link></li>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;