/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ParticipationCard from '../components/ParticipationCard'

function Participants() {
  const [participants, setParticipants] = useState([])
  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(authUser && authUser.role === 'admin')
  const [token] = React.useState(
    authUser && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  useEffect(() => {
    if (isAdmin) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/participation`)
        .then((res) => {
          setParticipants(res.data)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      window.location.href = '/'
    }
  }, [isAdmin])

  const handleStatusChange = (e, id) => {
    if (isAdmin) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/participation/${id}`, {
          status: e.target.value,
        })
        .then((res) => {
          toast.success('Status updated successfully')
          // update the status in the state
          const newParticipants = participants.map((participant) => {
            if (participant.id === id) {
              participant.status = res.data.status
            }
            return participant
          })
          setParticipants(newParticipants)
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
          const newParticipants = participants.filter(
            (participant) => participant.id !== eventId
          )
          setParticipants(newParticipants)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-6xl font-semibold m-5'>Participants</h1>
      </div>

      <div className='grid grid-cols-4 gap-5 m-5'>
        {participants.map((participant) => (
          <ParticipationCard
            key={participant.id}
            user={participant.userId}
            post={participant.postId}
            image={participant.image}
            status={participant.status}
            createdAt={participant.createdAt}
            id={participant.id}
            isAdmin={isAdmin}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {participants.length === 0 && (
        <h1 className='font-semibold text-4xl tracking-tight m-10 text-center'>
          No participants yet 😔
        </h1>
      )}
    </>
  )
}

export default Participants
