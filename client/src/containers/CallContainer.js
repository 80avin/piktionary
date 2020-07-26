import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GroupCallRoom from '../services/GroupCallRoom';
// import AudioContainer from './AudioContainer';

export default class CallContainer extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { audios: {}, muted: true };
    this.socket = props.socket;
    this.groupCallRoom = new GroupCallRoom('', this.socket);
    this.groupCallRoom.callbacks.onRemoteStream = (...a) => this.addStream(...a)
    this.groupCallRoom.init();
    console.log({ groupCallRoom: this.groupCallRoom });
  }
  sendVoice() {
    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    }).then(s => {
      this.groupCallRoom.startStream(s)
    }
    );
  }
  addStream(pid, stream) {
    this.setState(state => ({ audios: { ...state.audios, [pid]: stream } }));
    console.log('adding stream in call', this.state.audios)
  }
  toggleMyMute() {
    if (!this.groupCallRoom.localStream) return;
    this.groupCallRoom.localStream.getTracks().forEach(t => t.enabled = this.state.muted);
    this.setState(state => ({ muted: !state.muted }))
  }
  muteOthers() {

  }
  addAudioStreamObj(pid, ref) {
    // ref.srcObj = 
    if (this.state.audios[pid] && ref) ref.srcObject = this.state.audios[pid]
  }
  render() {
    return (
      <div>
        {/* <AudioContainer socket={this.socket} media={m=>this.media=m} getUserMedia={this.getUserMedia}/> */}
        <input type='button' onClick={e => this.sendVoice(e)} value='send voice'></input>
        <input type='button' onClick={e => this.toggleMyMute(e)} value={this.state.muted ? 'unmute' : 'mute'} disabled={!this.groupCallRoom.localStream}></input>
        {Object.keys(this.state.audios).map(k => {
          return <audio autoPlay ref={r => this.addAudioStreamObj(k, r)} key={k} />
        })}
      </div>
    )
  }
}
