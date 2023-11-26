import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useState } from "react";
import { ConnectionStates } from "mongoose";

function QuizRanking({
  setShowRanking,
  setIsPlaying,
  gameObject,
  setGameObject,
  scores,
  setScores,
  socket,
  icons
}) {

  return (
    <>
      <Container className="table-styles">
        <h1 className="message">Round: {gameObject.round}!</h1>
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
        {Object.values(scores)
          .sort((a, b) => b.points - a.points)
          .map((user, index) => (
            <Row key={index}>
              <Col>{index + 1}</Col>
              <Col>
                <img
                      src={icons[user.icon]}
                      alt="icon"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </Col>
              <Col>{user.nickname}</Col>
              <Col>{user.points}</Col>
            </Row>
          ))}
      </Container>

      {scores && (
        <ul className="h-100">
          <div className="flex flex-row">
            <button
                className="nextRound-button mx-auto"
              onClick={() => {
                socket.emit("start-round", gameObject);
                setScores(null);
                setGameObject((prev) => ({ ...prev, round: prev.round + 1 }));
                setShowRanking(false);
              }}
            >
              Next Question
            </button>
          </div>
        </ul>
      )}
    </>
  );
}

export default QuizRanking;
