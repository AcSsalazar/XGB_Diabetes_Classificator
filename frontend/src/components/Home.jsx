import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import '../styles/Home.css';
const Home = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src={logo} alt="RC Klean Logo" className="homepage-logo" />
        <h1>Diagnosis MLTools</h1>
        <p>Prevenciónes mediante tecnología avanzada.</p>
      </header>

      <main className="homepage-main">
        <section className="homepage-options">
          <Link to="/predict" className="option-card" img src="/frontend/forms/src/assets/diabetes-1.webp" alt="Image">
            <h2>Diabetes pre Diagnosis</h2>
            <p>Obten un diagnostico de riesgo de diabetes totalmente gratis</p>
            <button className="option-button">Empezar Ahora</button>
          </Link>

          <Link to="/history" className="option-card" data-gif="search">
            <h2>Ver historial de diagnosticos</h2>
            <p>Acceso a una lista de diagnósticos previos.</p>
            <button className="option-button">Ver Ahora</button>
          </Link>

          <Link to="/project-info" className="option-card" data-gif="about">
            <h2>Acerca de Nuestro Proyecto</h2>
            <p>Aprende más sobre cómo nuestra herramienta funciona.</p>
            <button className="option-button">Aprender Más</button>
          </Link>
        </section>
      </main>


    </div>
  );
};

export default Home;

