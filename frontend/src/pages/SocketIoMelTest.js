import React, { useState, useEffect } from 'react'


// will listen to any event (socket.on)

// example useless event
// take any event and send it to the server (socket.emit)
//socket.emit('custom-e', 110, 'yo', {a:'a'})

const SocketIoMelTest = ({socket}) => {
    
    // socket.on('receieve-message', message => {
    //     console.log("receieved message: ", message)
    // })

    const [inputMessage, setInputMessage] = useState("");
    const [room, setRoom] = useState("");

    const [showResults, setShowResults] = useState([]);
    
    const onClickRoom = () => {
        if(room && room.trim()){
            setShowResults(prev => [room, ...prev]);
            // telling server we want to join a room
            socket.emit('join-room', room)
            // setRoom('');
         }
    }


    const [showMessage, setShowMessage] = useState([]);
    const onClickSend = () => {
        if(inputMessage && inputMessage.trim()){
           setShowMessage(prev => [inputMessage, ...prev]);
           setInputMessage('');
        }
        console.log("printing room: ", room)
        socket.emit('send-message', inputMessage, room)
    }


    const [game, setGame] = useState({
        id: '',
        users: {}
    });

    const [nickname, setNickname] = useState('')

    useEffect(() => {
        socket.on('receieve-users', newGame => {
            console.log("users arr on fronten", newGame)
            setGame(newGame);
        })

    }, [socket])

  return (
    <>

        <div className='flex flex-col w-25'>

            <p>users: {Object.keys(game.users).length} in game {game.id ? game.id : 'NULL'}</p>
            <ul>
                {
                    Object.keys(game.users)?.map( u => 
                        <li key={u}>{game.users[u]}</li>
                    )
                }
            </ul>


            <input 
                type='text'
                value={game.id}
                onChange={e => setGame(prev => ({...prev, id: e.target.value}))}
            />

            <button 
                style={{backgroundColor: 'blue'}}
                className='my-2'
                onClick={() => {
                    socket.emit('create-game', game);
                }}
            >
                create game
            </button>

            <button
                className='my-2'
                onClick={() => {
                    socket.emit('join-game', game, nickname);
                }}
            >
                JOIN GAME ID is {game.id}, nickname {nickname}
            </button>

            <p>Enter nickname below:</p>
            <input 
                type='text' 
                value={nickname}
                onChange={e => setNickname(e.target.value)}
            />

            {/* <div>
                {
                    users.map((n) =>
                    <li>{n}</li>
                    )
                }  
            </div>  */}
        </div>
        
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