import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../actions/currentUser";

const GameLibrary = ({socket}) => {
    const list = [
        {
          quiz_name: "Create Game",
          quiz_description: "click here to create your own game.",
        },
      ];

      const [quizzes, setQuizzes] = useState([]);
      // http://localhost:5000
      const apiEndpoint = '/api/getUserQuizzes'; 
      const user = getUserInfo();
      const navigate = useNavigate();

      useEffect(() => {
        const fetchQuizzes = async () => {
          try {
            const response = await fetch(apiEndpoint, {
              method: 'POST',
              body: JSON.stringify({ _id: user.id }), 
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch quizzes :(( ');
            }
    
            const data = await response.json();
            setQuizzes(data);
          } catch (error) {
            console.error('Error fetching quizzes :((', error.message);
          }
        };
        fetchQuizzes();
      }, []);
  
  let combinedList;
  console.log(quizzes);
  if (quizzes.length !== 0)
  {
    combinedList = [...list, ...quizzes];
  } else{
    combinedList = list;
  }
  
  const handleQuizClick = (quiz) => {
    // Navigate to /waitToPlayGame and pass the selected quiz as state
    if ( quiz.quiz_name === 'Create Game')
    {
      navigate('/creategame', { state: { quiz } });
    }
    else {
      const game = {
        id: 'dont21',
        users: {},
        round: 0,
        q_and_a: quiz.questions
      };
      // start the game 
      //socket.emit('create-game', game);
      navigate('/waitToPlayGame', { state: { quiz, game} });
    }
  };
  
  return (
    <div> 
      <div className="game-library-grid">
        {combinedList.map((quiz, index) => (
            <Card shadow="sm" className="game-card max-w-[300px]" key={index} isPressable onPress={() => handleQuizClick(quiz)}>
            {/* <Card className="max-w-[400px]"> */}
                <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                <p className="text-md">{quiz.quiz_name}</p>
                </div>
                </CardHeader>
                <Divider/>
                <CardBody  className="flexWrap">
                <p>{quiz.quiz_description}</p>
                </CardBody>
                <Divider/>
                {/* </Card> */}
            </Card>
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;
