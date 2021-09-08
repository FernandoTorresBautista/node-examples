const app = require('express')();
const http = require('http').createServer(app);
const socketio = require("socket.io");
const mongoose = require('mongoose');
const io = socketio(http);

const {addUser, removeUser, getUser} = require('./helper.js');

const dotenv = require('dotenv');
dotenv.config();

const mongoDB = process.env.DB_MONGO;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoDB)
  .then(()=>console.log("connected"))
  .catch(error => console.log(error))

const Room = require('./models/Room.js');

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('create-room', name=>{
    console.log('Then room name received is: ', name);
    const room = new Room({name});
    room.save().then(result => {
      io.emit('room-created', result);
    });
  });
  socket.on('join', ({name, room_id, user_id}) =>{
    const {error, user} = addUser({
      socket_id:socket.id,
      name,
      room_id,
      user_id
    });
    if (error) {
      console.log('join error', error);
    } else {
      console.log('join user', user);
    }
  });
  socket.on('sendMessage', (message, room_id, callback)=>{
    const user = getUser(socket.id);
    const msgToStore = {
      name:user.name,
      user_id:user.user_id,
      room_id,
      text:message
    }
    console.log('message: ', msgToStore);
    io.to(room_id).emit('message', msgToStore);
    callback();
  });
  socket.on('remove', ()=>{
    const user = removeUser(socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});