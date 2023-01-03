/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [maxParticipants, setMaxParticipants] = useState(0)

  const [user] = useState(JSON.parse(localStorage.getItem('user')))
  const [isLoggedIn] = React.useState(user && user.id)
  const [isAdmin] = useState(user && user.role === 'admin')
  const [token] = React.useState(
    isLoggedIn && JSON.parse(localStorage.getItem('tokens')).access.token
  )

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const handleChange = (e) => {
    // Check if the file is an image
    if (e.target.files[0].type.includes('image')) {
      setImage(e.target.files[0])
    } else {
      toast.error('File is not an image!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('date', date)
    formData.append('time', time)
    formData.append('venue', venue)
    formData.append('authorId', user.id)
    formData.append('image', image)
    formData.append('maxParticipants', maxParticipants)

    axios
      .post(`${process.env.REACT_APP_API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        toast.success('Post added successfully!')
        window.location.href = '/posts'
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/'
    }
  })

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='form-control' onSubmit={handleSubmit}>
        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Title </span>
          <input
            type='text'
            placeholder='Post Title'
            className='input input-bordered input-lg text-xl'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Date </span>
          <input
            type='date'
            className='input input-bordered input-lg'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Time </span>
          <input
            type='time'
            className='input input-bordered input-lg'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Venue </span>
          <input
            type='text'
            className='input input-bordered input-lg'
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </label>

        <label className='input-group input-group-lg m-5'>
          <span className='pl-8 pr-8'>Max Participants </span>
          <input
            type='number'
            className='input input-bordered input-lg'
            required
            onChange={(e) => setMaxParticipants(e.target.value)}
            value={maxParticipants}
            name='maxParticipants'
            min={0}
          />
        </label>

        <label className='block m-5' htmlFor='image'>
          <span className='sr-only'>Choose a image</span>
          <input
            type='file'
            onChange={handleChange}
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
              !title ||
              !content ||
              !date ||
              !time ||
              !venue ||
              !image ||
              !maxParticipants
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

export default AddPost
