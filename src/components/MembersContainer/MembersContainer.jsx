import React from 'react'
import PropTypes from 'prop-types'

function MembersContainer({ title, memberDetails, className }) {
  return (
    <div className={className}>
      <div className='text-center bg-orange-200 py-4 font-bold text-3xl'>
        {title}
      </div>
      <div className='flex flex-col flex-wrap sm:flex-col lg:flex-row'>
        {memberDetails?.map((member) => (
          <div
            className='bg-orange-200 border-2 border-white w-full lg:w-1/3 px-3'
            key={member.name}
          >
            <p className='font-semibold py-2 text-center text-2xl'>
              {member?.name}
            </p>
            <div
              style={{
                height: '400px',
              }}
            >
              <img
                src={member?.image}
                alt='alt.png'
                className='w-full h-full object-cover'
              />
            </div>

            <ul className='px-2 text-start pb-2'>
              {member.description?.map((item) => (
                <li key={item} className='mt-1'>
                  - {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

MembersContainer.propTypes = {
  title: PropTypes.string.isRequired,
  memberDetails: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  className: PropTypes.string.isRequired,
}

export default MembersContainer
