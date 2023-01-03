import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import Avatar from 'react-avatar'

import { FaCoins } from 'react-icons/fa'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

function Summary({ user }) {
  const verifiedRef = useRef(null)

  useEffect(() => {
    if (user.isEmailVerified) {
      verifiedRef.current.classList.add('badge-success')
    } else {
      verifiedRef.current.classList.add('badge-error')
    }
  }, [user.isEmailVerified])

  return (
    <div className='flex flex-col items-center'>
      <div className='avatar mt-8'>
        <div className='w-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          {user && user.profilePic !== '' ? (
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${user.profilePic}`}
              alt='avatar'
            />
          ) : (
            <Avatar
              name={user.name}
              size={100}
              textSizeRatio={2}
              maxInitials={1}
            />
          )}
        </div>
      </div>
      <div className='flex flex-col items-center'>
        {/* Summary Card */}
        <h1 className='font-semibold text-5xl tracking-tight m-10'>Summary</h1>
        <div className='card shadow-md shadow-stone-500 m-5 p-5'>
          <div className='grid grid-cols-2'>
            {/* Name */}
            <span className='font-semibold text-2xl m-5'>Name</span>
            <span className='font-semibold text-2xl m-5'>{user.name}</span>
            {/* Role */}
            <span className='font-semibold text-2xl m-5'>Role</span>
            <span className='font-semibold text-2xl m-5'>{user.role}</span>
            {/* Verified */}
            <span className='font-semibold text-2xl m-5'>Verified</span>
            <span className='font-semibold text-2xl m-5'>
              <div className='badge badge-lg badge-outline' ref={verifiedRef}>
                {user.isEmailVerified ? 'Yes' : 'No'}
              </div>
            </span>
            {/* Ratings */}
            <span className='font-semibold text-2xl m-5'>Rating</span>
            <span className='font-semibold text-2xl m-5 flex'>
              {user.averageRating === 0 && (
                <>
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                </>
              )}

              {user.averageRating > 0 && user.averageRating <= 1 && (
                <>
                  <AiFillStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                </>
              )}

              {user.averageRating > 1 && user.averageRating <= 2 && (
                <>
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                </>
              )}

              {user.averageRating > 2 && user.averageRating <= 3 && (
                <>
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                </>
              )}

              {user.averageRating > 3 && user.averageRating <= 4 && (
                <>
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiOutlineStar className='text-yellow-500' />
                </>
              )}

              {user.averageRating > 4 && user.averageRating <= 5 && (
                <>
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                  <AiFillStar className='text-yellow-500' />
                </>
              )}
            </span>
            {/* Joined */}
            <span className='font-semibold text-2xl m-5'>Joined</span>
            <span className='font-semibold text-2xl m-5'>
              {user.created_at
                ? moment(user.created_at).format('MMMM Do YYYY')
                : '-'}
            </span>
            {/* Bio */}
            <span className='font-semibold text-2xl m-5'>Bio</span>
            <article className='text-2xl m-5 max-w-md line-clamp-1'>
              {user.bio ? user.bio : '-'}
            </article>
            {/* Coins */}
            <span className='font-semibold text-2xl m-5'>
              Coins{' '}
              <FaCoins className=' text-yellow-500 inline text-2xl ml-3' />
            </span>
            <span className='font-semibold text-2xl m-5'>
              {user.coins} {user.coins === 1 ? 'Coin' : 'Coins'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

Summary.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    averageRating: PropTypes.number.isRequired,
    isEmailVerified: PropTypes.bool.isRequired,
    profilePic: PropTypes.string,
    created_at: PropTypes.string,
    bio: PropTypes.string,
    coins: PropTypes.number.isRequired,
  }).isRequired,
}

export default Summary
