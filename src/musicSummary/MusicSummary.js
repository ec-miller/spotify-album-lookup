import React from 'react';
import { connect } from 'react-redux';

const MusicSummary = ({searchedArtists, currentArtist, spotifyAlbums}) => (
  <div style={{color: 'white'}}>
    {currentArtist &&
      <> 
        <h2>{ `${currentArtist} has ${spotifyAlbums.length} albums on Spotify!` }</h2> 
        {spotifyAlbums.map( album => {
          return <p key={album.id}>{album.name}</p>
        })}
      </>
    }
    
    {searchedArtists.length > 0 &&
      <> 
        <h2>Recently Searched Artists</h2>
        {searchedArtists.map( artist => {
          return <p key={artist}>{artist}</p>
        })}
      </>
    }
  </div>
);

const mapStateToProps = (state) => {
  return { 
    searchedArtists: state.searchedArtists, 
    spotifyAlbums: state.spotifyAlbums,
    currentArtist: state.currentArtist 
  }
}

export default connect(mapStateToProps)(MusicSummary);