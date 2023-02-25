import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie';
import { useState } from "react";
import JoinGame from "./components/JoinGame";


function App() {
  const api_key = "v99wbtmba5ru";

  //client instance for our chat
  const client = StreamChat.getInstance(api_key);

  //getting cookies from the browser passed from the backend
  const cookies = new Cookies();
  const token = cookies.get("token")

  const [isAuth, setAuth] = useState(false)  //

  if (token) { //this validate if theres a user registered end then connect him
    client.connectUser({
      id: cookies.get("userId"),
      firstName: cookies.get("firstName"),  
      lastName: cookies.get("lastName"),
      name: cookies.get("username"), //we use "name" here cause its the default name used in the stream
      hashedPassword: cookies.get("hashedPassword"),
    }, token)
      .then((user) => {setAuth(true);
      });
  }

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setAuth(false);
  }

  return (
    <div className="App">
      {isAuth ? (
        //Chat will pass the client to all his components childs
      <Chat client={client}> 
        <JoinGame/>
        <button onClick={logOut}>Logout</button>
      </Chat>
      ) : (
      <>
      <Signup setAuth={setAuth}/>
      <Login setAuth={setAuth}/>
      </>
      )}
    </div>
  );
}

export default App;
