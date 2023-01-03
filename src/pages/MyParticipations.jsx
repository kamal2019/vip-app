/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import React from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ParticipationCard from '../components/ParticipationCard'

function MyParticipations() {
  const [participations, setParticipations] = React.useState([])
  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(authUser && authUser.role === 'admin')
  const [token] = React.useState(
    authUser && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/participation/user/${authUser.id}`)
      .then((res) => {
        setParticipations(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }, [authUser])

  const handleStatusChange = (e, id) => {
    if (isAdmin) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/participation/${id}`, {
          status: e.target.value,
        })
        .then((res) => {
          toast.success('Status updated successfully')
          // update the status in the state
          const newParticipations = participations.map((participation) => {
            if (participation.id === id) {
              participation.status = res.data.status
            }
            return participation
          })
          setParticipations(newParticipations)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      toast.error('You are not authorized to change this participation')
    }
  }

  const handleDelete = (eventId) => {
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this participation?')
    ) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/participation/${eventId}`)
        .then(() => {
          toast.success('Participation deleted successfully')
          // update the status in the state
          const newParticipants = participations.filter(
            (participant) => participant.id !== eventId
          )
          setParticipations(newParticipants)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-6xl font-semibold m-5'>My Participations</h1>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 m-5'>
        {participations.map((participation) => (
          <ParticipationCard
            key={participation.id}
            user={participation.userId}
            post={participation.postId}
            image={participation.image}
            status={participation.status}
            createdAt={participation.createdAt}
            id={participation.id}
            isAdmin={isAdmin}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {participations.length === 0 && (
        <h1 className='font-semibold text-4xl tracking-tight m-10 text-center'>
          No participations yet. 😔
        </h1>
      )}
    </>
  )
}

export default MyParticipations
