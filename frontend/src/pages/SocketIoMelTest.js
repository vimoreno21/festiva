import React, { useState } from 'react'

const SocketIoMelTest = () => {

    const [inputMessage, setInputMessage] = useState("");
    const [room, setRoom] = useState("");

    const [showResults, setShowResults] = useState([]);
    const onClickRoom = () => {
        if(room && room.trim()){
            setShowResults(prev => [...prev, room]);
            setRoom('');
         }
    }


    const [showMessage, setShowMessage] = useState([]);
    const onClickSend = () => {
        if(inputMessage && inputMessage.trim()){
           setShowMessage(prev => [...prev, inputMessage]);
           setInputMessage('');
        }
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