
const logSearch = (artist) => {
  return { type: 'LOG_SEARCH', payload: artist }
}

const currentArtist = (artist) => {
  return { type: 'CURRENT_ARTIST', payload: artist}
}

const currentArtistFailure = () => {
  return { type: 'CURRENT_ARTIST_FAILURE'}
}

const spotifyTokenLoading = () => {
  return { type: 'SPOTIFY_TOKEN_LOADING' }
}

const spotifyTokenSuccess = (token) => {
  return { type: 'SPOTIFY_TOKEN_SUCCESS', payload: token }
}

const spotifyAlbumSuccess = (token) => {
  return { type: 'SPOTIFY_ALBUM_SUCCESS', payload: token }
}

const spotifyTokenFailure = () => {
  return { type: 'SPOTIFY_TOKEN_FAILURE' }
}

const spotifyAlbumFailure = () => {
  return { type: 'SPOTIFY_ALBUM_FAILURE' }
}

const postFetch = (url = '', postData = {}, headers = {}) => {
  return fetch("https://cors-anywhere.herokuapp.com/" + url, {
    method: 'POST',
    headers,
    body: postData
  });
}

const spotifyAuth = () => {
  const url = 'https://accounts.spotify.com/api/token';
  const postData = 'grant_type=client_credentials';
  const headers = {
    'Authorization': 'Basic NTdhZDkxMzdkNmNlNDVhOTk1ODBiMWY1N2UzNTc0Zjc6OTIwNTE0ZGUwYTVlNDk1OTg0Y2VmN2NkOGRkMjg5NzA=',
    'content-type': 'application/x-www-form-urlencoded'
  }
  return postFetch(url, postData, headers);
}

const spotifySearch = (spotifyAccessToken, artist) => {
  const url = 'https://api.spotify.com/v1/search';
  const artistEncode = artist.replace(/ /g, '%20')
  return fetch(`${url}?q=${artistEncode}&type=artist&limit=1`, {
    headers: {'Authorization': 'Bearer ' + spotifyAccessToken}
  })
}

const spotifyAlbums = (spotifyAccessToken, artistId) => {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  return fetch(`${url}?include_groups=album&limit=50`, {
    headers: {'Authorization': 'Bearer ' + spotifyAccessToken}
  })
}

export const searchArtist = artist => {
  return async (dispatch, getState) => {
    const { spotifyAccessToken } = getState()
    let freshToken;
    if (!spotifyAccessToken) {
      dispatch(spotifyTokenLoading())
      try {
        const spotifyAuthResponse = await spotifyAuth();
        const spotifyAuthData = await spotifyAuthResponse.json();
        freshToken = spotifyAuthData.access_token;
        dispatch(spotifyTokenSuccess(freshToken));
      }
      catch (error) {
        console.log('auth error:', error);
        dispatch(spotifyTokenFailure())
      }
    }
    dispatch(logSearch(artist));
    try {
      const spotifySearchResponse = await spotifySearch(freshToken || spotifyAccessToken, artist);
      const spotifySearchData = await spotifySearchResponse.json();
      const spotifyArtistName = spotifySearchData.artists.items[0].name;
      const spotifyArtistId = spotifySearchData.artists.items[0].id;
      if (spotifyArtistId) {
        dispatch(currentArtist(spotifyArtistName));
        const spotifyAlbumsResponse = await spotifyAlbums(freshToken || spotifyAccessToken, spotifyArtistId);
        const spotifyAlbumsData = await spotifyAlbumsResponse.json();
        dispatch(spotifyAlbumSuccess(spotifyAlbumsData.items));
      } else {
        dispatch(currentArtist(''));
      }
    }
    catch (error) {
      console.log('search error:', error);
      dispatch(spotifyAlbumFailure());
      dispatch(currentArtistFailure());
    }
  }
}