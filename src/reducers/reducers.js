import { combineReducers } from 'redux';

export const searchedArtists = (searchedArtists = [], action) => {
  if (action.type === 'LOG_SEARCH') {
    if (!searchedArtists.includes(action.payload)) {
      return [...searchedArtists, action.payload];
    }
  }
  return searchedArtists;
}

export const currentArtist = (currentArtist = '', action) => {
  if (action.type === 'CURRENT_ARTIST') {
    return action.payload;
  }
  return currentArtist;
}

export const spotifyAccessToken = (spotifyAccessToken = '', action) => {
  switch (action.type) {
    case 'SPOTIFY_TOKEN_SUCCESS':
      console.log(action.payload)
      return action.payload;
    default:
      return spotifyAccessToken
  }
}

const cleanSpotifyData = (albums) => {
  let lookup = {};
  let cleanedAlbums = [];
  for (let album of albums) {
    if (!lookup[album.name]) {
      lookup[album.name] = true;
      cleanedAlbums.push(album);
    }
  }
  return cleanedAlbums;
}

export const spotifyAlbums = (spotifyAlbums = [], action) => {
  switch (action.type) {
    case 'SPOTIFY_ALBUM_SUCCESS':
      const cleanedAlbums = cleanSpotifyData(action.payload)
      console.log(cleanedAlbums)
      return cleanedAlbums
    default:
      return spotifyAlbums
  }
}

export default combineReducers({ searchedArtists, spotifyAccessToken, spotifyAlbums, currentArtist });