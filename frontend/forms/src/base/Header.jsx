
import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/Header.css';
import logo from "../../src/assets/logo.svg";
import { useState } from 'react';




function Header() {


  const [isOpen, setIsOpen] = useState(false);

  const ToggleDropDown = () => {

    setIsOpen(!isOpen);

  }


  return (
    <header className="app-header">
      <div className="header-content">
      <img src={logo} alt="Company Logo" 
      style={{ height: '50px', marginRight: '10px', borderRadius: '40px', boxShadow: '2px 1px 5px 1px #19285c82'}} />
        <Link to="/" className="logo">Diabetes pre-diagnostico</Link>
        
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/diabetes-info">Informacion sobre la enfermedad</Link>
          <Link to="/clients">Nuestros Clientes</Link>
          <Link to="/coverage">Casos de exito</Link>
        </nav>

        <div className="user-actions">


<div className="dropdown">
       <>

       <p className='dropdown-button ' onClick={ToggleDropDown}>Mas info</p>

       </>
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a href="https://xgboost.readthedocs.io/en/release_3.0.0/">Sobre XGBoost</a></li>
          <li><a href="https://github.com/AcSsalazar/XGB_Diabetes_Classificator">GitHub</a></li>
        </ul>
      )}
    </div>
        </div>
      </div>
    </header>
  );
}

export default Header