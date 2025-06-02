import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './components/About.jsx';
import PredictionForm from './components/PredictionsForm.jsx';
import History from './components/History.jsx';
import Home from './components/Home.jsx';
import Header from './base/Header.jsx';
import Footer from './base/Footer.jsx';
import DiabetesInfo from './components/Diabetes-info.jsx';
import ResultModal from './components/FormResult.jsx';
function App() {
  return (

    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-info" element={<About />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/diabetes-info" element={<DiabetesInfo />} />

      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;