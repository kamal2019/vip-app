/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Card from '../components/Card'
import Certificate from '../components/layout/Profile/Certificate'
import ParticipationCard from '../components/ParticipationCard'
import Summary from '../components/layout/Profile/Summary'

function User() {
  const [userData, setUserData] = React.useState({})
  const [posts, setPosts] = React.useState([])
  const [participantions, setParticipations] = React.useState([])
  const [certificates, setCertificates] = React.useState([])

  const [authUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(authUser && authUser.role === 'admin')
  const [token] = React.useState(
    authUser && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  const [userId] = React.useState(window.location.pathname.split('/')[2])

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  React.useEffect(() => {
    // fetch user data
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .then((res) => {
        setUserData(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

    // fetch posts
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/user/${userId}`)
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

    // fetch participations
    axios
      .get(`${process.env.REACT_APP_API_URL}/participation/user/${userId}`)
      .then((res) => {
        setParticipations(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

    // fetch certificates
    axios
      .get(`${process.env.REACT_APP_API_URL}/certificates/user/${userId}`)
      .then((res) => {
        setCertificates(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }, [userId])

  const handleStatusChange = (e, id) => {
    if (isAdmin) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/participation/${id}`, {
          status: e.target.value,
        })
        .then((res) => {
          toast.success('Status updated successfully')
          const newParticipations = participantions.map((participation) => {
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

  const handleDeleteParticipation = (eventId) => {
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this participation?')
    ) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/participation/${eventId}`)
        .then(() => {
          toast.success('Participation deleted successfully')
          // update the status in the state
          const newParticipants = participantions.filter(
            (participant) => participant.id !== eventId
          )
          setParticipations(newParticipants)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  const handleDeleteCertificate = (certificateId) => {
    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this certificate?')
    ) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/certificates/${certificateId}`
        )
        .then(() => {
          setCertificates(
            certificates.filter(
              (certificate) => certificate.id !== certificateId
            )
          )
          toast.success('Certificate deleted successfully')
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {userData.id && <Summary user={userData} />}

      {isAdmin && posts.length > 0 && (
        <>
          <h1 className='font-semibold text-5xl tracking-tight m-10'>
            Recent Posts
          </h1>
          {posts.length > 0 &&
            posts.map((post) => (
              <Card
                key={post.id}
                image={post.image}
                title={post.title}
                date={post.date}
                time={post.time}
                venue={post.venue}
                content={post.content}
                id={post.id}
                views={post.views}
                likes={post.likes}
                likesCount={post.likesCount}
              />
            ))}
        </>
      )}
      {isAdmin && posts.length === 0 && (
        <>
          <h1 className='font-semibold text-5xl tracking-tight m-10'>
            Recent Posts
          </h1>
          <h1 className='font-semibold text-4xl tracking-tight m-10 text-center'>
            You have not created any posts yet. 😔
          </h1>
        </>
      )}

      <h1 className='font-semibold text-5xl tracking-tight m-10'>
        Certificates
      </h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5 m-10'>
        {certificates.length > 0 &&
          certificates.map((certificate) => (
            <Certificate
              key={certificate.id}
              id={certificate.id}
              title={certificate.givenFor.title}
              date={certificate.givenDate}
              givenBy={certificate.givenBy}
              givenFor={certificate.givenFor}
              givenTo={certificate.givenTo}
              image={certificate.image}
              handleDelete={handleDeleteCertificate}
            />
          ))}
      </div>
      {certificates.length === 0 && (
        <h1 className='font-semibold text-4xl tracking-tight m-10 text-center'>
          You have no certificates 😔
        </h1>
      )}

      <h1 className='font-semibold text-5xl tracking-tight m-10'>
        Participations
      </h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5 m-10'>
        {participantions.length > 0 &&
          participantions.map((participantion) => (
            <ParticipationCard
              key={participantion.id}
              user={participantion.userId}
              post={participantion.postId}
              image={participantion.image}
              status={participantion.status}
              createdAt={participantion.createdAt}
              id={participantion.id}
              isAdmin={isAdmin}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteParticipation}
            />
          ))}
      </div>
      {participantions.length === 0 && (
        <h1 className='font-semibold text-4xl tracking-tight m-10 text-center'>
          You have no participations 😔
        </h1>
      )}
    </div>
  )
}

export default User
