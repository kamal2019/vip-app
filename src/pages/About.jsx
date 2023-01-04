import React from 'react'

import logo from '../image/logo.png'

function About() {
  return (
    <div className='flex flex-col items-center m-5'>
      <img className='w-2/12' src={logo} alt='logo' />
      <h1 className='text-6xl font-bold m-5'>About</h1>
      <p className='text-2xl p-5 text-justify leading-loose max-w-7xl'>
        Talent Exploriz
        <span className=' font-mono'>(show your ability to the world)</span> is
        one of the best platforms for challengers in extra-curricular
        activities. We always think about doing some productive tasks that can
        open up our brains to several areas of experience. Here, we welcome you
        to our biggest platform TALENT EXPLORIZ which allows you to participate
        in your favourite curricular activities in a weekly basis that helps you
        to connect with people of different attitudes and knowledge and want to
        spend some time for learning and bringing some positive attitude. Talent
        Exploriz aims to provide a wonderful platform to you to explore yourself
        in this competitive environment. Focusing on youths interested in
        Co-curricular activities like physical and mental events to show there
        inner talents Infront of world. We assure you that we will definitely
        let the world know about you and your talent which is hidden or
        underrated.
        <br /> Here, you can earn experience and money from your interesting
        extra curricular activities like futsal tournament, basketball
        tournament, chess tournament, and other indoor or outdoor activities. so
        that you can can get cash prize up to Rs. 5000, certificate of
        participation, and you will able to Show your talent and skills to the
        world, gaining valuable experiences and a lot of opportunities and
        entertainment at the same time.
      </p>
    </div>
  )
}

export default About
