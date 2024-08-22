// src/pages/AuctionPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AuctionPage.css';

const AuctionPage = () => {
    const [giocatoreInAsta, setGiocatoreInAsta] = useState(null);
    const [squadre, setSquadre] = useState([]);
    const [prezzoOfferta, setPrezzoOfferta] = useState('');
    const [selectedSquadra, setSelectedSquadra] = useState('');
    const [giocatori, setGiocatori] = useState([]);

    useEffect(() => {
        // Carica il giocatore corrente in asta
        axios.get('http://127.0.0.1:8000/asta/giocatore-in-asta/')
            .then(response => setGiocatoreInAsta(response.data))
            .catch(error => console.error('Errore durante il recupero del giocatore in asta:', error));

        // Carica le squadre
        axios.get('http://127.0.0.1:8000/asta/squadre/')
            .then(response => setSquadre(response.data))
            .catch(error => console.error('Errore durante il recupero delle squadre:', error));

        // Carica i giocatori
        axios.get('http://127.0.0.1:8000/asta/giocatori/')
            .then(response => setGiocatori(response.data))
            .catch(error => console.error('Errore durante il recupero dei giocatori:', error));
    }, []);
    const handleSquadraChange = (event) => {
        setSelectedSquadra(event.target.value);
    };
    const rilancia = () => {
        console.log(giocatoreInAsta);
        console.log(prezzoOfferta);
        console.log(giocatoreInAsta.prezzoattuale);
        if (giocatoreInAsta && prezzoOfferta > giocatoreInAsta.prezzoattuale) {
            setGiocatoreInAsta({
                ...giocatoreInAsta,
                prezzoattuale: prezzoOfferta,
              });
        } else if (giocatoreInAsta && !prezzoOfferta) {
            setGiocatoreInAsta({
                ...giocatoreInAsta,
                prezzoattuale: parseInt(giocatoreInAsta.prezzoattuale) + 1,
              });
        }
    };

    const aggiudica = () => {
        if (giocatoreInAsta && selectedSquadra) {
            axios.post(`http://127.0.0.1:8000/asta/aggiudica/${giocatoreInAsta.Id}/`, { squadra: selectedSquadra })
                .then(response => {
                    // Gestisci la risposta e aggiorna lo stato
                })
                .catch(error => console.error('Errore durante l\'aggiudicazione:', error));
        }
    };

    return (
        <div className="auction-page">
            <div className="asta-section">
                <div>
                {giocatoreInAsta ? (
                    <div>
                        <h2>Giocatore in Asta</h2>
                        <h1>{giocatoreInAsta.nome}</h1>
                        <p> Prezzo Consigliato: {giocatoreInAsta.prezzo}</p>
                        <p> Squadra: {giocatoreInAsta.squadra}</p>
                        <p> Ruolo: {giocatoreInAsta.ruolo}</p>
                        
                    </div>
                ) : (
                    <p>Caricamento del giocatore in asta...</p>
                )}
                </div>
                <div>
                {giocatoreInAsta ? (
                <div className="PrezzoAsta"> Prezzo Attuale: {giocatoreInAsta.prezzoattuale} </div>
                ) : (   
                    <p>Caricamento..</p>
                )}
                        <div>
                            <input
                                type="number"
                                value={prezzoOfferta}
                                onChange={(e) => setPrezzoOfferta(e.target.value)}
                                placeholder="Inserisci offerta"
                            />
                            <button onClick={rilancia}>Rilancia</button>
                            <form onSubmit={aggiudica}>
                                <select value={selectedSquadra} onChange={handleSquadraChange}>
                                    {squadre.map((squadra) => (
                                        <option key={squadra.id} value={squadra.nome}>
                                            {squadra.nome}
                                        </option>
                                    ))}
                                </select>
                                <button type="submit">Aggiudica</button>
                            </form>
                        </div>
                </div>
                <div className="player-list">
                    <h2>Lista Giocatori</h2>
                    <div className="player-list-container">
                        {giocatori.map((giocatore) => (
                        <div className="player-item" key={giocatore.id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Squadra</th>
                                            <th>Ruolo</th>
                                            <th>Prezzo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {giocatori.map((giocatore) => (
                                            <tr className="player-attr" key={giocatore.id}>
                                                <td>{giocatore.nome}</td>
                                                <td>{giocatore.team}</td>
                                                <td>{giocatore.ruolo}</td>
                                                <td>{giocatore.prezzo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="squadre-section">
                <h2>Squadre</h2>
                <ul>
                    {squadre.map((squadra) => (
                        <li key={squadra.id}>
                            <p>
                            {squadra.nome}
                            </p>
                            <p>
                            {squadra.crediti}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AuctionPage;
