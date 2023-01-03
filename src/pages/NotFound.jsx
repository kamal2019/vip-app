import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          <h1 className='text-8xl font-bold mb-8'>Oops!</h1>
          <p className='text-5xl mb-8'>404 Page Not Found!</p>
          <Link className='btn btn-lg  btn-primary' to='/'>
            <FaHome className='mr-2' />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
