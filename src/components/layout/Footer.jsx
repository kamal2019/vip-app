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
              <span>Chandragiri-05, Kathmandu</span>
            </div>
            <div>
              <FaPhoneSquareAlt />
              <span>+977-9761638701, 9822791232</span>
            </div>
            <div>
              <GrMail /> <span>talentexploriz@gmail.com</span>
            </div>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <h2> Social Media Links</h2>
          <div className={styles.links}>
            <a
              href='https://www.facebook.com/profile.php?id=100089986626264'
              target='_blank'
              rel='noreferrer'
            >
              <BsFacebook size='2rem' />
            </a>
            <a
              href='https://www.youtube.com/channel/UCXgMWaQ2iqCjN6I_WtI5YFA'
              target='_blank'
              rel='noreferrer'
            >
              <BsYoutube size='2rem' />
            </a>
            <a
              href='https://www.instagram.com/talentexploriz4/?fbclid=IwAR2jY6C735GkESl25LSgkBr_uxAhv7snoXGTHP87DgpnKbntSpzSHGLfNY8'
              target='_blank'
              rel='noreferrer'
            >
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
