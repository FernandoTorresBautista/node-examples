import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { Link, useParams } from 'react-router-dom';

import io from 'socket.io-client';
let socket;

const Chat = () => {
  const ENDPT = 'http://localhost:5000';
  
  const {user,setUser} = useContext(UserContext)
  let {room_id, room_name} = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io(ENDPT);
    socket.emit('join', {name:user.name, room_id, user_id:user.id})
  }, [])
  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages,message])
    })
  }, [messages])
  const sendMessage = event => {
    event.preventDefault();
    if (message){
      console.log("send message: ", message);
      socket.emit('sendMessage', message, room_id, ()=>setMessage(''))
    }
  }
  return (
    <div>
      <div>{room_id} {room_name}</div>
      <h1>Chat {JSON.stringify(user)}</h1>
      <pre>
        {JSON.stringify(messages, null, '\t')}
      </pre>
      <form action="" onSubmit={sendMessage}>
        <input type="text"
          value={message}
          onChange={event=>setMessage(event.target.value)}
          onKeyPress={event=> event.key==='Enter'?sendMessage(event):null}
        />
        <button >Send Message</button>
      </form>  
    </div>
  )
}

export default Chat
