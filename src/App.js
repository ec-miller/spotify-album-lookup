import React from 'react';
import { connect } from 'react-redux';
import Search from './search/Search.js';
import MusicSummary from './musicSummary/MusicSummary';
import './App.css';

function App({ searchedArtists, spotifyAccessToken, showMusicSummary }) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Album Lookup</h1>
      </header>
      <Search />
      {searchedArtists.length > 0 
        ? !spotifyAccessToken 
          ? <h3 style={{ color: 'white' }}>Sorry, we cannot connect to Spotify right now :(</h3>
          : showMusicSummary
            ? <MusicSummary />
            : null
        : null
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    searchedArtists: state.searchedArtists,
    spotifyAccessToken: state.spotifyAccessToken,
    showMusicSummary: state.showMusicSummary
  }
}

export default connect(mapStateToProps)(App);
