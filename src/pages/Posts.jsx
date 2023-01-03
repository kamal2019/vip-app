import React from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { TiPlus } from 'react-icons/ti'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/shared/Pagination'
import Spinner from '../components/spinner/Spinner'

function Posts() {
  const [posts, setPosts] = React.useState([])
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))

  const [isAdmin] = React.useState(user && user.role === 'admin')
  const [isLoading, setIsLoading] = React.useState(true)

  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts?sortBy=date:desc`)
      .then((res) => {
        setPosts(res.data.results)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts?page=${page}`)
      .then((res) => {
        setPosts(res.data.results)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [page])

  const handleSearch = (searchQuery) => {
    const formData = new FormData()
    formData.append('searchTerm', searchQuery)
    setIsLoading(true)

    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/search`, formData)
      .then((res) => {
        setPosts(res.data.results)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleFilter = (filter) => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('sortBy', filter)
    window.history.pushState({}, '', `?${queryParams.toString()}`)
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts?${queryParams.toString()}`)
      .then((res) => {
        setPosts(res.data.results)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  const handlePageChange = (currentPage) => {
    setPage(currentPage)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='lg:flex lg:justify-between'>
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilter={handleFilter} />

        {isAdmin && (
          <div className='tooltip tooltip-bottom' data-tip='New Post'>
            <button
              className='btn btn-square btn-primary mt-5 '
              type='button'
              onClick={() => {
                window.location.href = '/create-post'
              }}
            >
              <TiPlus size='22px' />
            </button>
          </div>
        )}
      </div>

      {isLoading && <Spinner />}

      {posts.length > 0 &&
        posts.map((post) => (
          <Card
            title={post.title}
            image={post.image}
            content={post.content}
            date={post.date}
            time={post.time}
            venue={post.venue}
            author={post.author}
            likes={post.likes}
            likesCount={post.likesCount}
            maxParticipants={post.maxParticipants}
            views={post.views}
            id={post.id}
            key={post.id}
          />
        ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        handlePageChange={(currentPage) => handlePageChange(currentPage)}
      />
    </div>
  )
}

export default Posts
