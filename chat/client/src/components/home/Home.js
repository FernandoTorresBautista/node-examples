import React, {useContext} from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import RoomList from './RoomList';

const Home = () => {
  const {user,setUser} = useContext(UserContext)

  const rooms =[
    {
      name: 'room1',
      _id:'123'
    },
    {
      name: 'room2',
      _id:'456'
    }
  ]
  const setAsJhon = ()=>{
    const jhon = {
      name:'Jhon',
      email:'Jhon@email.com',
      password: '123',
      id:'123'
    }
    setUser(jhon);
  }
  const setAsTom = ()=>{
    const tom = {
      name:'Tom',
      email:'Tom@email.com',
      password: '456',
      id:'456'
    }
    setUser(tom);
  }
  return (
    <div>
      {/* <h1>Home {JSON.stringify(user)}</h1> */}
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Welcome {user?user.name:''}</span>
              <form >
                <div className="row">
                  <div className="input-field col s12">
                    <input 
                      placeholder="Enter the room name"
                      id="room" type="text" className="validate" />
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
      <Link to={'/chat'}>
        <button>go to chat</button>
      </Link>
    </div>
  )
}

export default Home
