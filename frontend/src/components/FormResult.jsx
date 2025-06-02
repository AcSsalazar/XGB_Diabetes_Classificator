import '../styles/ResultModal.css'; 
import { Link } from 'react-router-dom';

export default function FormResult({ result, onClose }) {
  if (!result) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2 style={{ color: '#8b76df' }}>Resultado del análisis</h2>
        <p><strong>Diagnóstico:</strong> {result.riesgo}</p>
        <Link to="/">
        <button onClick={onClose} className="back-button">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
