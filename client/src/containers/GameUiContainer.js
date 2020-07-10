import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CanvasContainer from './CanvasContainer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

export default class GameUiContainer extends Component {
  static propTypes = {
    socket: PropTypes.object
  }

  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton edge="start">
              <SupervisorAccountRoundedIcon
              fontSize="large"
              color="disabled"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CanvasContainer
          socket={this.props.socket}
          colors={[
            '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
            '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB',
            '#000000', '#222222', '#444444', '#666666', '#999999', '#bbbbbb', '#dddddd', '#ffffff',
          ]} />
      </div>
    )
  }
}
