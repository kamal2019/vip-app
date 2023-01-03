/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Settings() {
  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [token] = React.useState(
    authUser && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  const [isImageUploaded, setIsImageUploaded] = useState(false)

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    profilePic: File,
  })

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me`)
      .then((res) => {
        setFormData(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }, [])

  const handleImageChange = (e) => {
    if (!e.target.files[0].type.includes('image')) {
      toast.error('Please select an image file')
      setFormData({ ...formData, profilePic: File })
      setIsImageUploaded(false)
    } else if (e.target.files[0].size > 10000000) {
      toast.error('Image size should be less than 10MB')
      setFormData({ ...formData, profilePic: File })
      setIsImageUploaded(false)
    } else {
      setFormData({ ...formData, profilePic: e.target.files[0] })
      setIsImageUploaded(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isImageUploaded) {
      const imageForm = new FormData()
      imageForm.append('profilePic', formData.profilePic)
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/profilepic/${authUser.id}`,
          imageForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
    const textForm = new FormData()
    textForm.append('name', formData.name)
    textForm.append('email', formData.email)
    textForm.append('phone', formData.phone)
    textForm.append('bio', formData.bio)
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users/${authUser.id}`, textForm)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        toast.success('Profile updated successfully')
        setTimeout(() => {
          window.location.href = '/profile'
        }, 2000)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-semibold text-5xl tracking-tight m-10'>
        Edit Profile
      </h1>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg'>
          <span className='pl-8 pr-8'>Name </span>
          <input
            type='text'
            placeholder='John Doe'
            className='input input-bordered input-lg'
            value={formData.name}
            onChange={handleChange}
            name='name'
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Email </span>
          <input
            type='text'
            placeholder='info@site.com'
            className='input input-bordered input-lg'
            value={formData.email}
            onChange={handleChange}
            name='email'
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
            value={formData.phone}
            onChange={handleChange}
            name='phone'
          />
        </label>

        <label className='input-group input-group-lg mt-5'>
          <span className='pl-8 pr-8'>Bio </span>
          <textarea
            className='textarea text-lg'
            placeholder='Longer bio here'
            rows='5'
            cols='27'
            value={formData.bio}
            onChange={handleChange}
            name='bio'
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
            Update Profile
          </button>
        </div>
      </form>
      <ToastContainer position='bottom-right' closeOnClick />
    </div>
  )
}

export default Settings
