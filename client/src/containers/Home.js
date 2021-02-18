import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Link to="/room/this is a room">This is room</Link>
        <Link to="/room">Frontend</Link>
      </div>
    )
  }
}