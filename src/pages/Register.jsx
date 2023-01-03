/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import axios from 'axios'

import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const { name, email, password, phone } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        name,
        email,
        password,
        phone,
      })
      .then((res) => {
        localStorage.setItem('tokens', JSON.stringify(res.data.tokens))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast.success('Login Successful')
        window.location.href = '/'
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
    <div className='flex justify-center items-center min-h-screen'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg'>
          <span className='pl-8 pr-8'>Name </span>
          <input
            type='text'
            placeholder='John Doe'
            className='input input-bordered input-lg'
            value={name}
            name='name'
            onChange={handleChange}
            required
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Email </span>
          <input
            type='text'
            placeholder='info@site.com'
            className='input input-bordered input-lg'
            value={email}
            name='email'
            onChange={handleChange}
            required
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Phone</span>
          <input
            type='tel'
            placeholder='98XXXXXXXX'
            className='input input-bordered input-lg'
            value={phone}
            name='phone'
            onChange={handleChange}
            required
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span>Password</span>
          <input
            type='password'
            id='password'
            placeholder='********'
            className='input input-bordered input-lg'
            value={password}
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

        <div className='form-control mt-5'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={!name || !email || !password || !phone}
          >
            Register
          </button>

          <label className='label mt-5'>
            <span className='text-lg font-semibold'>Already a user</span>
            <a
              href='/login'
              className='label-text-alt link link-hover link-secondary text-lg font-semibold'
            >
              Login
            </a>
          </label>
        </div>
      </form>
    </div>
  )
}

export default Register
