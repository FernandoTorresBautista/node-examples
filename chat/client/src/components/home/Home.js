import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;
const Home = () => {
  const ENDPT = 'http://localhost:5000';
  const {user,setUser} = useContext(UserContext)
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    socket = io(ENDPT);
    return () => {
      // para enviarlo al back end no permite el disconnect es reservado
      // socket.emit('disconnect'); 
      socket.emit('remove'); 
      // socket.disconnect(); 
      socket.off();
    }
  }, [ENDPT])
  useEffect(() => {
    socket.on('output-rooms', rooms=>{
      setRooms(rooms)
    })
  }, [])
  useEffect(() => {
    socket.on('room-created', room=>{
      setRooms([...rooms, room])
    })
  }, [rooms])
  useEffect(() => {
    console.log("rooms: ", rooms);
  }, [rooms])

  const handleSubmit = e=>{
    e.preventDefault();
    socket.emit('create-room', room);
    console.log(room);
    setRoom('');
  }

  const setAsJhon = ()=>{
    const jhon = {
      name:'Jhon',
      email:'jhon@email.com',
      password: '123',
      _id:'123'
    }
    setUser(jhon);
  }
  const setAsTom = ()=>{
    const tom = {
      name:'Tom',
      email:'tom@email.com',
      password: '456',
      _id:'456'
    }
    setUser(tom);
  }
  if(!user){ // check is the user is setting 
    return <Redirect to='/login' />
  }
  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Welcome {user?user.name:''}</span>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input 
                      placeholder="Enter the room name"
                      id="room" type="text" className="validate" 
                      value={room}
                      onChange={e => setRoom(e.target.value)}
                      />
                    <label htmlFor="room">Room</label>
                  </div>
                </div>
                <button className="btn">Create Room</button>
              </form>
            </div>
            <div className="card-action">
              <a href="#" onClick={setAsJhon}>set as Jhon</a>
              <a href="#" onClick={setAsTom}>set as Tom</a>
            </div>
          </div>
        </div>
        <div className="col s6 m5 offset-1">
          <RoomList rooms={rooms} />
        </div>
      </div>

    </div>
  )
}

export default Home
