import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Card, CardBody, CardHeader, Divider, Button, Input } from "@nextui-org/react";
import QuestionGroup from "./QuestionGroup";
import { getUserInfo } from "../actions/currentUser";


const CreateGameForm = () => {
  // for api
  const [numQuestions, setNumQuestions] = useState(0);
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  // http://localhost:5000
  let endpoint = '/api/createQuiz';

  // to display all the questions
  const handleNumQuestionsChange = (e) => {
    // Ensure numQuestions is a non-negative integer
    const value = parseInt(e.target.value, 10);
    setNumQuestions(isNaN(value) ? 0 : Math.max(0, value));
  };

  const handleQuestionChange = (index, questionData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = questionData;
    setQuestions(updatedQuestions);
  };


  const createQuiz = (quiz) => {
    const user = getUserInfo();
    let owner_id = user.id;
    
    const quizData = {
      owner_id,
      gameName,
      gameDescription,
      numQuestions,
      questions: Array.from({ length: numQuestions }, (_, index) => ({
      questionNumber: index + 1,
        
      })),
    };
    console.log(quizData);
    // Assuming you have a server endpoint for creating quizzes
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    })
    .then(response => response.json())
    .then(data => {
      // Assuming your server responds with the created quiz
      console.log("QUIZ MADE");
    })
    .catch(error => {
      console.error('Error creating quiz:', error);
    });
  };

  return (
    <Card className="max-w-[650px]" style={{maxHeight: '75vh'}}>
      <CardHeader className="flex gap-3">
        <h1>Input Your Game Information</h1>
      </CardHeader>
      <Divider/>
        <CardBody className="overflowY: 'scroll'">
            <p> 
            Please input your game's name, description, and the number of questions. Then input the questions with 4 answers. 
            </p>
            
        <Input
          size="lg"
          key='name'
          type="string"
          color='danger'
          label="Game Name"
          placeholder=""
          labelPlacement="outside"
          fullWidth
          isClearable
          onChange={(e) => setGameName(e.target.value)}
        />
        <div style={{ marginBottom: '10px' }}/>
        <Input
          size="lg"
          key='description'
          type="string"
          color='danger'
          label="Game Description"
          placeholder=""
          labelPlacement="outside"
          fullWidth
          onChange={(e) => setGameDescription(e.target.value)}
        />
        <div style={{ marginBottom: '10px' }}/> 
        <Input
         size="lg"
          key='num'
          type="number"
          color='danger'
          label="Number of Questions"
          placeholder="0"
          labelPlacement="outside"
          fullWidth
          onChange={handleNumQuestionsChange}
        />
        <div style={{ marginBottom: '10px',}}/> 
        
        {/* {renderQuestionGroups()} */}
        {Array.from({ length: numQuestions }, (_, index) => (
            <QuestionGroup key={index} 
            questionNumber={index + 1} 
            onChange={(questionData) => handleQuestionChange(index, questionData)}/>
        ))}

        <div style={{ marginBottom: '10px',}}/> 
          <Button radius="full" 
            className="text-white" style={{ backgroundColor:'#E3649C', border:'none',  paddingTop: '20px'}}
            onPress={() => createQuiz()}>
            Create Game
          </Button>
          
        </CardBody>
    </Card>
  );
}
export default CreateGameForm;

  
