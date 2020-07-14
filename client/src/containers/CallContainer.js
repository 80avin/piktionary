import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GroupCallRoom from './GroupCallRoom';
// import AudioContainer from './AudioContainer';

export default class CallContainer extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.getUserMedia = navigator.mediaDevices.getUserMedia({
      audio: true, video: false,
    }).catch(e => alert('getUserMedia() error ', e.name))
    this.state = {audios:{}};
    this.socket = props.socket;
    this.groupCallRoom = new GroupCallRoom('', this.socket);
    this.groupCallRoom.callbacks.onRemoteStream = (...a) => console.log('remote stream', ...a)
    this.groupCallRoom.init();
    console.log({ groupCallRoom: this.groupCallRoom });
  }
  sendVoice() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(s => {
      this.groupCallRoom.startStream(s)
    }
    );
  }
  muteMe(){

  }
  muteOthers(){

  }
  render() {
    return (
      <div>
        {/* <AudioContainer socket={this.socket} media={m=>this.media=m} getUserMedia={this.getUserMedia}/> */}
        <input type='button' onClick={e => this.sendVoice(e)} value='send voice'></input>
        <input type='button' onClick={e => this.sendVoice(e)} value='mute voice'></input>
      </div>
    )
  }
}
