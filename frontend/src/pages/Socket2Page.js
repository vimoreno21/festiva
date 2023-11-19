import { useState, useEffect } from 'react'

const Socket2Page = ({ socket, icons }) => {
    const qColor = {
        0: 'orange',
        1: 'blue',
        2: 'purple',
        3: 'green'
    }

    const [game, setGame] = useState({
        id: '',
        users: {}
    });

    const [nickname, setNickname] = useState('');

    const [gameOn, setGameOn] = useState(false);
    const [countDown, setCountDown] = useState(15);
    const [joined, setJoined] = useState(false);

    const [isCorrect, setIsCorrect] = useState(null);

    const [waiting, setWaiting] = useState(false);
    const [currentIcon, setCurrentIcon] = useState('frog');


    const handleSubmitAnswer = (value) => {

        // console.log(game.currentAnswer[value]);
        socket.emit('submit-answer', { id: game.id, count: countDown, answer: game.currentAnswer[value] });
        setWaiting(true);

    }

    useEffect(() => {
        socket.on('get-answers', value => {
            //console.log('GETTING ANSWERS!!!!!!!', value)
            setGame(value);
            setGameOn(true);
            setWaiting(false);
            setIsCorrect(null);
        })

        socket.on('receieve-users', newUsers => {

            // console.log(newUsers)
            // console.log(joined)
            if (!joined && Object.values(newUsers)?.find(i => i.nickname === sessionStorage.getItem('nickname'))) {
                // console.log("users arr on fronten USER", newUsers)
                setJoined(true);

            }
        })

        socket.on('count-down', count => {
            // assuming starting count = 15
            // point = count > 10 ? 100 : count*10
            setCountDown(count);
            if (count === 'Time is up!') {
                setWaiting(true);
            }
        })

        socket.on('get-scores', (scores, corrects) => {
            //console.log(corrects)
            if (corrects[sessionStorage.getItem('nickname')]) {
                setIsCorrect(true);
            }
            else setIsCorrect(false);
        })

    }, [socket])

    return (
        <>

            {
                waiting &&
                <>
                    {
                        isCorrect === null
                            ?
                            <h1 className=' py-5 h-100'>WAITING.....</h1>
                            :
                            <h1 className=' py-5 h-100'>{isCorrect ? 'Correct!' : 'Wrong!'}</h1>
                    }
                </>
            }

            {
                gameOn
                    ?
                    <div className='w-100'>

                        {
                            <h3>{countDown}</h3>
                        }
                        {
                            game?.q_and_a
                                ?
                                <>
                                    <h3>{game.q_and_a[game.round].question}</h3>

                                    <div className='flex w-100 justify-content-around'>
                                        <button onClick={() => handleSubmitAnswer(0)} style={{ backgroundColor: qColor[0] }}>
                                            Option: {game.currentAnswer[0]}
                                        </button>
                                        <button onClick={() => handleSubmitAnswer(1)} style={{ backgroundColor: qColor[1] }}>
                                            Option: {game.currentAnswer[1]}
                                        </button>
                                    </div>

                                    <div className='flex w-100 justify-content-around'>
                                        <button onClick={() => handleSubmitAnswer(2)} style={{ backgroundColor: qColor[2] }}>
                                            Option: {game.currentAnswer[2]}
                                        </button>
                                        <button onClick={() => handleSubmitAnswer(3)} style={{ backgroundColor: qColor[3] }}>
                                            Option: {game.currentAnswer[3]}
                                        </button>
                                    </div>
                                </>
                                :
                                <>

                                    <h3>{game?.currentQuestion}</h3>
                                    <div className='flex w-100 justify-content-around'>
                                        <button onClick={() => handleSubmitAnswer(0)} style={{ backgroundColor: qColor[0] }}>
                                            Answer: {game?.currentAnswer[0]}
                                        </button>
                                        <button onClick={() => handleSubmitAnswer(1)} style={{ backgroundColor: qColor[1] }}>
                                            Answer: {game?.currentAnswer[1]}
                                        </button>
                                    </div>

                                    <div className='flex w-100 justify-content-around'>
                                        <button onClick={() => handleSubmitAnswer(2)} style={{ backgroundColor: qColor[2] }}>
                                            Answer: {game?.currentAnswer[2]}
                                        </button>
                                        <button onClick={() => handleSubmitAnswer(3)} style={{ backgroundColor: qColor[3] }}>
                                            Answer: {game?.currentAnswer[3]}
                                        </button>
                                    </div>
                                </>

                        }


                    </div>
                    :
                    <>
                        {
                            joined &&
                            <h1>Joined!!!!!</h1>
                        }
                        <h3>Enter game id: </h3>
                        <input
                            type='text'
                            value={game.id}
                            onChange={e => setGame(prev => ({ ...prev, id: e.target.value }))}
                        />

                        <h3>Enter nickname: </h3>
                        <input
                            type='text'
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />

                        <select value={currentIcon} onChange={e => setCurrentIcon(e.target.value)}>
                            {
                                Object.keys(icons).map(icon => (
                                    <option value={icon} className='w-40 h-10'>
                                        {icon.charAt(0).toUpperCase() + icon.slice(1)}
                                    </option>
                                ))
                            }
                        </select>

                        <button
                            className='my-2'
                            onClick={() => {
                                socket.emit('join-game', game, nickname, currentIcon);
                                sessionStorage.setItem('nickname', nickname);
                            }}
                        >
                            JOIN GAME ID is {game.id}, nickname: {nickname}
                        </button>
                    </>

            }
        </>

    )
}

export default Socket2Page