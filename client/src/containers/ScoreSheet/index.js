import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.css'

export class index extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <div className="scoresheet">
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
