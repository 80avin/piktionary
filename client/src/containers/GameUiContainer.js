import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CanvasContainer from './CanvasContainer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import { Paper, Container } from '@material-ui/core'
import CallContainer from './CallContainer'

export default class GameUiContainer extends Component {
  static propTypes = {
    socket: PropTypes.object
  }
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        {/* TODO make responsive drawer */}
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start">
              {/*use AvatarGroup */}
              <SupervisorAccountRoundedIcon
                fontSize="large"
                style={{ color: 'white' }}
              />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Container>
          <Paper elevation={3} variant="outlined" style={{ color: 'green', overflowY: 'scroll', width: '100%', height: '50px' }}>
            <p>
              Falaana : guessed the word
            </p><p>
              Falaana-2 : liked
            </p>
          </Paper>
          <CanvasContainer
            socket={this.props.socket}
          />
          <CallContainer socket={this.props.socket}/>
          <input type="text"/>
        </Container>
      </div>
    )
  }
}
