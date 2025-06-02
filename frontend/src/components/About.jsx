import { Link } from 'react-router-dom';
import ReactMarkDown from 'react-markdown';
import '../styles/About.css';

// Importa el archivo como texto
import content from '../About.md?raw';
function About() {
  return (
    <div className="container">
      <div className="about-description"><ReactMarkDown>{content}</ReactMarkDown></div>
      <div className="about-nav">
        <Link to="/predict">
          <button className='buttons'>Volver al Dashboard</button>
        </Link>
        <Link to="/history">
          <button className='buttons'>Ver Historial</button>
        </Link>
      </div>
    </div>
  );
}

export default About;