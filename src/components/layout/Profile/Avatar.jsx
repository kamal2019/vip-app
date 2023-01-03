import React from 'react'
import PropTypes from 'prop-types'

function Avatar({ avatar }) {
  return (
    <div className='card m-5 p-5'>
      <div className='avatar'>
        <div className='max-h-96 object-cover object-center rounded-xl shadow-xl hover:scale-95 transition-all ease-in-out'>
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${avatar}`}
            alt='profile'
          />
        </div>
      </div>
    </div>
  )
}

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
}

export default Avatar
