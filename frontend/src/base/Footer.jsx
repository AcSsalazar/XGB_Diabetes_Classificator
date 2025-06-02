import React from "react";
import { Link } from "react-router-dom";
import "../../src/styles/Footer.css";

function Footer() {
  return (
    <footer className="rc-footer" aria-label="Footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Desarrollado por:</h3>
          <ul>
            <li>
              <a
                href="https://linkedin.com/in/andres-salazar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Andres Salazar's LinkedIn"
              >
                Andres Salazar
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/rafael-gonzalez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rafael Gonzalez's LinkedIn"
              >
                Rafael Gonzalez
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contacto</h3>
          <ul>
            <li>Medellín, CO</li>
            <li>
              <a href="mailto:contact@example.com" aria-label="Contact email">
                acsalazar-19@hotmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section links">
          <h3>Enlaces</h3>
          <ul>
            <li>
              <Link to="/faq" aria-label="Frequently Asked Questions">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/terms" aria-label="Terms and Conditions">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              Powered by{" "}
              <a
                href="https://xgboost.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="XGBoost official website"
              >
                XGBoost
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Diagnosis ML Tool. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;