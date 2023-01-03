import React from 'react'
import PropTypes from 'prop-types'
import { MdOutlineDelete } from 'react-icons/md'
import moment from 'moment'

function Certificate({
  id,
  title,
  date,
  image,
  givenBy,
  givenFor,
  givenTo,
  handleDelete,
}) {
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(user && user.role === 'admin')

  return (
    <div className='card w-fit mb-5 bg-base-100 shadow-md shadow-gray-500 hover:shadow-xl hover:scale-95 transition-all'>
      <figure>
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
          alt='Certificate'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-xl font-extrabold mb-5'>{title}</h2>

        <h2 className='card-title justify-between'>
          Awarded To
          <a
            href={`/user/${givenTo.id}`}
            className='link link-hover text-accent hover:text-accent-focus'
          >
            {givenTo.name}
          </a>
        </h2>

        <h2 className='card-title justify-between'>
          Event
          <a
            href={`/post/${givenFor.id}`}
            className='link link-hover text-accent hover:text-accent-focus'
          >
            {givenFor.title}
          </a>
        </h2>

        <h2 className='card-title justify-between'>
          Awarded By
          <a
            href={`/user/${givenBy.id}`}
            className='link link-hover text-accent hover:text-accent-focus'
          >
            {givenBy.name}
          </a>
        </h2>

        <span className='badge badge-outline badge-info badge-lg text-xl font-medium capitalize mt-5 py-4'>
          <div className='tooltip tooltip-info' data-tip='Awarded Date'>
            {moment(date).format('MMMM Do YYYY')}
          </div>
        </span>

        <div className='card-actions justify-end'>
          {isAdmin && (
            <button
              className='btn btn-error btn-xl btn-block mt-5 text-xl font-semibold hover:bg-red-500 hover:text-white'
              type='button'
              onClick={() => handleDelete(id)}
            >
              <MdOutlineDelete size='1.5rem' className='mr-2' /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Certificate.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  givenBy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  givenFor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  givenTo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Certificate
