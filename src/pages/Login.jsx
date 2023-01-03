/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import axios from 'axios'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
      .then((res) => {
        localStorage.setItem('tokens', JSON.stringify(res.data.tokens))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast.success('Login Successful')
        setTimeout(() => {
          window.location.href = '/'
        }, 2500)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  const toogleShowPassword = () => {
    const passwordInput = document.getElementById('password')
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
    } else {
      passwordInput.type = 'password'
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen sm:p-5'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Email </span>
          <input
            type='email'
            placeholder='info@site.com'
            className='input input-bordered input-lg'
            value={email}
            name='email'
            onChange={handleChange}
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span>Password</span>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered input-lg'
            value={password}
            name='password'
            id='password'
            onChange={handleChange}
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

        <div className='form-control mt-5'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={!email || !password}
          >
            Login
          </button>

          <label className='label mt-5'>
            <a
              href='/forgot-password'
              className='label-text-alt link link-hover link-secondary text-lg font-semibold'
            >
              Forgot Password
            </a>
            <a
              href='/register'
              className='label-text-alt link link-hover link-accent text-lg font-semibold'
            >
              Create Account
            </a>
          </label>
        </div>
      </form>
    </div>
  )
}

export default Login
