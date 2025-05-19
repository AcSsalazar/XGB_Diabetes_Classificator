import { Link } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="dashboard-header">Health Risk Prediction Dashboard</h1>
      <p className="dashboard-description">Welcome to your health risk prediction tool. Use the navigation below to make predictions or view past results.</p>
      <div className="dashboard-nav">
        <Link to="/predict">
          <button>Make a Prediction</button>
        </Link>
        <Link to="/history">
          <button>View History</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;