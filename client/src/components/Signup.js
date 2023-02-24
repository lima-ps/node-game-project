import React, {useState} from 'react'

function Signup() {

    //obtect called user, initialize as null
    const [user, setUser] = useState("null")

    //function to the button signup
    const signUp = () =>{

    }

  return (
    <div className='signUp'>
        <label for="">Sign Up</label>
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