/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MdOutlineEdit, MdOutlineDelete, MdFileUpload } from 'react-icons/md'

function Post() {
  const [postId] = useState(window.location.pathname.split('/')[2])
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(user && user.role === 'admin')
  const [token] = React.useState(
    user && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const [post, setPost] = useState({})
  const [formData, setFormData] = useState({
    userId: user.id,
    postId,
    image: null,
  })

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
        .then((res) => {
          setPost(res.data)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      window.location.href = '/'
    }
  }, [user, postId])

  const handleChange = (e) => {
    if (e.target.files[0].type.includes('image')) {
      setFormData({ ...formData, image: e.target.files[0] })
    } else if (e.target.files[0].size > 10000000) {
      toast.error('Image size should be less than 10MB')
      setFormData({ ...formData, image: null })
    } else {
      toast.error('Please select an image file')
      setFormData({ ...formData, image: null })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API_URL}/participation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then(() => {
        toast.success('You have successfully applied to join this event')
        toast.info('Please wait for the event admin to approve your request', {
          delay: 4000,
        })
        toast.warning('You will be redirected to the event page', {
          delay: 6000,
        })

        setTimeout(() => {
          window.location.href = '/posts'
        }, 8000)
      })
      .catch((err) => {
        // check if error message has E11000 duplicate key error
        if (err.response.data.message.includes('E11000')) {
          toast.error('You have already applied to this event')
        } else {
          toast.error(err.response.data.message)
        }
      })
  }

  const deletePost = () => {
    // check if user is admin and ask for confirmation
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this post?')
    ) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
        .then((res) => {
          toast.success(res.data.message)
          window.location.href = '/posts'
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <div className='flex flex-col items-center m-5'>
      {post.image && (
        <img
          className='max-h-96 object-cover object-center rounded-xl shadow-xl hover:scale-95 transition-all ease-in-out'
          src={process.env.REACT_APP_IMAGE_URL + post.image}
          alt='logo'
        />
      )}

      <h1 className='text-6xl font-bold m-5'>{post.title}</h1>
      <div className='badge-container flex gap-5 mt-5'>
        <div className='badge badge-outline badge-lg badge-primary text-2xl p-4'>
          <div className='tooltip tooltip-info' data-tip='Event Date'>
            {post.date}
          </div>
        </div>
        <div className='badge badge-outline badge-secondary badge-lg text-2xl p-4'>
          <div className='tooltip tooltip-info' data-tip='Event Time'>
            {post.time}
          </div>
        </div>
        <div className='badge badge-outline badge-accent badge-lg text-2xl p-4'>
          <div className='tooltip tooltip-info' data-tip='Venue'>
            {post.venue}
          </div>
        </div>
      </div>
      <p className='text-2xl p-5 text-justify leading-loose max-w-7xl'>
        {post.content}
      </p>
      <form
        className='flex flex-row gap-5 justify-center'
        onSubmit={handleSubmit}
      >
        <div className='inline'>
          <label className='block' htmlFor='image'>
            <span className='sr-only'>Choose a image</span>
            <input
              type='file'
              onChange={handleChange}
              name='image'
              id='image'
              required
              className='block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-md file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary'
            />
          </label>
          <button
            className='btn btn-primary btn-xl btn-wide text-xl mt-2 disabled:opacity-75'
            type='submit'
            disabled={!formData.image}
          >
            <MdFileUpload size='1.5rem' className='mr-2' />
            Submit
          </button>
        </div>

        {isAdmin && (
          <button
            className='btn btn-warning btn-xl btn-wide mt-12 text-xl font-semibold hover:bg-yellow-500 hover:text-white'
            type='button'
            onClick={() => {
              window.location.href = `/edit-post/${postId}`
            }}
          >
            <MdOutlineEdit size='1.5rem' className='mr-2' /> Edit
          </button>
        )}
        {isAdmin && (
          <button
            className='btn btn-error btn-xl btn-wide mt-12 text-xl font-semibold hover:bg-red-500 hover:text-white'
            type='button'
            onClick={deletePost}
          >
            <MdOutlineDelete size='1.5rem' className='mr-2' /> Delete
          </button>
        )}
      </form>
      <ToastContainer position='bottom-right' closeOnClick />
    </div>
  )
}

export default Post
