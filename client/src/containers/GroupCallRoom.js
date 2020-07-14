import Peer from 'simple-peer';
import wrtc from 'wrtc'

class GroupCallRoom {
  constructor(room, socket) {
    this.room = room;
    this.socket = socket;
    this.peers = {};
    this.callbacks = {
      onLocalMediaCallback: null,
      onRemoteStream: null,
      onPeerLeave: null,
    }
    this.localStream = null;
  }
  init() {
    this.socket.on('joined call', data => {
      console.log('joined call', data)
      data.users.forEach(uid => {
        const peer = this.createPeer(uid, this.socket.id);
        this.peers[uid] = ({
          peerId: uid,
          peer,
          remoteStream: null,
        })
      })
    });
    this.socket.on('user joined call', payload => {
      console.log('user joined call', payload)
      const item = this.peers[payload.callerId];
      if (!item) {
        const peer = this.addPeer(payload.signal, payload.callerId);
        this.peers[payload.callerId] = ({ peerId: payload.callerId, peer, remoteStream:null });
      }
      else{
        item.peer.signal(payload.signal)
        console.log(payload)
      }
    });
    this.socket.on('receiving returned call signal', payload => {
      console.log('receiving returned call signal', payload)
      const item = this.peers[payload.id];
      item.peer.signal(payload.signal);
    });
    this.socket.on('leave call', payload => {
      console.log('leave call', payload)
      this.leavePeer(payload.id)
    })
    this.socket.emit('join call room');
  }

  startStream(stream) {
    this.localStream = stream;
    for (let pid in this.peers) {
      // debugger
      this.peers[pid].peer.send('hi hi');
      console.log('adding stream', this.peers[pid])
      this.peers[pid].peer.addStream(stream)
    };
  }
  createPeer(userToSignal, callerId) {
    const peer = new Peer({
      initiator: true,
      // trickle: false,
      wrtc
    });
    peer.on('signal', signal => this.socket.emit('sending call signal', {
      userToSignal, callerId, signal
    }));
    peer.on('stream', (s) => { this.onRemoteStream(userToSignal, s) })
    peer.on('data',(...d)=>console.log(...d))
    return peer;
  }
  addPeer(incomingSignal, callerId) {
    // if(this.peers[callerId]) delete this.peers[callerId]
    const peer = new Peer({
      initiator: false,
      // trickle: false,
      wrtc
    });
    peer.on('signal', signal => {
      this.socket.emit('returning call signal', {
        signal, callerId
      })
    });
    peer.signal(incomingSignal);
    peer.on('stream', (s) => { this.onRemoteStream(callerId, s) })
    peer.on('data',(...d)=>console.log(...d))
    // peer.on('stream',(...a)=>{if(typeof(this.callbacks.onRemoteStream)==='function') this.callbacks.onRemoteStream(...a)})
    return peer;
  }
  leavePeer(pid) {
    console.log(`${pid} has left the call`)
    if (this.peers[pid].remoteStream) this.peers[pid].remoteStream.getTracks().forEach(t => t.stop());
    if (typeof (this.callbacks.onRemoteStream) === 'function')
      this.callbacks.onPeerLeave(pid, this.peers[pid]);
    delete this.peers[pid];
  }
  onRemoteStream(pid, s) {
    console.log('remoteStream', pid, s)
    if (this.peers[pid].remoteStream) this.peers[pid].remoteStream.getTracks().forEach(t => t.stop());
    this.peers[pid].remoteStream = s;
    if (typeof (this.callbacks.onRemoteStream) === 'function')
      this.callbacks.onRemoteStream(pid, s);
  }

}
export default GroupCallRoom