/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState}from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie';

function login({setAuth}) {

  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {username, password})
      .then(res => {
          const {firstName, lastName, username, token, userId} = res.data //"res" get all the "user" data received from the backend 
          
          //seting coockies to later connect with the stream API
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          cookies.set("userName", username);
          setAuth(true)
      });
  };

  return (
    <div className='login'>
        <label htmlFor="">Login</label>
        <input placeholder='Username' onChange={(event) => {
            setUsername(event.target.value)  
        }}/>
        <input placeholder='Password' onChange={(event) => {
            setPassword(event.target.value)  
        }}/>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default login