var PORT = process.env.PORT || 8080;

const express = require('express');
const path = require('path');
const { addUser } = require('./src/users');
const app = express()

//app.use(express.bodyParser());
app.use(require('./src/routes'));

const server = app.listen(PORT, null, function () {
  console.log("Listening on port " + PORT);
});


var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
  console.log(`[${socket.id}] connected to default room`)
});

// custom room : '/anyword'
io.of(/^\/\w+$/).on('connection', socket => {
  const room = socket.nsp.name;
  console.log(`[${socket.id}] connected to ${room}`);
  
  socket.on('join', (data)=>{
    const {error, user}=addUser({id:socket.id, name:socket.id,room:room});
    if(error) return error
    
    socket.join(user.room);

    socket.to(room).broadcast.emit('message',{data:'empty data'})
  });

  socket.on('drawing',data=>socket.nsp.broadcast.emit('drawing',data));

});

// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname, 'client','build','index.html'))
// })