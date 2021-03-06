import React from 'react';
import { connect } from 'react-redux';
import MusicDisplay from './MusicDisplay';

import './musicSummary.css'

const MusicSummary = ({searchedArtists, currentArtist, spotifyAlbums}) => {
  return (
    <div className='music-summary'>
      {currentArtist && spotifyAlbums ?
        <MusicDisplay
          currentArtist={currentArtist}
          service='Spotify'
          albums={spotifyAlbums}
        />
        : <h3 style={{ color: 'white' }}>Sorry, no results :(</h3>
      }
      {searchedArtists.length > 0 &&
        <div style={{ color: 'white' }}>
          <h2>Recently Searched Artists</h2>
          {searchedArtists.map(artist => {
            return <p key={artist}>{artist}</p>
          })}
        </div>
      }
    </div>
  )};

const mapStateToProps = (state) => {
  return { 
    searchedArtists: state.searchedArtists, 
    spotifyAlbums: state.spotifyAlbums,
    currentArtist: state.currentArtist 
  }
}

export default connect(mapStateToProps)(MusicSummary);