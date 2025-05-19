import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard.jsx';
import PredictionForm from './components/PredictionsForm.jsx';
import History from './components/History.jsx';
import Home from './components/Home.jsx';
import Header from './base/Header.jsx';
import Footer from './base/Footer.jsx';
function App() {
  return (

    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;