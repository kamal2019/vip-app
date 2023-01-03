import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='form-control m-5'>
      <div className='input-group'>
        <label className='input-group input-group-md' htmlFor='input'>
          <span>Search</span>
          <input
            type='text'
            placeholder='Title, Description, Venue...'
            className='input input-bordered'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button
          className='btn btn-square btn-primary'
          type='submit'
          disabled={searchQuery === ''}
          onClick={() => onSearch(searchQuery)}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchBar
