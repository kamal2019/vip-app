/* eslint-disable no-alert */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'
import { AiOutlineCopy } from 'react-icons/ai'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'
import moment from 'moment'
import Avatar from 'react-avatar'

function Row({
  id,
  profilePic,
  name,
  email,
  phone,
  role,
  isEmailVerified,
  createdAt,
  coins,
  averageRating,
}) {
  const badgeRef = useRef(null)

  useEffect(() => {
    if (isEmailVerified) {
      badgeRef.current.classList.add('badge-success')
    } else {
      badgeRef.current.classList.add('badge-error')
    }
  }, [isEmailVerified])

  const deleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
        .then(() => {
          toast.success('User deleted successfully')
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id)
    toast.success('Copied to clipboard')
  }

  return (
    <tr>
      <td>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='mask mask-circle w-12 h-12'>
              {profilePic !== '' ? (
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/${profilePic}`}
                  alt='avatar'
                />
              ) : (
                <Avatar
                  name={name}
                  size={48}
                  textSizeRatio={1.6}
                  maxInitials={1}
                />
              )}
            </div>
          </div>
          <div>
            <div className='font-bold ml-2'>{name}</div>
          </div>
        </div>
      </td>
      <td>
        <div className=' font-mono'>{email}</div>
        <br />
      </td>
      <td>
        <div className=' font-mono'>{phone}</div>
        <br />
      </td>
      <td>
        <div className='badge badge-outline badge-lg' ref={badgeRef}>
          {isEmailVerified ? 'Verified' : 'Not Verified'}
        </div>
        <br />
      </td>
      <td>
        <div className='font-bold ml-2'>{role}</div>
      </td>
      <td>{moment(createdAt).fromNow()}</td>
      <td>
        <div className='font-semibold text-lg'>{averageRating}</div>
      </td>
      <td>
        <div className='font-semibold text-lg'>{coins}</div>
      </td>

      <td>
        <span
          className='text-2xl tooltip bg-transparent cursor-pointer'
          data-tip='Copy User Id'
        >
          <AiOutlineCopy
            className='inline mr-2'
            size='2rem'
            onClick={copyToClipboard}
          />
        </span>
      </td>

      <td>
        <button
          className='btn btn-warning btn-xl btn-circle mt-5 text-xl font-semibold'
          type='button'
          onClick={() => {
            window.location.href = `/edit-user/${id}`
          }}
        >
          <MdOutlineEdit size='1.5rem' />
        </button>
      </td>
      <td>
        <button
          className='btn btn-error btn-xl btn-circle mt-5 text-xl font-semibold'
          type='button'
          onClick={deleteUser}
        >
          <MdOutlineDelete size='1.5rem' />
        </button>
      </td>
    </tr>
  )
}

Row.propTypes = {
  id: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  isEmailVerified: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  coins: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
}

export default Row
