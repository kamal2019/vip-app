/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import axios from 'axios'
import Avatar from 'react-avatar'

import { FiLogIn } from 'react-icons/fi'
import { AiOutlineMenu } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ThemeToggle from './ThemeToggle'
import Bell from './Bell'
import logo from '../../../image/logo.png'

function Navbar() {
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
  const [isAdmin] = React.useState(user && user.role === 'admin')
  const [isLoggedIn] = React.useState(
    user && localStorage.getItem('tokens') !== null
  )
  const [token] = React.useState(
    isLoggedIn && JSON.parse(localStorage.getItem('tokens')).access.token
  )
  const [refreshToken] = React.useState(
    isLoggedIn && JSON.parse(localStorage.getItem('tokens')).refresh.token
  )
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  React.useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/me`)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }, [isLoggedIn, user])

  const logout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        refreshToken,
      })
      .then(() => {
        toast.success('Logout Successful')
        localStorage.removeItem('tokens')
        localStorage.removeItem('user')
        window.location.href = '/login'
      })
      .catch(() => {
        localStorage.removeItem('tokens')
        localStorage.removeItem('user')
      })
  }

  return (
    <div className='navbar bg-neutral text-neutral-active shadow-xl z-10 sticky top-0 backdrop-filter backdrop-blur-xl bg-opacity-30'>
      {/* Navbar for small screen */}
      <div className='navbar-start lg:hidden'>
        <div className='dropdown'>
          <label tabIndex='0' className='btn btn-ghost'>
            <AiOutlineMenu size='32px' />
          </label>
          <ul className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-auto'>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/posts'>Posts</a>
            </li>
            {isAdmin && (
              <li>
                <a href='/users'>Users</a>
              </li>
            )}
            {isAdmin && (
              <li>
                <a href='/certificates'>Certificates</a>
              </li>
            )}
            {isAdmin && (
              <li>
                <a href='/participants'>Participants</a>
              </li>
            )}
            <li>
              <a href='/about'>About</a>
            </li>

            {isLoggedIn ? (
              <li>
                <a href='/profile'>Profile</a>
              </li>
            ) : (
              <li>
                <button
                  className='btn btn-outline'
                  onClick={logout}
                  type='button'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Brand Logo */}
      <div className='lg:navbar-start navbar-center text-accent-focus'>
        <a
          className='normal-case text-2xl font-extrabold tracking-widest'
          href='/'
        >
          <div style={{ width: '70px' }}>
            <img src={logo} alt='logo' className='w-full' />
          </div>
          {/* <img src={logo} alt='logo' className='h-18 w-36' /> */}
        </a>
      </div>

      {/* Navbar for large screen */}
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal p-2 font-semibold text-lg'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/posts'>Posts</a>
          </li>
          {isAdmin && (
            <li>
              <a href='/users'>Users</a>
            </li>
          )}
          {isAdmin && (
            <li>
              <a href='/certificates'>Certificates</a>
            </li>
          )}
          {isAdmin && (
            <li>
              <a href='/participants'>Participants</a>
            </li>
          )}
          <li>
            <a href='/about'>About</a>
          </li>
        </ul>
      </div>
      {/* Theme Toggle Bell Icon */}
      <div className='navbar navbar-end'>
        <ThemeToggle />
        {isLoggedIn && <Bell />}
      </div>

      {/* Login Btn */}
      <div className='navbar-end hidden md:flex'>
        {!isLoggedIn ? (
          <button
            className='btn btn-primary gap-2'
            onClick={() => {
              window.location.href = '/login'
            }}
            type='button'
          >
            <FiLogIn size='25px' /> Login
          </button>
        ) : (
          <div className='dropdown dropdown-end'>
            <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
              <div className='w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                {user && user.profilePic !== '' && (
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/${user.profilePic}`}
                    alt='avatar'
                  />
                )}
                {user && user.profilePic === '' && (
                  <Avatar
                    name={user.name}
                    size={48}
                    textSizeRatio={1.8}
                    maxInitials={1}
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex='0'
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a className='justify-between' href='/profile'>
                  Profile
                </a>
              </li>
              <li>
                <a href='/my-participations'>Participations</a>
              </li>
              <li>
                <a href='/my-certificates'>Certificates</a>
              </li>
              <li>
                <a href='/settings'>Settings</a>
              </li>
              <li>
                <button
                  className='link link-hover'
                  onClick={logout}
                  type='button'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
