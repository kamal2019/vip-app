import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ImFilter } from 'react-icons/im'

function FilterBar({ onFilter }) {
  const [sortBy, setSortBy] = useState('date:desc')
  return (
    <div className='form-control m-5'>
      <div className='input-group'>
        <select
          className='select select-bordered'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option disabled>Sory By</option>
          <option value='date:desc'>Date Latest</option>
          <option value='date:asc'>Date Oldest</option>
          <option value='likes:desc'>Likes Most</option>
          <option value='likes:asc'>Likes Least</option>
          <option value='view:desc'>Views Most</option>
          <option value='view:asc'>Views Least</option>
          <option value='title:asc'>Title Ascending</option>
          <option value='title:desc'>Title Descending</option>
        </select>
        <button
          className='btn btn-primary'
          type='submit'
          disabled={sortBy === null}
          onClick={() => onFilter(sortBy)}
        >
          <ImFilter />
        </button>
      </div>
    </div>
  )
}

FilterBar.propTypes = {
  onFilter: PropTypes.func.isRequired,
}

export default FilterBar
