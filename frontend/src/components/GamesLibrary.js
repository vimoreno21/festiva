import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../actions/currentUser";

const GameLibrary = () => {
  const [resultGetQuizzes, setResultGetQuizzes] = useState('');
    const list = [
        {
          quiz_name: "Create Game",
          quiz_description: "click here to create your own game.",
        },
        {
          quiz_name: "Game two",
          quiz_description: "LONG LONG LONG GAME",
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

      // let getQuizzes = async (event) => {
      //   // event.preventDefault();
      //   const user = getUserInfo();
      //   let owner_id = user.id;
      //   const userData = {
      //     _id: owner_id,
      //   };
    
      //   let jsonBody = JSON.stringify(userData);
      //   console.log(jsonBody);
    
      //   try {
      //     const response = await fetch(endpoint, {
      //       method: 'POST',
      //       body: jsonBody,
      //       headers: { 'Content-Type': 'application/json' },
      //     });
      //     if (!response.ok) {
      //       throw new Error('Failed to fetch quizzes :(( ');
      //     }
  
          // const data = await response.json();
          // setQuizzes(data);
      //   } catch (error) {
      //     console.error('Error fetching quizzes :((', error.message);
      //   }
      // };

  
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
      navigate('/waitToPlayGame', { state: { quiz } });
    }
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
