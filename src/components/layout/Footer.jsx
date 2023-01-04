import React from 'react'
import { BsFacebook, BsYoutube, BsInstagram } from 'react-icons/bs'
import { FaMapMarkerAlt, FaPhoneSquareAlt } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'

import logo from '../../image/logo.png'
import styles from './footer.module.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='p-5 bg-neutral text-neutral-content'>
      <div className={styles.footer}>
        <div className={styles.imgDiv}>
          <img src={logo} alt='logo.png' className='w-100' />
        </div>
        <div className={styles.contact}>
          <h2>Contact Us</h2>
          <div className={styles.contactDetails}>
            <div>
              <FaMapMarkerAlt />
              <span>Baneshwor, Kathmandu</span>
            </div>
            <div>
              <FaPhoneSquareAlt />
              <span>+977-9864646525</span>
            </div>
            <div>
              <GrMail /> <span>talentexploriz@gmail.com</span>
            </div>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <h2> Social Media Links</h2>
          <div className={styles.links}>
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
      </div>
      <div className={styles.divider} />
      <div>
        <p className='text-sm text-center'>
          Copyright © {year} - All Rights Reserved
          <a href='/'>
            <span className='font-bold'> VIP</span>
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
