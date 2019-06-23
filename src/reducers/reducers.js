import { combineReducers } from 'redux';

export const searchedArtists = (searchedArtists = [], action) => {
  if (action.type === 'LOG_SEARCH') {
    if (!searchedArtists.includes(action.payload)) {
      return [...searchedArtists, action.payload];
    }
  }
  return searchedArtists;
}

export const showMusicSummary = (showMusicSummary = false, action) => {
  if (action.type === 'SHOW_MUSIC_SUMMARY') {
    return action.payload;
  }
  return showMusicSummary;
}

export const currentArtist = (currentArtist = '', action) => {
  if (action.type === 'CURRENT_ARTIST') {
    return action.payload;
  } else if (action.type === 'CURRENT_ARTIST_FAILURE') {
    return '';
  }
  return currentArtist;
}

export const spotifyAccessToken = (spotifyAccessToken = '', action) => {
  switch (action.type) {
    case 'SPOTIFY_TOKEN_LOADING':
      return 'loading';
    case 'SPOTIFY_TOKEN_SUCCESS':
      return action.payload;
    case 'SPOTIFY_TOKEN_FAILURE':
      return false;
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

export const spotifyAlbums = (spotifyAlbums = false, action) => {
  switch (action.type) {
    case 'SPOTIFY_ALBUM_SUCCESS':
      const cleanedAlbums = cleanSpotifyData(action.payload)
      // console.log(cleanedAlbums)
      return cleanedAlbums;
    case 'SPOTIFY_ALBUM_FAILURE':
      return false;
    default:
      return spotifyAlbums;
  }
}

export default combineReducers({ searchedArtists, showMusicSummary, spotifyAccessToken, spotifyAlbums, currentArtist });