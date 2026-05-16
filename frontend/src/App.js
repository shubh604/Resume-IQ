import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter } from 'react-router-dom';
import Analysis from './Components/Analysis/Analysis';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div >
  
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-analysis" element={<Analysis />} />
      </Routes>

    </div>
  );
}

export default App;
