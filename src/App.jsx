import { useState, useEffect } from 'react';
import './App.css'

function App() {
  // Estados para a funcionalidade de abas e filtros
  const [activeTab, setActiveTab] = useState('primeiro');
  const [filter, setFilter] = useState('todos');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL da API
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Buscar dados da API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/matches`);
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [API_URL]);

  // Function to format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Get the matches to display based on active tab
  const getMatchesByTurno = (turno) => {
    if (turno === 'primeiro') {
      return matches.filter(match => match.rodada <= 19);
    } else {
      return matches.filter(match => match.rodada > 19);
    }
  };

  // Apply filter to matches
  const getFilteredMatches = (matchesToFilter) => {
    if (filter === 'todos') return matchesToFilter;
    return matchesToFilter.filter(match => {
      return filter === 'casa' ? match.is_home : !match.is_home;
    });
  };

  const matchesToDisplay = getMatchesByTurno(activeTab);
  const filteredMatches = getFilteredMatches(matchesToDisplay);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando jogos do Grêmio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Grêmio - Campeonato Brasileiro 2025</h1>
        
        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'primeiro' ? 'active' : ''}`}
            onClick={() => setActiveTab('primeiro')}
          >
            Primeiro Turno
          </button>
          <button 
            className={`tab-button ${activeTab === 'segundo' ? 'active' : ''}`}
            onClick={() => setActiveTab('segundo')}
          >
            Segundo Turno
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <button 
            className={`filter-button ${filter === 'todos' ? 'active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Todos os Jogos
          </button>
          <button 
            className={`filter-button ${filter === 'casa' ? 'active' : ''}`}
            onClick={() => setFilter('casa')}
          >
            Jogos em Casa
          </button>
          <button 
            className={`filter-button ${filter === 'fora' ? 'active' : ''}`}
            onClick={() => setFilter('fora')}
          >
            Jogos Fora
          </button>
        </div>
        
        <div className="legend">
          <span className="home-legend">Jogos em casa</span>
          <span className="away-legend">Jogos fora</span>
        </div>
      </header>
      
      <div className="matches-container">
        {filteredMatches.map((match) => (
          <div 
            key={match.id} 
            className={`game-card ${match.is_home ? 'home' : 'away'}`}
          >
            <div className="round">Rodada {match.rodada}</div>
            <div className="opponent">{match.adversario}</div>
            <div className="date">{formatDate(match.data)}</div>
            <div className="location">{match.local}</div>
            <div className="result">
              {match.resultado || "A definir"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
