/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import moment from 'moment'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineCopy } from 'react-icons/ai'

function ParticipationCard({
  user,
  post,
  image,
  status,
  createdAt,
  isAdmin,
  id,
  onStatusChange,
  onDelete,
}) {
  const badgeRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    badgeRef.current.classList.remove(
      'badge-warning',
      'badge-success',
      'badge-error'
    )
    tooltipRef.current.classList.remove(
      'tooltip-warning',
      'tooltip-success',
      'tooltip-error'
    )

    if (status === 'pending') {
      badgeRef.current.classList.add('badge-warning')
      tooltipRef.current.classList.add('tooltip-warning')
    } else if (status === 'accepted') {
      badgeRef.current.classList.add('badge-success')
      tooltipRef.current.classList.add('tooltip-success')
    } else if (status === 'rejected') {
      badgeRef.current.classList.add('badge-error')
      tooltipRef.current.classList.add('tooltip-error')
    }
  }, [status])

  return (
    <div className='card w-fit mb-5 bg-base-100 shadow-md shadow-gray-500 hover:shadow-xl hover:scale-95 transition-all'>
      <figure>
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
          alt='participant'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title justify-between'>
          User
          <a
            href={`/user/${user.id}`}
            className='link link-hover text-accent hover:text-accent-focus'
          >
            {user.name}
          </a>
          {isAdmin && (
            <span
              className='text-2xl tooltip bg-transparent cursor-pointer'
              data-tip='Copy User Id'
            >
              <AiOutlineCopy
                className='inline mr-2'
                size='2rem'
                onClick={() => {
                  navigator.clipboard.writeText(user.id)
                  toast.success('Copied to clipboard')
                }}
              />
            </span>
          )}
        </h2>
        <h2 className='card-title justify-between'>
          Event
          <a
            href={`/post/${post.id}`}
            className='link link-hover text-accent hover:text-accent-focus'
          >
            {post.title}
          </a>
          {isAdmin && (
            <span
              className='text-2xl tooltip bg-transparent cursor-pointer'
              data-tip='Copy Post Id'
            >
              <AiOutlineCopy
                className='inline mr-2'
                size='2rem'
                onClick={() => {
                  navigator.clipboard.writeText(post.id)
                  toast.success('Copied to clipboard')
                }}
              />
            </span>
          )}
        </h2>
        <div className='flex justify-between '>
          <span className='badge badge-outline badge-info badge-lg text-xl font-medium capitalize mt-5'>
            <div
              className='tooltip tooltip-info truncate'
              data-tip='Event Date'
            >
              {moment(createdAt).fromNow()}
            </div>
          </span>
          <span
            className='badge badge-outline badge-lg text-xl font-medium mt-5'
            ref={badgeRef}
          >
            <div
              className='tooltip tooltip-info '
              data-tip='Current Status'
              ref={tooltipRef}
            >
              <span className=' capitalize'> {status}</span>
            </div>
          </span>
        </div>
      </div>
      <div className='flex flex-col '>
        {isAdmin && (
          <select
            className='select select-md select-info w-full max-w-xs m-5'
            onChange={(e) => {
              onStatusChange(e, id)
            }}
            value={status}
          >
            <option value='pending'>Pending</option>
            <option value='accepted'>Accepted</option>
            <option value='rejected'>Rejected</option>
          </select>
        )}
        {isAdmin && (
          <button
            className='btn btn-error btn-xl btn-block mt-5 text-xl font-semibold hover:bg-red-500 hover:text-white'
            type='button'
            onClick={() => {
              onDelete(id)
            }}
          >
            <MdOutlineDelete size='1.5rem' className='mr-2' /> Delete
          </button>
        )}
      </div>
    </div>
  )
}

ParticipationCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ParticipationCard
