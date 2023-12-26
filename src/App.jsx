// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/About/AboutPage';

function App() {
  const handleLogout = () => {
    console.log('logout');
  }
  const {pathname} = useLocation();
  console.log(pathname);
  return (
  
      <div>
       { pathname!=='/' && <NavBar handleLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
  
  );
}

export default App;
