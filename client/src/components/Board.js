import React, { useState } from 'react';
import {useChannelStateContext, useChatContext} from 'stream-chat-react';  //get hooks from the components on the stream api
import Square from './Square';

function Board() {

    const [board, setBoard] = useState(["","","","","","","","",""]) //a array of 9 elements that represents eac square of the rows
    const [player, setPlayer] = useState("X") //indicates whitch player you're "X" or "O"
    const [turn, setTurn] = useState("X") //indicates of who is the turn

    const { channel } = useChannelStateContext(); //get the channel passed through the Elements components "Channel"
    const { client } = useChatContext();
    
    const chooseSquare = async (square) => {
        if (turn === player && board[square] === ""){
            setTurn(player === "X" ? "O" : "X");
            
            await channel.sendEvent({//this will whatch an update in the channel to send to users
                type: "game-move",
                data: {square, player}, //we pass what we want the other player need to know
            })

            setBoard(
                board.map((val, idx) => {
                if (idx === square && val === ""){
                    return player //X or O
                }
                return val //return the current val wihtout change
            })
            );
        }
    }

    //this send the update to the user that didn't make the event
    channel.on((event) => { 
        //this just occours to the second player
        if (event.type === "game-move" && event.user.id !== client.userID){
            
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);

            setBoard(
                board.map((val, idx) => {
                if (idx === event.data.square && val === ""){
                    return event.data.player //X or O
                }
                return val //return the current val wihtout change
            }))
        }
    })
    //{/*this will recieve whitch square was choosen and a val of a "board index" depending of the state in the array" */}
    //{/*then will be handle in the Square component */}


  return (
    <div className='board'>
        <div className='row'>
            <Square chooseSquare={()=>{
                chooseSquare(0);
            }} val={board[0]}/> 
            <Square chooseSquare={()=>{
                chooseSquare(1);
            }} val={board[1]}/>
            <Square chooseSquare={()=>{
                chooseSquare(2);
            }} val={board[2]}/>
        </div>
        <div className='row'>
            <Square chooseSquare={()=>{
                chooseSquare(3);
            }} val={board[3]}/>
            <Square chooseSquare={()=>{
                chooseSquare(4);
            }} val={board[4]}/>
            <Square chooseSquare={()=>{
                chooseSquare(5);
            }} val={board[5]}/>
        </div>
        <div className='row'>
            <Square chooseSquare={()=>{
                chooseSquare(6);
            }} val={board[6]}/>
            <Square chooseSquare={()=>{
                chooseSquare(7);
            }} val={board[7]}/>
            <Square chooseSquare={()=>{
                chooseSquare(8);
            }} val={board[8]}/>
        </div>
    </div>
  )
}

export default Board