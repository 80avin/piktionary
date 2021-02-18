import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Redirect to="/room/this is a room" />
        <Link to="/room/this is a room">This is room</Link>
      </div>
    )
  }
}
