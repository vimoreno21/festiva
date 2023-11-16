import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../actions/currentUser";
import { fetchQuizzes } from '../actions/fetchQuizzes';

const GameLibrary = ({socket, quizzes, setQuizzes}) => {
  const list = [
    {
      quiz_name: "Create Game",
      quiz_description: "click here to create your own game.",
    },
  ];
  const [isHovered, setIsHovered] = useState([]);
  // http://localhost:5000
  const apiEndpoint = '/api/deleteQuiz'; 
  const user = getUserInfo();

  useEffect(() => {
    // Initialize isHovered with false for each quiz item
    setIsHovered(Array(quizzes.length).fill(false));
  }, [quizzes]);

  const handleMouseEnter = (index) => {
    const updatedHoverState = Array(quizzes.length).fill(false);
    updatedHoverState[index] = true;
    setIsHovered(updatedHoverState);
  };

  const handleMouseLeave = (index) => {
    const updatedHoverState = Array(quizzes.length).fill(false);
    updatedHoverState[index] = false;
    setIsHovered(updatedHoverState);
  };

  const deletedQuiz = (quiz) => {
    const deleteQuiz = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: JSON.stringify({ _id: quiz._id }), 
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete quizzes :(( ');
        }
        else{
          fetchQuizzes(user, setQuizzes);
          alert('Button deleted!');
        }

      } catch (error) {
        console.error('Error deleting quizzes :((', error.message);
      }
    };
    deleteQuiz();
  };

  const navigate = useNavigate();
  let combinedList;
  console.log(quizzes);

  if (quizzes.length !== 0)
  {
    combinedList = [...list, ...quizzes];
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
        q_and_a: quiz.questions
      };
      // start the game 
      socket.emit('create-game', game);
      navigate('/waitToPlayGame', { state: { quiz, game} });
    }
  };
  
  return (
    <div> 
      <div className="game-library-grid">
        {combinedList.map((quiz, index) => (
            <Card shadow="sm" className="game-card max-w-[250px]" key={index} onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)} isPressable onPress={() => handleQuizClick(quiz)}
             >
            {/* <Card className="max-w-[400px]"> */}
                <CardHeader>
                  {/* className="flex gap-3" */}
                  {/* <div> */}
                  <div style={{color:'#6a5acd', fontSize:'20px'}}>{quiz.quiz_name}</div>
                  {/* </div> */}
                </CardHeader>
                <Divider/>
                <CardBody >
                  {/* className="flexWrap" */}
                  <p>{quiz.quiz_description}</p>
                </CardBody>
                {isHovered[index] && (
                  <Button
                    className={" text-foreground border-default-200"}
                    color="secondary"
                    radius="full"
                    size="sm"
                    variant="flat"
                    onPress={() => deletedQuiz(quiz)}
                  >
                    Delete
                  </Button>
                )}
            </Card>
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;
