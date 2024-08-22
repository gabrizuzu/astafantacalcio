import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AuctionPage from './AuctionPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/asta" element={<AuctionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
