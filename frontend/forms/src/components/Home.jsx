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

          <Link to="/quote-searcher" className="option-card" data-gif="search">
            <h2>Ver historial de diagnosticos</h2>
            <p>Encuentra tu diagnostico previamente generado por ID.</p>
            <button className="option-button">Buscar Ahora</button>
          </Link>

          <Link to="/about-service" className="option-card" data-gif="about">
            <h2>Acerca de Nuestro Servicio</h2>
            <p>Aprende más sobre cómo nuestra herramienta te ayuda.</p>
            <button className="option-button">Aprender Más</button>
          </Link>
        </section>
      </main>


    </div>
  );
};

export default Home;

