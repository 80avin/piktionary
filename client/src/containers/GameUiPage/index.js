import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CanvasContainer from '../CanvasContainer'
import CallContainer from '../CallContainer'
import TopBar from '../../components/TopBar'
import { CommentsBox } from '../../components/CommentsBox'

import './style.css'
import ScoreSheet from '../ScoreSheet'
import StatusBox from '../../components/StatusBox'
import MessagesBox from '../../components/MessagesBox'
import AdContainer from '../../components/AdContainer'
import ScoreContainer from '../../components/ScoreContainer'

export default class GameUiContainer extends Component {
  static propTypes = {
    socket: PropTypes.object
  }
  constructor(props) {
    super(props);
    console.log(props)
  }

  toggleDrawer() {

  }
  render() {
    return (
      <>
        {/* TODO make responsive drawer */}
        <div className="gamePage">
        <TopBar toggleDrawer={(...a) => this.toggleDrawer(...a)} />
          <StatusBox />
          <CanvasContainer
            socket={this.props.socket}
          />
          {/* <CommentsBox /> */}
          <ScoreContainer />
          <MessagesBox />
          <AdContainer />
          {/* <CallContainer socket={this.props.socket} /> */}
          {/* <ScoreSheet /> */}
        </div>
      </>
    )
  }
}
