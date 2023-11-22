import React, { useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { useState } from "react";
import { ConnectionStates } from "mongoose";
  
function QuizRanking({ setShowRanking, setIsPlaying, users, game, setScores, scores, socket}) {
    // const [scores, setScores] = useState(null);
    const [gameOn, setGameOn] = useState(false);
    const [gameObject, setGameObject] = useState(game);


    useEffect(() => {
    // setIsPlaying(false);



    // Delayed action to hide rankings after 5000 milliseconds (5 seconds)
    // setTimeout(() => {
    // setShowRanking(false);
    // }, 50000);
    
    }, [setShowRanking, socket]);

return (
    <>
    <Container className="table-styles">
    <h1 className="message">Rankings!</h1>
    <Row>
        <Col>
        <h5>Rank</h5>
        </Col>
        <Col>
        <h5>Avatar</h5>
        </Col>
        <Col>
        <h5>User</h5>
        </Col>
        <Col>
        <h5>Points</h5>
        </Col>
    </Row>
    {users
        .sort((a, b) => b.points - a.points)
        .map((user, index) => (
        <Row key={index}>
            <Col>{index + 1}</Col>
            <Col>
            <img
                src={user.user_avatar}
                alt={`Avatar for ${user.user_name}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            </Col>
            <Col>{user.user_name}</Col>
            <Col>{user.points}</Col>
        </Row>
        ))}
    </Container>
    
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
                        // setScores(null);
                        setGameObject(prev => ({...prev, round: prev.round+1}))
                        setShowRanking(false);
                        setShowRanking(false);

                    }}
                >
                    Next Round
                </button>
            </div>
        </ul>

    }
    </>
);
}

export default QuizRanking;
