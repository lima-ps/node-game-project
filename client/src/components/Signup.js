import React, {useState} from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

function Signup({setAuth}) {

    const cookies = new Cookies(); //instanciate the cookie class to set or get cookies in the browser

    //obtect called user, initialize as null
    const [user, setUser] = useState(null)

    //function to the button signup
    const signUp = () =>{
        //get the post methodo end the "signup" end point indicated in the backend route
        Axios.post("http://localhost:3001/signup", user)
        .then(res =>{
            const {token, userId, firstName, lastName, username, hashedPassword} = res.data //"res" get all the "user" data received from the backend 
            
            //seting coockies to later connect with the stream API
            cookies.set("token", token)
            cookies.set("userId", userId)
            cookies.set("firstName", firstName)
            cookies.set("lastName", lastName)
            cookies.set("username", username)
            cookies.set("hashedPassword", hashedPassword)
            setAuth(true)
          
        } 
        )
    }

  return (
    <div className='signUp'>
        <label htmlFor="">Sign Up</label>
        <input placeholder='First Name' onChange={(event) => {
            setUser({...user, firstName: event.target.value})  //""...user" -> keep the object the same, but change an espcific attribute
        }}/>
        <input placeholder='Last Name' onChange={(event) => {
            setUser({...user, lastName: event.target.value})  
        }}/>
        <input placeholder='Username' onChange={(event) => {
            setUser({...user, username: event.target.value})  
        }}/>
        <input placeholder='Password' onChange={(event) => {
            setUser({...user, password: event.target.value})  
        }}/>
        <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

export default Signup