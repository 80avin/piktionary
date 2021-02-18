import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.css'

const StatusBox = () => {
  return (
    <div className="statusbox">
      <span style={{}}></span>
      <span>Avinash is drawing _ _ _ _ _</span>
      <span className="timer">40s left</span>
    </div>
  )
}

StatusBox.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBox)
