/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function EditUser() {
  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(authUser && authUser.role === 'admin')
  const [token] = React.useState(
    isAdmin && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  const [userId] = React.useState(window.location.pathname.split('/')[2])

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    isEmailVerified: false,
    createdAt: '',
    coins: 0,
    averageRating: 0,
    bio: '',
    profilePic: File,
  })

  React.useEffect(() => {
    if (isAdmin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
        .then((res) => {
          setFormData(res.data)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      window.location.href = '/'
    }
  }, [isAdmin, userId])

  const {
    name,
    email,
    phone,
    role,
    isEmailVerified,
    coins,
    averageRating,
    bio,
  } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    if (e.target.files[0].type.includes('image')) {
      setFormData({ ...formData, profilePic: e.target.files[0] })
    } else if (e.target.files[0].size > 10000000) {
      toast.error('Image size should be less than 10MB')
    } else {
      toast.error('Please select an image file')
      setFormData({ ...formData, profilePic: File })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.profilePic) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/${userId}/special`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          toast.success('User updated successfully')
          setTimeout(() => {
            window.location.href = '/users'
          }, 3000)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
        .finally((res) => {
          if (!isAdmin) localStorage.setItem('user', JSON.stringify(res.data))
        })
    } else {
      delete formData.profilePic
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/${userId}/special`,
          formData
        )
        .then(() => {
          toast.success('User updated successfully')
          setTimeout(() => {
            window.location.href = '/users'
          }, 3000)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
        .finally((res) => {
          if (!isAdmin) localStorage.setItem('user', JSON.stringify(res.data))
        })
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-semibold text-5xl tracking-tight m-10'>Edit User</h1>
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
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Phone </span>
          <input
            type='tel'
            placeholder='98XXXXXXXX'
            className='input input-bordered input-lg'
            minLength={10}
            maxLength={10}
            value={phone}
            name='phone'
            onChange={handleChange}
          />
        </label>

        {isAdmin && (
          <label className='input-group input-group-lg mt-5'>
            <span className='pl-8 pr-8'>Role </span>
            <select
              className='select select-bordered select-lg w-full max-w-xs'
              value={role}
              name='role'
              onChange={handleChange}
            >
              <option disabled>Role</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          </label>
        )}

        {isAdmin && (
          <label className='input-group input-group-lg mt-5'>
            <span className='pl-8 pr-8'>Status </span>
            <select
              className='select select-bordered select-lg w-full max-w-xs'
              value={isEmailVerified}
              name='isEmailVerified'
              onChange={handleChange}
            >
              <option disabled>Status</option>
              <option value='true'>Verified</option>
              <option value='false'>Not Verified</option>
            </select>
          </label>
        )}

        {isAdmin && (
          <label className='input-group input-group-lg mt-5'>
            <span className='pl-8 pr-8'>Coins </span>
            <input
              type='number'
              placeholder='69'
              min={0}
              className='input input-bordered input-lg '
              value={coins}
              name='coins'
              onChange={handleChange}
            />
          </label>
        )}

        {isAdmin && (
          <label className='input-group input-group-lg mt-5'>
            <span className='pl-8 pr-8'>Rating </span>
            <input
              type='number'
              placeholder='3.7'
              min={0}
              max={5}
              className='input input-bordered input-lg'
              value={averageRating}
              name='averageRating'
              onChange={handleChange}
            />
          </label>
        )}

        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Bio </span>
          <textarea
            className='textarea text-lg'
            placeholder='Longer bio here'
            rows='5'
            cols='27'
            maxLength={500}
            value={bio}
            name='bio'
            onChange={handleChange}
          />
        </label>

        <label className='block m-5' htmlFor='image'>
          <span className='sr-only'>Choose a image</span>
          <input
            type='file'
            onChange={handleImageChange}
            name='image'
            id='image'
            className='block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-md file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary'
          />
        </label>

        <div className='form-control mt-5'>
          <button
            className='btn btn-primary mt-5 disabled:opacity-75 mb-5'
            type='submit'
          >
            Update User
          </button>
        </div>
      </form>
      <ToastContainer position='bottom-right' closeOnClick />
    </div>
  )
}

export default EditUser
