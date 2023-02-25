import React, { useState } from 'react';
import Board from './Board';


function Game({channel, setChannel}) {

  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

  //check the events in the channel
  channel.on('user.watching.start', (event) => { //this event happen when a user start the same channel
    setPlayersJoined(event.watcher_count === 2);
  }) 
  if (!playersJoined) {
    return <div>Waiting for another player to join...</div>
  }
  return (
    <div className='gameContainer'>
        <Board/>
        {/* CHAT */}
        {/* leave buttom */}
    </div>
  )
}

export default Game