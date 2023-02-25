import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react'; //grab the props passed in the Chat Component in app.js
import Game from './Game';

function JoinGame() {

  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null)

  const createChannel = async () => {
    const response = await client.queryUsers({name: {$eq: rivalUsername}}); //get the user rival

    if (response.users.length === 0) {
      alert("User not Found")
      return;
    }

    //create a new channel
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],  //get our user end the user ID from our rival
    })

    await newChannel.watch();  //listening the connection, get inside
    setChannel(newChannel);
  };

  return (
    //if the cannel exist
    <>
    { channel ? (
      <Channel channel={channel}>
        <Game channel={channel}/>
      </Channel>
    ) : 
    //'if channel is null'
    (
      <div className='joinGame'>
        <h4>Create Game</h4>
        <input placeholder='Username Rival' onChange={(event) => {
          setRivalUsername(event.target.value);
        }} />
        <button onClick={createChannel}> Join Game </button> 
      </div>
      //'this button creates the channel end send the rival name'
    )}
    </>
  );
}

export default JoinGame