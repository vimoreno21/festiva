import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../actions/currentUser";

const GameLibrary = ({socket, userQuizzes, premadeQuizzes}) => {
  const list = [
    {
      quiz_name: "Create Game",
      quiz_description: "click here to create your own game.",
    },
  ];

  const navigate = useNavigate();
  let combinedList;
  console.log("User Quizzes:", userQuizzes);
  console.log("Premade Quizzes:", premadeQuizzes);

  if (userQuizzes.length !== 0)
  {
    combinedList = [...list, ...userQuizzes];
  } else{
    combinedList = list;
  }
  
  const handleQuizClick = (quiz) => {
    // id
    const id = String(Math.floor(Math.random() * 5000) + 1000) + ''
    // Navigate to /waitToPlayGame and pass the selected quiz as state
    if ( quiz.quiz_name === 'Create Game')
    {
      navigate('/creategame', { state: { quiz } });
    }
    else {
      const game = {
        id: id,
        users: {},
        round: 0,
        q_and_a: quiz.q_and_a
      };
      // start the game 
      socket.emit('create-game', game);
      navigate('/waitToPlayGame', { state: { quiz, game} });
    }
  };
  
  return (
    <div> 
      <p className='message'> User quizzes:</p>
      <div className="game-library-grid">
        {combinedList.map((quiz, index) => (
            <Card shadow="sm" className="game-card max-w-[250px]" key={index} isPressable onPress={() => handleQuizClick(quiz)}>
            {/* <Card className="max-w-[400px]"> */}
                <CardHeader >
                  {/* className="flex gap-3" */}
                  {/* <div> */}
                  <div style={{color:'#6a5acd', fontSize:'20px'}}>{quiz.quiz_name}</div>
                  {/* </div> */}
                </CardHeader>
                <Divider/>
                <CardBody  >
                  {/* className="flexWrap" */}
                  <p>{quiz.quiz_description}</p>
                </CardBody>
            </Card>
        ))}
      </div>
      <p className='message'> Premade quizzes:</p>
      <div className="game-library-grid">
        {premadeQuizzes.map((quiz, index) => (
            <Card shadow="sm" className="game-card max-w-[250px]" key={index} isPressable onPress={() => handleQuizClick(quiz)}>
            {/* <Card className="max-w-[400px]"> */}
                <CardHeader >
                  {/* className="flex gap-3" */}
                  {/* <div> */}
                  <div style={{color:'#6a5acd', fontSize:'20px'}}>{quiz.quiz_name}</div>
                  {/* </div> */}
                </CardHeader>
                <Divider/>
                <CardBody  >
                  {/* className="flexWrap" */}
                  <p>{quiz.quiz_description}</p>
                </CardBody>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;
