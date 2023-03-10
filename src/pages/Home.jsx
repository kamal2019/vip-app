/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/swiper-bundle.css'

import Card from '../components/Card'
import banner from '../image/banner.png'

function Home() {
  const [posts, setPosts] = React.useState([])
  const [theme] = React.useState(localStorage.getItem('theme') || 'emerald')

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts?sortBy=date:desc&limit=4`)
      .then((res) => {
        setPosts(res.data.results)
      })
      .catch((err) => {
        toast.error(err.response.message)
      })
  }, [theme])

  return (
    <>
      <div
        className='hero min-h-screen/'
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className='hero-overlay bg-opacity-75 backdrop-blur-sm '> </div>
        <div className='hero-content text-center py-8'>
          <div className='max-w-lg text-base-300'>
            <h1 className='mb-5 text-9xl font-black tracking-wider'>
              Talent Exploriz
            </h1>
            <h1 className='mb-10 text-4xl font-black tracking-wider'>
              Show your ability to the world
            </h1>
            <p className='mb-10 text-2xl font-semibold text-justify'>
              Show your physical abilities to the world.
            </p>
            <button
              type='button'
              className='btn btn-block text-lg font-bold border-none transition ease-in-out delay-150 bg-gradient-to-r from-[#223f6f]  to-[#c30404] hover:-translate-y-1 hover:scale-105 duration-300'
              onClick={() => {
                window.location.href = '/posts'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <h1 className='text-6xl font-semibold text-center m-5'>
          Recent Events
        </h1>

        {posts.length > 0 &&
          posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              image={post.image}
              content={post.content}
              date={post.date}
              time={post.time}
              venue={post.venue}
              author={post.author}
              likes={post.likes}
              likesCount={post.likesCount}
              views={post.views}
              id={post.id}
              maxParticipants={post.maxParticipants}
            />
          ))}
      </div>
    </>
  )
}

export default Home
