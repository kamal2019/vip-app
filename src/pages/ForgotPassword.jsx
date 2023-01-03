/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
        email,
      })
      .then(() => {
        toast.dismiss()
        toast.success('Email sent, check your inbox!')
        toast.info('Redirecting to login page...', {
          delay: 3000,
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 5000)
      })
      .catch((error) => {
        toast.dismiss()
        toast.error(error.response.data.message)
      })

    toast.info('Please wait...')
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg'>
          <span className='pl-8 pr-8'>Email </span>
          <input
            type='email'
            placeholder='your@email.com'
            className='input input-bordered input-lg'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <button
          type='submit'
          className='btn btn-primary mt-10'
          disabled={!email}
        >
          Send
        </button>
        <ToastContainer position='bottom-right' />
      </form>
    </div>
  )
}

export default ForgotPassword
