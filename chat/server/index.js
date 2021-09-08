const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParse = require('cookie-parser');
const corsOption = {
  origin:'http://localhost:3000/',
  credential:true,
  optionSucessStatus:200
}
app.use(cors(corsOption));
app.use(express.json());
app.use(authRoutes);
app.use(cookieParse());

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
const Message = require('./models/Message.js');

app.get('/set-cookie', (req, res)=> {
  res.cookie('username', 'Fer');
  //res.cookie('isAuthenticated', true, {httpOnly:true});
  //res.cookie('isAuthenticated', true, {secure:true});
  res.cookie('isAuthenticated', true, {maxAge:24 * 60 * 60}); // deleted automatically
  res.send('cookie are set');
});

app.get('/get-cookie', (req, res)=> {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

io.on('connection', (socket) => {
  console.log(socket.id);
  Room.find().then(result => {
    console.log('output-rooms', result);
    socket.emit('output-rooms', result);
  });
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
    const msg = new Message(msgToStore)
    msg.save().then(result =>{
      io.to(room_id).emit('message', result);
      callback();
    })
  });
  socket.on('remove', ()=>{
    const user = removeUser(socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});