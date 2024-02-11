import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Header from './pages/header';
import Home from './pages/home';
import './App.css';
import InitialQuestionnaire from './pages/questionnaire';
import Consult from './pages/consult';
import ConsultSuccess from './pages/consultsuccess';
import Footer from './pages/footer';
import Refills from './pages/refills';
import ScrollToTop from './pages/scrolltotop';

function App() {
  return (
    <div className="App app-container">
        <Router>
            <Header/>
            <ScrollToTop/>
            <div className='flexible-content'>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/initial-quest" element={<InitialQuestionnaire/>} />
                <Route path="/sched-consultation" element={<Consult/>} />
                <Route path="/consult-success" element={<ConsultSuccess/>} />
                <Route path="/request-refill" element={<Refills/>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
