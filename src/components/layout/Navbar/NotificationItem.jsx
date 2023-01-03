/* eslint-disable import/no-unresolved */
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import PropTypes from 'prop-types'

function NotificationItem({ id, title, image, postId, onRemove }) {
  return (
    <li>
      <div className='card w-96 mt-2 bg-base-100 shadow-xl flex flex-row justify-around hover:scale-95 transition duration-150 ease-in-out'>
        {/* Image */}
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
          className='rounded-full object-cover object-center w-16 h-16 m-2'
          alt='Notification'
        />
        {/* Card Title */}
        <a href={`/post/${postId}`}>
          <h2 className='card-title hover:underline line-clamp-2'>{title}</h2>
        </a>
        {/* Card Action */}
        <div className='card-actions'>
          <button
            className='text-error hover:scale-110 transition duration-150 ease-in-out'
            type='button'
            onClick={() => {
              onRemove(id)
            }}
          >
            <AiOutlineCloseCircle size='32px' />
          </button>
        </div>
      </div>
    </li>
  )
}

NotificationItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default NotificationItem
