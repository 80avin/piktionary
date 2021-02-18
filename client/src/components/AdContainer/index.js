import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.css';

const AdContainer = () => {
  return (
    <div className="ad-container">
      <h4>AdSense</h4>
    </div>
  )
}

AdContainer.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AdContainer)
