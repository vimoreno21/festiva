import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from "../actions/currentUser";

const GameLibrary = () => {
    const list = [
        {
          quiz_name: "Create Game",
          quiz_description: "click here to create your own game.",
        },
        {
          quiz_name: "Game two",
          quiz_description: "LONG LONG LONG GAME",
        },
        {
          quiz_name:"Game three",
          quiz_description: "LONG LONG LONG GAME",
        },
      ];

      const [quizzes, setQuizzes] = useState([]);
      const apiEndpoint = '/api/getUserQuizzes'; 
      const user = getUserInfo();
      const navigate = useNavigate();

      useEffect(() => {
        const fetchQuizzes = async () => {
          try {
            const response = await fetch(apiEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ _id: user.id }), // Replace 'user123' with the actual user ID
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch quizzes');
            }
    
            const data = await response.json();
            setQuizzes(data);
          } catch (error) {
            console.error('Error fetching quizzes:', error.message);
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
    navigate('/waitToPlayGame', { state: { quiz } });
  };
  
  return (
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
  );
};

export default GameLibrary;
