const init = (server) => {
  const io = require('socket.io').listen(server);

  // default room : '/'
  io.on('connection', function (socket) {
    console.log(`[${socket.id}] connected to default room`)
  });

  // custom room : '/anyword'
  io.of(/^\/\w+$/).on('connection', socket => {
    const room = socket.nsp.name;
    console.log(`[${socket.id}] connected to ${room}`);

    socket.on('join', (data) => {
      const { error, user } = addUser({ id: socket.id, name: socket.id, room: room });
      if (error) return error

      socket.join(user.room);
      socket.to(room).broadcast.emit('message', { data: 'empty data' })
    });

    socket.on('drawing', data => socket.nsp.broadcast.emit('drawing', data));
    socket.on('message', data => socket.nsp.broadcast.emit('drawing', data));
  });
}

module.exports = init;