import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import './search.css'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchArtist } from '../actions/actions';

const Search = ( {searchArtist }) => {
  const [search,setSearch] = React.useState('')

  return (
    <div className="search">
      <div className="search-icon">
        <SearchIcon />
      </div>
      <InputBase
        className="search-input" 
        placeholder="Search…"
        inputProps={{ 'aria-label': 'Search' }}
        value={ search }
        onChange={ (event) => setSearch(event.target.value) }
        onKeyPress={ event => event.key === 'Enter' && searchArtist(search) }
      />
      <Button
        className="search-button"
        variant="outlined"
        onClick={ () => searchArtist(search) }
      >Get Data</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {searchedArtists: state.searchedArtists};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchArtist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);