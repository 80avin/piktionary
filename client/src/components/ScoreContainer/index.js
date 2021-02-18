import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.css'

import UserAvatar from './avatar.svg';


const ScoreCard = props => {
  const imgUrl = props.avatar || UserAvatar;
  return (
    <div className="score-card">
      <div className="avatar">
        <img src={imgUrl} alt={props.name} />
      </div>
      <div className="rank-circle">{props.score}</div>
      <div className="rank-name">{props.name}</div>
    </div>
  )
}

ScoreCard.propTypes = {

}

const ScoreContainer = (props) => {
  const handleClick = () => {

  }
  console.log(props)
  return (
    <div className="score-container" onClick={handleClick} >
      <div>
        {
          props.members
            .sort((a, b) => b.score - a.score)
            .map((m, i) => (
              <ScoreCard name={m.name} key={m.id} score={m.score} />
            ))
        }
      </div>
    </div>
  )
}

ScoreContainer.propTypes = {
  // prop: PropTypes
  members: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  console.log({ ...state });
  return {
    members: state.members,
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreContainer)
