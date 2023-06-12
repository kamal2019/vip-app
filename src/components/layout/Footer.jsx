import React from 'react'
import { BsFacebook, BsYoutube, BsInstagram } from 'react-icons/bs'
import logo from '../../image/logo.png'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='footer footer-center p-5 bg-neutral text-neutral-content'>
      <img src={logo} alt='logo' className='h-18 w-36' />
      <div>
        <p className='text-sm text-center'>
          Copyright © {year} - All Rights Reserved
          <a href='/'>
            <span className='font-bold'> VIP</span>
          </a>
        </p>
      </div>
      <div>
        <div className='grid grid-flow-col gap-4'>
          <a href='/'>
            <BsFacebook size='2rem' />
          </a>
          <a href='/'>
            <BsYoutube size='2rem' />
          </a>
          <a href='/'>
            <BsInstagram size='2rem' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
