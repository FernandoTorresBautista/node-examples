import React, { useState } from 'react'

const Signup = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [nameError,setNameError] = useState('')
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const submitHandler = e => {
    e.preventDefault();
    console.log(name, email, password);
  }
  return (
    <div className="row">
      <form className="col s12" onSubmit={submitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input  id="name" type="text" 
                    className="validate"
                    value={name}
                    onChange={e=>setName(e.target.value)} />
            <div className="name error red-text">
            </div>
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input  id="email" type="email" 
                    className="validate"
                    value={email}
                    onChange={e=>setEmail(e.target.value)} />
            <div className="Email error red-text">
            </div>
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input  id="password" type="password" 
                    className="validate"
                    value={password}
                    onChange={e=>setPassword(e.target.value)} />
            <div className="password error red-text">
            </div>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <button className="btn">Signup</button>
      </form>
    </div>
  )
}

export default Signup
