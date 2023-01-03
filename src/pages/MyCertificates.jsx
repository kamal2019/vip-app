/* eslint-disable no-alert */
import React from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Certificate from '../components/layout/Profile/Certificate'

function MyCertificates() {
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(user && user.role === 'admin')
  const [certificates, setCertificates] = React.useState([])
  const [token] = React.useState(
    user && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/certificates/user/${user.id}`)
      .then((res) => {
        setCertificates(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }, [isAdmin, user])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/certificates/${id}`)
        .then(() => {
          setCertificates(
            certificates.filter((certificate) => certificate.id !== id)
          )
          toast.success('Certificate deleted successfully')
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-6xl font-semibold m-10'>Your Certificates</h1>
      </div>

      <div className='grid grid-cols-4 gap-5 m-5'>
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
              handleDelete={handleDelete}
            />
          ))}
      </div>
      {certificates.length === 0 && (
        <h1 className='font-semibold text-4xl tracking-tight m-10 text-center'>
          You do not have certificates yet. 😔
        </h1>
      )}
    </>
  )
}

export default MyCertificates
