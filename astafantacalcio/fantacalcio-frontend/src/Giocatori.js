// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [giocatori, setGiocatori] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/giocatori/')
      .then(response => setGiocatori(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Giocatori Disponibili</h1>
      <ul>
        {giocatori.map(giocatore => (
          <li key={giocatore.id}>{giocatore.nome} - {giocatore.ruolo} - {giocatore.prezzo_base}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

