import React, { useState, useEffect } from 'react'

// handle showing score on mobile when game is over (could j tell mobile team to do that)
// autogenerate ID
// coordinate with API endpoints



// will listen to any event (socket.on)

// example useless event
// take any event and send it to the server (socket.emit)
//socket.emit('custom-e', 110, 'yo', {a:'a'})

const SocketIoMelTest = ({ socket }) => {

    const qColor = {
        0: 'orange',
        1: 'blue',
        2: 'purple',
        3: 'green'
    }


    const [game, setGame] = useState({
        id: '',
        users: {},
        round: 0,
        q_and_a: [
            {
                "question": "how are ya?",
                "answers": ["maybe im fine", "horrible", "zebra", "stop asking"],
                "correct_answer": "zebra"
            },
            {
                "question": "wassup?",
                "answers": ["nothing", "d", "c", "stop"],
                "correct_answer": "stop"
            },
            {
                "question": "pepe?",
                "answers": ["maybe", "h", "z", "asking"],
                "correct_answer": "maybe"
            },
            {
                "question": "no?",
                "answers": ["yes", "heck ya", "shuttup", "bro"],
                "correct_answer": "bro"
            },
            {
                "question": "doob?",
                "answers": ["maybe", "bee", "pepe", "p"],
                "correct_answer": "bee"
            }
        ]
    });

    const [gameOn, setGameOn] = useState(false);
    const [countDown, setCountDown] = useState(15);

    const [scores, setScores] = useState(null);

    useEffect(() => {
        socket.on('receieve-users', newUsers => {
            // console.log('RECEIVE USERS!@', newUsers)
            setGame(prev => ({ ...prev, users: newUsers }));

        })

        socket.on('get-scores', value => {
            // console.log('GETTING SCORES!!!!!!!', value);
            setScores(value);
        })

        socket.on('count-down', count => {
            setCountDown(count);
        })

    }, [socket])

    return (
        <>
            {
                scores &&
                <ul className='h-100'>
                    <h1>Round: {game.round + 1}</h1>
                    {
                        Object.keys(scores).map(s =>
                            <li key={s + 'S'}>{scores[s].nickname}: {scores[s].points}</li>
                        )
                    }
                    <div className='flex flex-row'>
                        <button
                            style={{ backgroundColor: 'green' }}
                            onClick={() => {
                                socket.emit('start-round', game);
                                setGameOn(true)
                                setScores(null);
                                setGame(prev => ({...prev, round: prev.round+1}))
                            }}
                        >
                            Next Round
                        </button>
                    </div>
                </ul>

            }

            <p>users: {Object.keys(game.users).length} in game {game.id ? game.id : 'NULL'}</p>
            <ul>
                {
                    Object.keys(game.users)?.map(u => {
                        return <li key={u}>
                            {game.users[u].nickname}
                        </li>
                    })
                }
            </ul>


            {
                gameOn && game.round < game.q_and_a.length
                    ?
                    <div className='w-100'>

                        <h3>{countDown}</h3>

                        <>
                            <h3>{game.q_and_a[game.round].question}</h3>

                            <div className='flex w-100 justify-content-around'>
                                <h3 style={{ backgroundColor: qColor[0] }}>
                                    Option: {game.q_and_a[game.round].answers[0]}
                                </h3>
                                <h3 style={{ backgroundColor: qColor[1] }}>
                                    Option: {game.q_and_a[game.round].answers[1]}
                                </h3>
                            </div>

                            <div className='flex w-100 justify-content-around'>
                                <h3 style={{ backgroundColor: qColor[2] }}>
                                    Option: {game.q_and_a[game.round].answers[2]}
                                </h3>
                                <h3 style={{ backgroundColor: qColor[3] }}>
                                    Option: {game.q_and_a[game.round].answers[3]}
                                </h3>
                            </div>
                        </>


                    </div>
                    :
                    <>

                        <div className='flex flex-col w-25'>

                            <input
                                type='text'
                                value={game.id}
                                onChange={e => setGame(prev => ({ ...prev, id: e.target.value }))}
                            />

                            <button
                                style={{ backgroundColor: 'blue' }}
                                className='my-2'
                                onClick={() => {
                                    socket.emit('create-game', game);
                                }}
                            >
                                create game
                            </button>

                        </div>

                        <div className='flex flex-row'>
                            <button
                                style={{ backgroundColor: 'green' }}
                                onClick={() => {
                                    // console.log(game)
                                    socket.emit('start-round', game);
                                    setGameOn(true)
                                    setScores(null);
                                }}
                            >
                                Start Game
                            </button>
                        </div>
                    </>
            }
        </>
    )
}

export default SocketIoMelTest