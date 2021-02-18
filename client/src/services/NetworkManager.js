
import io from 'socket.io-client'

let socket = null;
const init = (roomName)=>{
  if(!socket){
    socket = io(roomName);
  }
}

const getSocket = ()=>{
  if(!socket)
    init();
  return socket;
}

export default {
  init,
  getSocket,
}