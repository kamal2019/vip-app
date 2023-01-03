/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddCertificate() {
  const [isValidImageSelected, setIsValidImageSelected] = useState(false)
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(user && user.role === 'admin')
  const [token] = React.useState(
    isAdmin && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const [formData, setFormData] = useState({
    givenFor: '',
    givenBy: user.id,
    givenTo: '',
    image: File,
  })

  const handleImageChange = (e) => {
    if (!e.target.files[0].type.includes('image')) {
      toast.error('Please select an image file')
      setFormData({ ...formData, image: File })
      setIsValidImageSelected(false)
    } else if (e.target.files[0].size > 10000000) {
      toast.error('Image size should be less than 10MB')
      setFormData({ ...formData, image: File })
      setIsValidImageSelected(false)
    } else {
      setFormData({ ...formData, image: e.target.files[0] })
      setIsValidImageSelected(true)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/certificates`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        toast.success('Certificate added successfully')
        setTimeout(() => {
          window.location.href = '/certificates'
        }, 3000)
      })
      .catch((err) => {
        // check if error message has E11000 duplicate key error
        if (err.response.data.message.includes('E11000')) {
          toast.error('You have already issued this certificate')
        } else {
          toast.error(err.response.data.message)
        }
      })
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg m-5'>
          <span className='pl-5 pr-5'>Event Id </span>
          <input
            type='text'
            placeholder='Event Id'
            className='input input-bordered input-lg text-xl'
            value={formData.givenFor}
            name='givenFor'
            onChange={handleChange}
            required
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-5 pr-5'>User Id </span>
          <input
            type='text'
            placeholder='User Id'
            className='input input-bordered input-lg text-xl'
            value={formData.givenTo}
            name='givenTo'
            onChange={handleChange}
            required
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
            disabled={
              !formData.givenFor || !formData.givenTo || !isValidImageSelected
            }
          >
            Add Post
          </button>
        </div>
      </form>
      <ToastContainer position='bottom-right' closeOnClick />
    </div>
  )
}

export default AddCertificate
