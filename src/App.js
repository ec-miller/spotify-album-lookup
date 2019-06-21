import React from 'react';
import './App.css';
import Search from './search/Search.js';
import MusicSummary from './musicSummary/MusicSummary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify vs Apple Music</h1>
      </header>
      <Search />
      <MusicSummary />
    </div>
  );
}

export default App;
