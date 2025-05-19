import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import '../styles/History.css';

function History() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await api.get('/predictions/');
        setPredictions(res);
      } catch (err) {
        console.error(err);
        setError('Error fetching predictions. Check the console.');
      }
    };
    fetchPredictions();
  }, []);

  return (
    <div className="history-container">
      <div className="history-card">
        <div className="history-header">
          <h2>Prediction History</h2>
          <Link to="/">Back to Dashboard</Link>
        </div>
        {error && <p className="history-error">{error}</p>}
        {predictions.length === 0 && !error ? (
          <p className="history-empty">No predictions found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Username</th>
                <th>Model</th>
                <th>Risk Level</th>
                <th>Probability</th>
                <th>Input Data</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred) => (
                <tr key={pred.id}>
                  <td>{new Date(pred.created_at).toLocaleString()}</td>
                  <td>{pred.username || 'Anonymous'}</td>
                  <td>{pred.input_data.model_name || 'Unknown'}</td>
                  <td>{pred.risk_level}</td>
                  <td>{pred.probability.toFixed(3)}</td>
                  <td>{JSON.stringify(pred.input_data, null, 2).slice(0, 50)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default History;
