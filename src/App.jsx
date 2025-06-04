import { useState } from 'react';
import './App.css'

function App() {
  // Estados para a funcionalidade de abas e filtros
  const [activeTab, setActiveTab] = useState('primeiro');
  const [filter, setFilter] = useState('todos');

  // Data for Grêmio's 2025 Brazilian Championship matches - Primeiro Turno (rounds 1-19)
  const firstHalfMatches = [
    {
      "rodada": 1,
      "data": "2025-03-29",
      "adversario": "Atlético-MG",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": "Grêmio 2 x 1 Atlético-MG"
    },
    {
      "rodada": 2,
      "data": "2025-04-05",
      "adversario": "Ceará",
      "local": "Castelão, Fortaleza/CE",
      "resultado": "Ceará 2 x 0 Grêmio"
    },
    {
      "rodada": 3,
      "data": "2025-04-13",
      "adversario": "Flamengo",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": "Grêmio 0 x 2 Flamengo"
    },
    {
      "rodada": 4,
      "data": "2025-04-16",
      "adversario": "Mirassol",
      "local": "Maião, Mirassol/SP",
      "resultado": "Mirassol 4 x 1 Grêmio"
    },
    {
      "rodada": 5,
      "data": "2025-04-19",
      "adversario": "Internacional",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": "Grêmio 1 x 1 Internacional"
    },
    {
      "rodada": 6,
      "data": "2025-04-27",
      "adversario": "Vitória",
      "local": "Barradão, Salvador/BA",
      "resultado": "Vitória 1 x 1 Grêmio"
    },
    {
      "rodada": 7,
      "data": "2025-05-04",
      "adversario": "Santos",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": "Grêmio 1 x 0 Santos"
    },
    {
      "rodada": 8,
      "data": "2025-05-10",
      "adversario": "Red Bull Bragantino",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": "Grêmio 1 x 1 Red Bull Bragantino"
    },
    {
      "rodada": 9,
      "data": "2025-05-17",
      "adversario": "São Paulo",
      "local": "Morumbi, São Paulo/SP",
      "resultado": "São Paulo 2 x 1 Grêmio"
    },
    {
      "rodada": 10,
      "data": "2025-05-25",
      "adversario": "Bahia",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": "Grêmio 1 x 0 Bahia"
    },
    {
      "rodada": 11,
      "data": "2025-06-01",
      "adversario": "Juventude",
      "local": "Alfredo Jaconi, Caxias do Sul/RS",
      "resultado": "Juventude 0 x 2 Grêmio"
    },
    {
      "rodada": 12,
      "data": "2025-06-12",
      "adversario": "Corinthians",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 13,
      "data": "2025-07-12",
      "adversario": "Cruzeiro",
      "local": "Mineirão, Belo Horizonte/MG",
      "resultado": null
    },
    {
      "rodada": 14,
      "data": "2025-07-16",
      "adversario": "Fortaleza",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 15,
      "data": "2025-07-19",
      "adversario": "Vasco",
      "local": "São Januário, Rio de Janeiro/RJ",
      "resultado": null
    },
    {
      "rodada": 16,
      "data": "2025-07-23",
      "adversario": "Botafogo",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 17,
      "data": "2025-07-26",
      "adversario": "Palmeiras",
      "local": "Allianz Parque, São Paulo/SP",
      "resultado": null
    },
    {
      "rodada": 18,
      "data": "2025-08-02",
      "adversario": "Fluminense",
      "local": "Maracanã, Rio de Janeiro/RJ",
      "resultado": null
    },
    {
      "rodada": 19,
      "data": "2025-08-09",
      "adversario": "Sport",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    }
  ];

  // Data for Grêmio's 2025 Brazilian Championship matches - Segundo Turno (rounds 20-38)
  const secondHalfMatches = [
    {
      "rodada": 20,
      "data": "2025-08-17",
      "adversario": "Atlético-MG",
      "local": "Mineirão, Belo Horizonte/MG",
      "resultado": null
    },
    {
      "rodada": 21,
      "data": "2025-08-23",
      "adversario": "Ceará",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 22,
      "data": "2025-08-30",
      "adversario": "Flamengo",
      "local": "Maracanã, Rio de Janeiro/RJ",
      "resultado": null
    },
    {
      "rodada": 23,
      "data": "2025-09-06",
      "adversario": "Mirassol",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 24,
      "data": "2025-09-13",
      "adversario": "Internacional",
      "local": "Beira-Rio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 25,
      "data": "2025-09-20",
      "adversario": "Vitória",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 26,
      "data": "2025-09-27",
      "adversario": "Santos",
      "local": "Vila Belmiro, Santos/SP",
      "resultado": null
    },
    {
      "rodada": 27,
      "data": "2025-10-04",
      "adversario": "Red Bull Bragantino",
      "local": "Nabi Abi Chedid, Bragança Paulista/SP",
      "resultado": null
    },
    {
      "rodada": 28,
      "data": "2025-10-11",
      "adversario": "São Paulo",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 29,
      "data": "2025-10-18",
      "adversario": "Bahia",
      "local": "Fonte Nova, Salvador/BA",
      "resultado": null
    },
    {
      "rodada": 30,
      "data": "2025-10-25",
      "adversario": "Juventude",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 31,
      "data": "2025-11-01",
      "adversario": "Corinthians",
      "local": "Neo Química Arena, São Paulo/SP",
      "resultado": null
    },
    {
      "rodada": 32,
      "data": "2025-11-05",
      "adversario": "Cruzeiro",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 33,
      "data": "2025-11-09",
      "adversario": "Fortaleza",
      "local": "Castelão, Fortaleza/CE",
      "resultado": null
    },
    {
      "rodada": 34,
      "data": "2025-11-16",
      "adversario": "Vasco",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 35,
      "data": "2025-11-23",
      "adversario": "Botafogo",
      "local": "Nilton Santos, Rio de Janeiro/RJ",
      "resultado": null
    },
    {
      "rodada": 36,
      "data": "2025-11-30",
      "adversario": "Palmeiras",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 37,
      "data": "2025-12-04",
      "adversario": "Fluminense",
      "local": "Arena do Grêmio, Porto Alegre/RS",
      "resultado": null
    },
    {
      "rodada": 38,
      "data": "2025-12-08",
      "adversario": "Sport",
      "local": "Ilha do Retiro, Recife/PE",
      "resultado": null
    }
  ];

  // Function to format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Function to check if a match is at home
  const isHomeMatch = (local) => {
    return local.includes("Arena do Grêmio");
  };

  // Get the matches to display based on active tab
  const matchesToDisplay = activeTab === 'primeiro' ? firstHalfMatches : secondHalfMatches;

  // Apply filter to matches
  const filteredMatches = matchesToDisplay.filter(match => {
    if (filter === 'todos') return true;
    const isHome = isHomeMatch(match.local);
    return filter === 'casa' ? isHome : !isHome;
  });

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
        {filteredMatches.map((match) => {
          const isHome = isHomeMatch(match.local);
          return (
            <div 
              key={match.rodada} 
              className={`game-card ${isHome ? 'home' : 'away'}`}
            >
              <div className="round">Rodada {match.rodada}</div>
              <div className="opponent">{match.adversario}</div>
              <div className="date">{formatDate(match.data)}</div>
              <div className="location">{match.local}</div>
              <div className="result">
                {match.resultado || "A definir"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
