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
  const [selectedOptions, setSelectedOptions] = useState(Array(numQuestions).fill(null));
  const [resultCreateQuiz, setResultCreateQuiz] = useState('');
  const [firstButtonClicked, setFirstButtonClicked] = useState(false);

  const navigate = useNavigate();
  // http://localhost:5000
  let endpoint = 'http://localhost:5000/api/createQuiz';

  const goToLibrary = () => {
    // Navigate to the desired page when the second button is clicked
    navigate('/quizGameLibrary'); 
  };

  // to display all the questions
  const handleNumQuestionsChange = (e) => {
    // Ensure numQuestions is a non-negative integer
    const value = parseInt(e.target.value, 10);
    const newNumQuestions = isNaN(value) ? 0 : Math.max(0, value);

    const newSelectedOptions = Array(newNumQuestions).fill(null);
    setSelectedOptions(newSelectedOptions);

    setNumQuestions(isNaN(value) ? 0 : Math.max(0, value));
  };

  const handleQuestionChange = (index, questionData) => {
    const updatedQuestions = [...questions];
    console.log(index);
    updatedQuestions[index] = {
      ...updatedQuestions[index], // Preserve existing properties
      ...questionData, // Update with new question data
    };
    console.log(updatedQuestions);
    setQuestions(updatedQuestions);
  };

 
  let createQuiz = async (event) => {
    // event.preventDefault();
    const user = getUserInfo();
    let owner_id = user.id;
    const quizData = {
      owner_id: owner_id,
      quiz_name: gameName,
      quiz_description: gameDescription,
      number_of_questions: numQuestions,
      q_and_a: questions
    };

    let jsonBody = JSON.stringify(quizData);
    console.log(jsonBody);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: jsonBody,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = await response.json();
      if (res.message === 'Quiz created successfully') {
        console.log("created quiz!");
        setResultCreateQuiz('Quiz created successfully');
      }
      else {
        setResultCreateQuiz('Error creating quiz.');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
    setFirstButtonClicked(true);
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
            numQuestions={numQuestions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onChange={(index, updatedQuestionData) => handleQuestionChange(index, updatedQuestionData)}/>
        ))}
        <div style={{ marginBottom: '10px',}}/> 
          <Button radius="full" 
            className="text-white" style={{ backgroundColor:'#E3649C', border:'none',  paddingTop: '20px'}}
            onPress={() => createQuiz()}>
            Create Game
          </Button>
          <div style={{ marginBottom: '10px',}}/> 
          {firstButtonClicked && (
            // Button 2 will only appear if the first button was clicked
            <Button
              radius="full" 
              className="text-white" style={{ backgroundColor:'#AF8CC5', border:'none',  paddingTop: '20px'}}
              onPress={() => goToLibrary()}>
              Sucessful! Go back to Library
            </Button>
          )}
        </CardBody>
    </Card>
  );
}
export default CreateGameForm;

  
