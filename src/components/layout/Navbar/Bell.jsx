import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { FaBell } from 'react-icons/fa'
import NotificationItem from './NotificationItem'

function Bell() {
  const [notifications, setNotifications] = useState([])
  const [showBadge, setShowBadge] = useState(notifications.length > 0)

  useEffect(() => {
    setShowBadge(notifications.length > 0)
  }, [notifications])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/notifications`).then((res) => {
      setNotifications(res.data)
    })
  }, [])

  const removeNotification = (id) => {
    const newNotifications = notifications.filter(
      (notification) => notification.id !== id
    )
    setNotifications(newNotifications)
  }

  return (
    <div className='dropdown dropdown-end'>
      <button className='btn btn-ghost btn-circle' type='button'>
        <div className='indicator'>
          <FaBell size='25px' />
          {showBadge && (
            <span className='badge badge-xs badge-error indicator-item' />
          )}
        </div>
      </button>

      <ul
        tabIndex='-1'
        className='menu dropdown-content bg-base-100 p-2 mt-4 shadow rounded-box overflow-y-auto max-h-96'
      >
        {notifications &&
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              title={notification.post.title}
              author={notification.author.name}
              postId={notification.post.id}
              image={notification.post.image}
              onRemove={() => removeNotification(notification.id)}
            />
          ))}

        {notifications.length === 0 && (
          <li className=' w-96 h-24 mt-2 bg-base-100 shadow-xl flex flex-row justify-around '>
            <span className='text-xl font-bold'> No notifications yet.</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Bell
