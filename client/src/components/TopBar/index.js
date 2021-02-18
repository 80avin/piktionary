import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ReactComponent as CallConnectSVG } from './assets/call-connect.svg';
import { ReactComponent as CallDisconnectSVG } from './assets/call-disconnect.svg';
import { ReactComponent as MenuSVG } from './assets/menu.svg'
import { ReactComponent as MenuCollapseSVG } from './assets/menu-collapse.svg'
import { ReactComponent as MicOffSVG } from './assets/mic-off.svg'
import { ReactComponent as MicOnSVG } from './assets/mic-on.svg'
import { ReactComponent as MoreSVG } from './assets/more-dots.svg'
import './style.css'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'


export const TopBar = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [callConnected, setCallConnected] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [moreMenuOpened, setMoreMenuOpened] = useState(false);

  const requestFullScreen = () => {
    if (document.fullscreenElement)
      document.exitFullscreen()
    else
      document.documentElement.requestFullscreen()
  }
  const toggleMenu = () => {
    if (typeof (props.toggleDrawer) === 'function') {
      props.toggleDrawer(!menuOpened);
    }
    // TODO remove this
    requestFullScreen();
    setMenuOpened(!menuOpened);
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleMenu} edge="start">
          {
            menuOpened ?
              <MenuCollapseSVG className="menu-collapse-icon" /> :
              <MenuSVG className="menu-icon" />
          }
        </IconButton>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ width: '100%', textAlign: 'center' }}>
            <span style={{ fontSize: '1.5em', margin: '0',fontWeight:'bold' }}>
              RoomXYZ
        </span>
            <span style={{ fontSize: '0.7em' }}>(5/6)</span>
          </span>
        </div>
        <IconButton onClick={() => setCallConnected(!callConnected)}>
          {
            callConnected ?
              <CallDisconnectSVG className="call-disconnect-icon" /> :
              <CallConnectSVG className="call-connect-icon" />
          }
        </IconButton>
        <IconButton onClick={() => setMicOn(!micOn)}>
          {
            micOn ?
              <MicOffSVG className="mic-off-icon" /> :
              <MicOnSVG className="mic-on-icon" />
          }
        </IconButton>
        <IconButton onClick={()=>setMoreMenuOpened(!moreMenuOpened)}>
          <MoreSVG className="more-icon" />
          {/* <AccountCircleRoundedIcon fontSize="large" style={{ color: 'white' }} /> */}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
