import React from 'react'
import PropTypes from 'prop-types'

function Pagination({ currentPage, totalPages, handlePageChange }) {
  const handlePrevPage = () => {
    handlePageChange(currentPage - 1)
  }

  const handleNextPage = () => {
    handlePageChange(currentPage + 1)
  }

  return (
    <div className='btn-group my-5'>
      <button
        className='btn'
        type={currentPage === 1 ? 'button' : 'submit'}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        «
      </button>

      <button className='btn' type='button'>
        Page {currentPage}
      </button>

      <button
        className='btn'
        type={currentPage === totalPages ? 'button' : 'submit'}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default Pagination
