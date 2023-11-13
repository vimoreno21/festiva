import React from "react";
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { getUserInfo } from "../actions/currentUser";
import { Input } from "@nextui-org/react";

const WaitPlayGame = ({ socket }) => {
  const location = useLocation();
  const quiz = location.state?.quiz || {};
  const initial_game = location.state?.game || {};

  const [gameOn, setGameOn] = useState(false);
  const [countDown, setCountDown] = useState(15);
  const [scores, setScores] = useState(null);

  const qColor = {
    0: 'orange',
    1: 'blue',
    2: 'purple',
    3: 'green'
}

const [game, setGame] = useState(initial_game);

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

  console.log(quiz);

  return (
    <section className="wait_play_style container-p">
      <Breadcrumbs size='md'>
          <BreadcrumbItem href="/pickgame">Choose Game</BreadcrumbItem>
          <BreadcrumbItem href="/quizGameLibrary">Pick Quizoot</BreadcrumbItem>
          <BreadcrumbItem>Play Game</BreadcrumbItem>
      </Breadcrumbs>
      <div className="d-flex flex-col align-items-center">
        <div className="div_style mx-5 flex flex-col md:flex-row justify-content-around text-nowrap text-center">
          <p className="fs-1 fw-normal me-1">Playing:</p>
          <p className="fw-bold fs-1">{quiz.quiz_name}</p>
          <span className="mt-5 mx-5"></span>
          <p className="fs-1 fw-normal me-1">Game Code: </p>
          <p className="fw-bold fs-1 mr-5">{initial_game.id}</p>
        </div>
        <p className="fs-1 fw-normal mt-5">Players</p>
        <p>users: {Object.keys(game.users).length} in game {game.id ? game.id : 'NULL'}</p>
        <ul>
          { Object.keys(game.users)?.map(u => {
              return <li key={u}>
                      {game.users[u].nickname}
                    </li>
            })
          }
        </ul>
        <Link to="/questionDisplay">
          <button className="button_style">Team Quiz</button>
        </Link>
        <button style={{ backgroundColor: 'green' }} 
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
    </section>
  );
};

export default WaitPlayGame;
