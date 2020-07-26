const init = (server) => {
  const io = require('socket.io').listen(server);

  // default room : '/'
  io.on('connection', function (socket) {
    console.log(`[${socket.id}] connected to default room`)
  });


  const users = {};
  // custom room : '/anyword'
  io.of(/^\/\w+$/).on('connection', socket => {
    const room = socket.nsp.name;
    const callRoom = 'call' + room;
    console.log(`[${socket.id}] connected to ${room}`);
    // console.log(socket.nsp);
    // console.log(socket.nsp.sockets)

    socket.on('join', (data) => {
      const { error, user } = addUser({ id: socket.id, name: socket.id, room: room });
      if (error) return error

      socket.join(user.room);
      socket.to(room).broadcast.emit('message', { data: 'empty data' })
    });

    socket.on('imageRequest', () => socket.broadcast.emit('imageRequest'));

    socket.on('drawing', data => {
      // console.log('drawing',data, room);
      socket.broadcast.emit('drawing', data);
    })
    socket.on('message', data => {
      socket.broadcast.emit('drawing', data);
    });

    // Call events
    socket.on("join call room", () => {
      if (users[callRoom]) {
        const length = users[callRoom].length;
        if (length === 15) {
          socket.emit("room full");
          return;
        }
        users[callRoom].push(socket.id);
      } else {
        users[callRoom] = [socket.id];
      }
      // socketToRoom[socket.id] = callRoom;

      const usersInThisRoom = users[callRoom].filter(id => id !== socket.id);

      socket.emit("joined call", { users: usersInThisRoom });
    });
    socket.on("sending call signal", payload => {
      socket.to(payload.userToSignal).emit('user joined call', { signal: payload.signal, callerId: payload.callerId });
    });

    socket.on("returning call signal", payload => {
      socket.to(payload.callerId).emit('receiving returned call signal', { signal: payload.signal, id: socket.id });
    });
    socket.on('leaving call',()=>{
      console.log('window closing ',socket.id);
      socket.to(callRoom).broadcast.emit('leave call', { id: socket.id })
    })
    socket.on('disconnecting', () => {
      console.log(`${socket.id} is leaving`)
      if (users[callRoom])
        users[callRoom] = users[callRoom].filter(id => id !== socket.id)
      socket.to(callRoom).broadcast.emit('leave call', { id: socket.id })
    })
    socket.on('disconnect', () => {
      console.log(`${socket.id} is leaving`);
      if (users[callRoom])
        users[callRoom] = users[callRoom].filter(id => id !== socket.id);
      if(socket)socket.to(callRoom).broadcast.emit('leave call', { id: socket.id });
    });

  });
}

module.exports = init;