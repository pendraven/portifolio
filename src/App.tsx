import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
