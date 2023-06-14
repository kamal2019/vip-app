import React from 'react'
import PropTypes from 'prop-types'

function AboutUsTitle({ text, className }) {
  return (
    <h2
      className={`text-3xl  lg:4xl text-start font-semibold text-orange-600 mb-2 ${className}`}
    >
      {text}
    </h2>
  )
}

AboutUsTitle.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

AboutUsTitle.defaultProps = {
  className: '',
}
export default AboutUsTitle
