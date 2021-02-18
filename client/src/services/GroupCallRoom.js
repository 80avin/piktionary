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
    this.localStream = undefined;
    window.onbeforeunload=(e=>{
      // socket.emit('leaving call');
      for(let p of this.peers) p.peer.destroy();
    })
  }
  init() {
    this.socket.on('joined call', data => {
      // when I join the callroom, I've to call other peers
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
      // when someone joins the callroom, accept his call signal
      const item = this.peers[payload.callerId];
      console.log('user joined call', payload, item)
      if (!item) {
        const peer = this.addPeer(payload.signal, payload.callerId);
        this.peers[payload.callerId] = ({ peerId: payload.callerId, peer, remoteStream: null });
      }
      else {
        console.log({...item.peer})
        // item.peer.on('connect',()=>item.peer.signal(payload.signal))
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
  endStream() {
    if (this.localStream) {
      for (let pid in this.peers) {
        // debugger
        // this.peers[pid].peer.send('stopping stream');
        console.log('stopping stream', this.peers[pid])
        this.peers[pid].peer.removeStream(this.localStream);
      };
    }
    this.localStream = undefined;
  }
  startStream(stream) {
    console.log('starting stream')
    this.endStream();
    this.localStream = stream;
    for (let pid in this.peers) {
      // debugger
      // this.peers[pid].peer.send('sending stream');
      console.log('adding stream', this.peers[pid]);
      this.peers[pid].peer.addStream(this.localStream);
    };
  }
  createPeer(remoteId, myId) {  // callerId is my id
    const peer = new Peer({
      initiator: true,
      wrtc,
      trickle: false,
    });
    peer.on('signal', signal => this.socket.emit('sending call signal', {
      userToSignal: remoteId, callerId: myId, signal
    }));
    return this.configPeerListeners(peer, remoteId);
  }
  addPeer(incomingSignal, remoteId) {
    const peer = new Peer({
      initiator: false,
      wrtc,
      trickle: false,
    });
    peer.on('signal', signal => {console.log('sig1');this.socket.emit('returning call signal', {
      signal, callerId: remoteId
    });console.log('sig2')});
    console.log('adding peer');
    peer.signal(incomingSignal);
    peer.on('error',(e)=>console.error('error peer ',{...e}, e.code));
    return this.configPeerListeners(peer, remoteId);
  }
  configPeerListeners(peer, remoteId) {
    console.log('cpl');
    peer.on('stream', (s) => { console.log('sig3');this.onRemoteStream(remoteId, s);console.log('sig4'); })
    peer.on('data', (...d) => console.log('peer',...d));
    peer.on('close', () => {
      console.log('sig5');
      this.leavePeer(remoteId);
      console.log('sig6');
    });
    peer.on('connect',()=>peer.send('hi'))
    if (this.localStream) peer.addStream(this.localStream);
    return peer;
  }
  leavePeer(pid) {
    if (!this.peers[pid]) return;
    if (this.peers[pid].peer.destroyed) {
      delete this.peers[pid];
      return;
    }
    console.log(`${pid} has left the call`)
    if (this.peers[pid].remoteStream) this.peers[pid].remoteStream.getTracks().forEach(t => t.stop());
    if (typeof (this.callbacks.onPeerLeave) === 'function')
      this.callbacks.onPeerLeave(pid, this.peers[pid]);
    this.peers[pid].peer.destroy();
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