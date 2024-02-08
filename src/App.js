import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Header from './pages/header';
import Home from './pages/home';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
