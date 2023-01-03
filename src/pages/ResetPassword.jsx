/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ResetPassword() {
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
  })
  const [errorMessage, setErrorMessage] = React.useState('')
  const [token] = React.useState(window.location.pathname.split('=')[1])

  const isFormValid = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match')
      return false
    }
    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters')
      return false
    }
    // make sure password has at least one number and  one number
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
    if (!regex.test(formData.password)) {
      setErrorMessage(
        'Password must contain at least one number and one letter'
      )
      return false
    }

    setErrorMessage('')
    return true
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    isFormValid()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isFormValid()) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/reset-password?token=${token}`,
          {
            password: formData.password,
          }
        )
        .then(() => {
          toast.dismiss()
          toast.success('Password updated!')
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
    } else {
      toast.error(errorMessage)
    }
  }

  const toogleShowPassword = () => {
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      confirmPasswordInput.type = 'text'
    } else {
      passwordInput.type = 'password'
      confirmPasswordInput.type = 'password'
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg mb-5'>
          <span className='px-16'>Password </span>
          <input
            type='password'
            id='password'
            placeholder='********'
            className='input input-bordered input-lg'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />

          <label className='swap swap-rotate -ml-10'>
            <input
              type='checkbox'
              className='hidden'
              onClick={toogleShowPassword}
            />
            <FaEye className='swap-on fill-current' size={24} />
            <FaEyeSlash className='swap-off fill-current' size={24} />
          </label>
        </label>
        <label className='input-group input-group-lg'>
          <span className='pl-8 pr-8'>Confirm Password </span>
          <input
            type='password'
            id='confirmPassword'
            placeholder='********'
            className='input input-bordered input-lg'
            value={formData.confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
            required
          />

          <label className='swap swap-rotate -ml-10'>
            <input
              type='checkbox'
              className='hidden'
              onClick={toogleShowPassword}
            />
            <FaEye className='swap-on fill-current' size={24} />
            <FaEyeSlash className='swap-off fill-current' size={24} />
          </label>
        </label>
        <button
          type='submit'
          className='btn btn-primary mt-10'
          disabled={!formData.password || !formData.confirmPassword}
        >
          Send
        </button>
        <ToastContainer position='bottom-right' />
      </form>
    </div>
  )
}

export default ResetPassword
