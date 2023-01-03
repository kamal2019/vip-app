/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function EditPost() {
  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(authUser && authUser.role === 'admin')
  const [token] = React.useState(
    isAdmin && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  const [postId] = React.useState(window.location.pathname.split('/')[2])
  const [isImageUploaded, setIsImageUploaded] = useState(false)

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    time: '',
    venue: '',
    maxParticipants: 0,
    image: File,
  })

  React.useEffect(() => {
    if (isAdmin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
        .then((res) => {
          setFormData(res.data)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      window.location.href = '/'
    }
  }, [isAdmin, postId])

  const handleImageChange = (e) => {
    if (!e.target.files[0].type.includes('image')) {
      toast.error('Please select an image file')
      setFormData({ ...formData, image: File })
      setIsImageUploaded(false)
    } else if (e.target.files[0].size > 10000000) {
      toast.error('Image size should be less than 10MB')
      setFormData({ ...formData, image: File })
      setIsImageUploaded(false)
    } else {
      setFormData({ ...formData, image: e.target.files[0] })
      setIsImageUploaded(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const sendFormData = new FormData()
    sendFormData.append('title', formData.title)
    sendFormData.append('content', formData.content)
    sendFormData.append('date', formData.date)
    sendFormData.append('time', formData.time)
    sendFormData.append('venue', formData.venue)
    sendFormData.append('authorId', formData.authorId)
    sendFormData.append('maxParticipants', formData.maxParticipants)
    if (isImageUploaded) {
      sendFormData.append('image', formData.image)
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/posts/${postId}`,
          sendFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          toast.success('Post updated successfully')
          setTimeout(() => {
            window.location.href = '/posts'
          }, 3000)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, sendFormData)
        .then(() => {
          toast.success('Post updated successfully')
          setTimeout(() => {
            window.location.href = '/posts'
          }, 3000)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Title </span>
          <input
            type='text'
            placeholder='Post Title'
            className='input input-bordered input-lg text-xl'
            required
            value={formData.title}
            onChange={handleChange}
            name='title'
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-5 pr-5'>Content </span>
          <textarea
            type='text'
            placeholder='Post Content'
            className='textarea textarea-bordered input-lg text-xl'
            cols='30'
            rows='10'
            required
            value={formData.content}
            onChange={handleChange}
            name='content'
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Date </span>
          <input
            type='date'
            className='input input-bordered input-lg'
            required
            value={formData.date}
            onChange={handleChange}
            name='date'
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Time </span>
          <input
            type='time'
            className='input input-bordered input-lg'
            required
            value={formData.time}
            onChange={handleChange}
            name='time'
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Venue </span>
          <input
            type='text'
            className='input input-bordered input-lg'
            required
            value={formData.venue}
            onChange={handleChange}
            name='venue'
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Max Participants </span>
          <input
            type='number'
            className='input input-bordered input-lg'
            required
            onChange={handleChange}
            value={formData.maxParticipants}
            name='maxParticipants'
            min={0}
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
              !formData.title ||
              !formData.content ||
              !formData.date ||
              !formData.time ||
              !formData.venue ||
              !formData.maxParticipants
            }
          >
            Update Post
          </button>
        </div>
      </form>
      <ToastContainer position='bottom-right' closeOnClick />
    </div>
  )
}

export default EditPost
