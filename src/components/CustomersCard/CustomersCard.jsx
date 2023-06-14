import React from 'react'
import PropTypes from 'prop-types'

function CustomersCard({ data }) {
  return (
    <div className='w-full lg:w-1/3 border-2 border-white bg-blue-200 p-3'>
      <span className='font-bold text-2xl'> {data.label}</span>
      <div
        style={{
          height: '400px',
        }}
        className='mb-2'
      >
        <img
          src={data.image}
          alt='data.png'
          className='w-full h-full object-cover'
        />
      </div>
      <p className='border-t-4 border-white'>-{data.description}</p>
    </div>
  )
}

CustomersCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

export default CustomersCard
