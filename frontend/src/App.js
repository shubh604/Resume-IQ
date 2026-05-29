import './App.css';
import Home from './Components/Home/Home';
import Analysis from './Components/Analysis/Analysis';
import { Routes,Route } from 'react-router-dom';
import NotFound from "./Components/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div >
        <Toaster position="top-right" toastOptions={{className: "customToast" ,duration:1000}}/>
      <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/resume-analysis" element={<Analysis />} />
          <Route path="*" element={<NotFound />} />
       </Routes>

    </div>
  );
}

export default App;
