import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import './search.css'

const Search = () => {
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
      />
      <Button
        className="search-button"
        variant="outlined"
        onClick={ () => {} }
      >Get Data</Button>
    </div>
  )
}

export default Search;