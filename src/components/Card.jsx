/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEye,
  AiOutlineUserAdd,
  AiOutlineCopy,
} from 'react-icons/ai'

import {
  MdEventSeat,
  MdOutlineEdit,
  MdOutlineDelete,
  MdLock,
} from 'react-icons/md'

function Card({
  image,
  title,
  date,
  time,
  venue,
  content,
  id,
  views,
  likes,
  likesCount,
  maxParticipants,
}) {
  const [likeCount, setlikeCount] = useState(likesCount)
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(user && user.role === 'admin')
  const [isLoggedIn] = React.useState(user && user.id)
  const [authToken] = React.useState(
    isLoggedIn && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  const [liked, setLiked] = useState(
    (isLoggedIn && likes.includes(user.id)) || false
  )
  const [remaningSeats, setRemaningSeats] = useState(0)

  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
  const likeCounterRef = useRef(null)
  const cardRef = useRef(null)
  const checkoutRef = useRef(null)

  const formatLargeNumber = (num) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}B`
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`
    }
    return num
  }

  const likePost = () => {
    if (isLoggedIn) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/posts/like/${id}`)
        .then((res) => {
          setLiked(true)
          setlikeCount(likeCount + 1)
          likeCounterRef.current.style = `--value: ${formatLargeNumber(
            likeCounterRef
          )}`
          toast.success(res.data.message)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      toast.error('You must be logged in to like a post')
    }
  }

  const unlikePost = () => {
    if (isLoggedIn) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/posts/unlike/${id}`)
        .then((res) => {
          setLiked(false)
          setlikeCount(likeCount - 1)
          likeCounterRef.current.style = `--value: ${formatLargeNumber(
            likeCount
          )}`
          toast.success(res.data.message)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      toast.error('You must be logged in to unlike a post')
    }
  }

  const deletePost = () => {
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this post?')
    ) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
        .then((res) => {
          toast.success(res.data.message)
          // reload page
          window.location.reload()
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success('Copied to clipboard')
    })
  }

  useEffect(() => {
    likeCounterRef.current.style = `--value: ${likeCount}`
  }, [liked, likeCount])

  useEffect(() => {
    if (isAdmin && isLoggedIn) {
      checkoutRef.current.classList.add('btn-wide')
    } else if (!isAdmin && isLoggedIn) {
      checkoutRef.current.classList.add('btn-block')
    } else if (!isLoggedIn) {
      checkoutRef.current.classList.add('btn-block')
    }
  }, [isAdmin, isLoggedIn])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/participation/post/${id}`)
      .then((res) => {
        setRemaningSeats(maxParticipants - res.data.length)
      })
  }, [id, maxParticipants])

  return (
    <div
      className='card lg:card-side max-w-max m-5 bg-base-100 shadow-md shadow-gray-500 hover:shadow-xl hover:scale-95 hover:bg-transparent transition-all'
      ref={cardRef}
    >
      <figure>
        <img
          className=' w-96 h-96 object-cover object-center'
          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
          alt='event'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-4xl font-extrabold tracking-wide'>
          {title}
        </h2>

        <div className='badge-container flex flex-row gap-5 mt-5'>
          <div className='badge badge-outline badge-lg badge-primary text-xl p-4 text-ellipsis'>
            <div className='tooltip tooltip-info' data-tip='Event Date'>
              {new Date(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
          <div className='badge badge-outline badge-secondary badge-lg text-xl p-4'>
            <div className='tooltip tooltip-info' data-tip='Event Time'>
              {time}
            </div>
          </div>
          <div className='badge badge-outline badge-accent badge-lg text-xl p-4 capitalize'>
            <div className='tooltip tooltip-info' data-tip='Venue'>
              {venue}
            </div>
          </div>
        </div>
        <p className='mt-5 text-2xl text-clip max-w-prose leading-relaxed'>
          {content}
        </p>
        <div className='flex gap-10 mt-5'>
          <button type='button' onClick={liked ? unlikePost : likePost}>
            {liked ? (
              <div className='tooltip bg-transparent' data-tip='Liked'>
                <AiFillHeart size='2rem' className=' fill-red-500' />
              </div>
            ) : (
              <div className='tooltip bg-transparent' data-tip='Like'>
                <AiOutlineHeart size='2rem' />
              </div>
            )}
            <span className='countdown text-2xl -translate-y-2 ml-2'>
              <span ref={likeCounterRef} />
            </span>
          </button>
          <span className='text-2xl tooltip bg-transparent' data-tip='Views'>
            <AiFillEye className='inline mr-2' size='2rem' />
            {formatLargeNumber(views)}
          </span>
          <span
            className='text-2xl tooltip bg-transparent'
            data-tip='Remaining Seats'
          >
            <MdEventSeat className='inline mr-2' size='2rem' />
            {remaningSeats > 0 ? formatLargeNumber(remaningSeats) : 'Full'}
          </span>
          {isAdmin && (
            <span
              className='text-2xl tooltip bg-transparent cursor-pointer'
              data-tip='Copy Post Id'
            >
              <AiOutlineCopy
                className='inline mr-2'
                size='2rem'
                onClick={copyToClipboard}
              />
            </span>
          )}
        </div>
        <div className='card-actions gap-5'>
          {!isLoggedIn && (
            <button
              className='btn btn-primary btn-xl mt-5 text-xl font-semibold hover:bg-primary-focus hover:text-white'
              type='button'
              ref={checkoutRef}
              onClick={() => {
                window.location.href = `/register/`
              }}
            >
              <AiOutlineUserAdd size='1.5rem' className='mr-2' /> Register
            </button>
          )}
          {isLoggedIn && (
            <button
              className='btn btn-primary btn-xl mt-5 text-xl font-semibold hover:bg-primary-focus hover:text-white'
              type='button'
              ref={checkoutRef}
              onClick={() => {
                window.location.href = `/post/${id}`
              }}
              disabled={remaningSeats === 0}
            >
              {remaningSeats === 0 ? (
                <MdLock size='1.5rem' className='mr-2' />
              ) : (
                <AiOutlineUserAdd size='1.5rem' className='mr-2' />
              )}

              {remaningSeats === 0 ? 'Sold Out' : 'Apply'}
            </button>
          )}

          {isAdmin && (
            <button
              className='btn btn-warning btn-xl btn-wide mt-5 text-xl font-semibold hover:bg-yellow-500 hover:text-white'
              type='button'
              onClick={() => {
                window.location.href = `/edit-post/${id}`
              }}
            >
              <MdOutlineEdit size='1.5rem' className='mr-2' /> Edit
            </button>
          )}
          {isAdmin && (
            <button
              className='btn btn-error btn-xl btn-wide mt-5 text-xl font-semibold hover:bg-red-500 hover:text-white'
              type='button'
              onClick={deletePost}
            >
              <MdOutlineDelete size='1.5rem' className='mr-2' /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  likes: PropTypes.array.isRequired,
  likesCount: PropTypes.number.isRequired,
  maxParticipants: PropTypes.number.isRequired,
}

export default Card
