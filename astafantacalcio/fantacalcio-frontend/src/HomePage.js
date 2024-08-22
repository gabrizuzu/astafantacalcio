import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importa axios
import './HomePage.css';

function HomePage() {
  const [formValues, setFormValues] = useState({
    creditiIniziali: '',
    numeroPartecipanti: '',
    nomiSquadre: [''], // Lista con un elemento vuoto per iniziare
  });

  const [errorMessage, setErrorMessage] = useState(null); // Stato per gestire eventuali errori
  const navigate = useNavigate();

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    if (name === "nomiSquadre") {
      const newNomiSquadre = [...formValues.nomiSquadre];
      newNomiSquadre[index] = value;
      setFormValues({ ...formValues, nomiSquadre: newNomiSquadre });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleAddSquadra = () => {
    setFormValues({
      ...formValues,
      nomiSquadre: [...formValues.nomiSquadre, ''],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Invia i dati al backend
      await axios.post('http://127.0.0.1:8000/asta/aggiungi-squadre/', formValues);
      
      // Reindirizza alla pagina dell'asta dopo aver salvato i dati
      navigate('/asta');
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
      setErrorMessage('Errore durante l\'invio dei dati. Riprova.');
    }
  };

  const maxSquadreRaggiunto = formValues.nomiSquadre.length >= formValues.numeroPartecipanti;

  return (
    <div className="HomePage">
      <h1>Imposta Asta Fantacalcio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crediti Iniziali:</label>
          <input
            type="number"
            name="creditiIniziali"
            value={formValues.creditiIniziali}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Numero Partecipanti:</label>
          <input
            type="number"
            name="numeroPartecipanti"
            value={formValues.numeroPartecipanti}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Nomi Squadre:</label>
          {formValues.nomiSquadre.map((nome, index) => (
            <div key={index}>
              <input
                type="text"
                name="nomiSquadre"
                value={nome}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSquadra}
            disabled={maxSquadreRaggiunto}
          >
            Aggiungi Squadra
          </button>
          {maxSquadreRaggiunto && (
            <p style={{ color: 'red' }}>Hai raggiunto il numero massimo di squadre.</p>
          )}
        </div>
        {errorMessage && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}
        <button type="submit">Avvia Asta</button>
      </form>
    </div>
  );
}

export default HomePage;
