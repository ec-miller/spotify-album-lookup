import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './search/Search.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify vs Apple Music</h1>
      </header>
      <Search />
    </div>
  );
}

export default App;
