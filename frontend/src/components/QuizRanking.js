import React, { useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
  
function QuizRanking({ setShowRanking, setIsPlaying, users }) {
useEffect(() => {
    setIsPlaying(false);

    // Delayed action to hide rankings after 5000 milliseconds (5 seconds)
    const timeoutId = setTimeout(() => {
    setShowRanking(false);
    }, 50000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
}, [setIsPlaying, setShowRanking]);

return (
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
);
}

export default QuizRanking;
