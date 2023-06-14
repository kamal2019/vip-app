import React from 'react'
import { useSelector } from 'react-redux'

import AboutUsTitle from '../components/AboutUsTitle/AboutUsTitle'
import aboutUsData from '../data/aboutUsData'
import steps from '../assets/images/steps.png'
import MembersContainer from '../components/MembersContainer/MembersContainer'
import outcomes from '../assets/images/outcomes.png'
import CustomersCard from '../components/CustomersCard/CustomersCard'

function About() {
  const theme = useSelector((state) => state.theme.value)
  return (
    <div className='flex flex-col items-center mt-2 overflow-hidden'>
      <p className='text-1xl lg:text-2xl mt-5 p-5 leading-loose lg:leading-10 text-justify max-w-7xl'>
        <div>
          <AboutUsTitle text='Overview' />
          <p>{aboutUsData?.overview}</p>
        </div>

        <div className='mt-5'>
          <AboutUsTitle text='The Company' />
          <p>{aboutUsData?.about}</p>
        </div>
        <div className='mt-5'>
          <AboutUsTitle text='The Big Picture' />
          <div className='border-y-4 border-indigo-500 mt-4 flex justify-between flex-wrap px-2 py-5'>
            {aboutUsData?.picture?.map((item) => (
              <div key={item.description} className='w-80 text-center'>
                <span className='text-3xl font-semibold'>{item?.title} :</span>
                <p>{item?.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-5'>
          <AboutUsTitle text='Background' />
          <p>{aboutUsData?.background}</p>
        </div>
        <div className='mt-5'>
          <AboutUsTitle text='What We Can Offer?' />
          <table className='text-white'>
            <thead className='bg-sky-600	'>
              <tr>
                <th className='text-center'>PROBLEMS</th>
                <th className='text-center'>SOLUTIONS</th>
              </tr>
            </thead>
            <tbody>
              {aboutUsData?.problemSolution?.map((item) => (
                <tr className='bg-blue-300 border-y-4 text-start'>
                  <td className='border-r-4 px-2'>{item?.problem}</td>
                  <td className='px-2'>{item?.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>{' '}
        </div>
        <div className='mt-5'>
          <AboutUsTitle
            text='Steps Figure-out'
            className='underline text-center'
          />
          <div className='mt-5'>
            <img src={steps} alt='steps.png' />
          </div>
        </div>
        <div className='mt-12'>
          <AboutUsTitle text='Goals and Targets' />
          <p>{aboutUsData?.goals}</p>
        </div>
        <div className='mt-5'>
          <AboutUsTitle text='Target Customers' />
          <div
            className={`flex flex-col sm:flex-col lg:flex-row flex-wrap ${
              theme === 'night' ? 'text-black' : ''
            }`}
          >
            {aboutUsData?.customers?.map((item) => (
              <CustomersCard data={item} />
            ))}
          </div>
        </div>
        <div className='mt-12'>
          <img src={outcomes} alt='alt.png' />
        </div>
        <div className={`mt-12 ${theme === 'night' ? 'text-black' : ''}`}>
          <MembersContainer
            title='The Leadership'
            memberDetails={aboutUsData?.leadership}
          />
          <MembersContainer
            className='mt-12'
            title='Our Mentors'
            memberDetails={aboutUsData?.mentors}
          />
          <MembersContainer
            className='mt-12'
            title='Our Management Teams'
            memberDetails={aboutUsData?.managementTeams}
          />
        </div>
        <div className='mt-5'>
          <AboutUsTitle text='For More Information' />
          <p>{aboutUsData?.moreInfo}</p>
        </div>
        <div className='mt-5'>
          <span>
            For inquiries and clarification, reach out to,
            <br />
            <a
              href='mailto:https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=talentexploriz@gmail.com'
              target='__blank'
              className='underline'
            >
              talentexploriz@gmail.com
            </a>
            Thank You!
          </span>
        </div>
      </p>
    </div>
  )
}

export default About
