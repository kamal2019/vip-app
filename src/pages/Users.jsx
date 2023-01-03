import React from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Row from '../components/layout/Users/Row'
import THead from '../components/layout/Users/THead'
import TFoot from '../components/layout/Users/TFoot'
import Pagination from '../components/shared/Pagination'
import Spinner from '../components/spinner/Spinner'

function Users() {
  const [users, setUsers] = React.useState([])
  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))

  const [isAdmin] = React.useState(authUser && authUser.role === 'admin')
  const [isLoading, setIsLoading] = React.useState(true)

  const [token] = React.useState(
    isAdmin && JSON.parse(localStorage.getItem('tokens')).access.token
  )

  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  React.useEffect(() => {
    setIsLoading(true)
    if (isAdmin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users`)
        .then((res) => {
          setUsers(res.data.results)
          setTotalPages(res.data.totalPages)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      window.location.href = '/'
    }
  }, [isAdmin])

  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${process.env.REACT_APP_API_URL}/users?page=${page}`)
      .then((res) => {
        setUsers(res.data.results)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [page])

  const handlePageChange = (currentPage) => {
    setPage(currentPage)
  }

  return (
    <div className='flex flex-col items-center'>
      {isLoading && <Spinner />}

      {users.length > 0 && (
        <table className='table w-full'>
          <THead />
          <tbody>
            {users.map((user) => (
              <Row
                key={user.id}
                id={user.id}
                profilePic={user.profilePic}
                name={user.name}
                email={user.email}
                phone={user.phone}
                role={user.role}
                isEmailVerified={user.isEmailVerified}
                createdAt={user.created_at}
                coins={user.coins}
                averageRating={user.averageRating}
              />
            ))}
          </tbody>
          <TFoot />
        </table>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        handlePageChange={(currentPage) => handlePageChange(currentPage)}
      />
    </div>
  )
}

export default Users
