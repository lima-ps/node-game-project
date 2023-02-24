import React, {useState} from 'react'

function login() {

    //const [username, setUsername] = useState;
    //const [password, setPassword] = useState;

    const login = () => {

    }

  return (
    <div className='login'>
        <label for="">Login</label>
        <input placeholder='Username' onChange={(event) => {
            //setUsername(event.target.value)  
        }}/>
        <input placeholder='Password' onChange={(event) => {
            //setPassword(event.target.value)  
        }}/>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default login