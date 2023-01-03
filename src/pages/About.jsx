import React from 'react'

import logo from '../image/logo.png'

function About() {
  return (
    <div className='flex flex-col items-center m-5'>
      <img className='w-6/12' src={logo} alt='logo' />
      <h1 className='text-6xl font-bold m-5'>About</h1>
      <p className='text-2xl p-5 text-justify leading-loose max-w-7xl'>
        OwnMarks
        <span className=' font-mono'>(show your ability to the world)</span> is
        one of the best platforms for challengers in extra-curricular
        activities. Being too busy in our professional life today, we do not
        actually get too many opportunities and time to indulge in our hobbies
        (to play, learn music, and do as our interests) that may very beneficial
        to us. What happens when we give ourselves the opportunity to take part
        in extra-curricular activities is that we open up the brain to several
        experiences. when we get into sports, it’s not just that we are learning
        rules and regulations and how to move a racket or how to work in a team,
        we also learned the basic life lesson of knowing how to plan our
        movements, in relation to a particular challenge and how to overcome
        that challenge by gaining different skills. And let us know that, while
        acquiring skills people need different experiences to be able to do
        that, many of these experiences come from a regular practice. Trust us,
        we had these opportunities to bring it in a very natural way that
        becomes fruitful to every population. That’s what OwnMarks is.
      </p>
    </div>
  )
}

export default About
