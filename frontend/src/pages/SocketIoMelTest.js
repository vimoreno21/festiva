import React, { useState, useEffect } from 'react'
import {io} from 'socket.io-client'

const socket = io("http://localhost:8080");
console.log(socket)

// will listen to any event (socket.on)
socket.on('connect', () => {
    console.log(`You connected with id: ${socket.id}`)
})

// example useless event
// take any event and send it to the server (socket.emit)
socket.emit('custom-e', 110, 'yo', {a:'a'})

const SocketIoMelTest = () => {
    
    socket.on('receieve-message', message => {
        console.log(message)
    })
    const [inputMessage, setInputMessage] = useState("");
    const [room, setRoom] = useState("");

    const [showResults, setShowResults] = useState([]);

    // url here is where server on backend for the sockets is running
    // change this when commit?????
    

    const onClickRoom = () => {
        if(room && room.trim()){
            setShowResults(prev => [room, ...prev]);
            setRoom('');
         }
    }


    const [showMessage, setShowMessage] = useState([]);
    const onClickSend = () => {
        if(inputMessage && inputMessage.trim()){
           setShowMessage(prev => [inputMessage, ...prev]);
           setInputMessage('');
        }
        socket.emit('send-message', inputMessage)
    }


  return (
    <>
        
        <form>

            <label htmlFor={'messageId'}>Message</label>
            <input 
                type='text' 
                id={'messageId'} 
                value={inputMessage} 
                onChange={e => setInputMessage(e.target.value)} 
                className='mb-2'
            />
            <button type='button' className='p-4 btn btn-sm btn-primary mb-5' onClick={onClickSend}>Send</button>
                {
                    showMessage.map( i => <p>{i}</p>)
                }


            <label htmlFor={'roomId'}>Room</label>
            <input type='text' id={'roomId'} value={room} onChange={e => setRoom(e.target.value)} className='mb-2'/>
            <button  type='button' className='p-4 btn btn-sm btn-success' onClick={onClickRoom}>Join</button>
                {
                    showResults.map( i => <p>{i}</p>)
                }

            
        </form>
    </>
  )
}

export default SocketIoMelTest