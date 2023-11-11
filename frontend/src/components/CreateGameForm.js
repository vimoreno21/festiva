import React, { useState } from "react";
import {Card, CardBody, CardHeader, Divider, Button, Input } from "@nextui-org/react";
import QuestionGroup from "./QuestionGroup";


const CreateGameForm = () => {
  const [numQuestions, setNumQuestions] = useState(0);

  const handleNumQuestionsChange = (e) => {
    // Ensure numQuestions is a non-negative integer
    const value = parseInt(e.target.value, 10);
    setNumQuestions(isNaN(value) ? 0 : Math.max(0, value));
  };

  const renderQuestionGroups = () => {
    const questionGroups = [];
    for (let i = 0; i < numQuestions; i++) {
      questionGroups.push(<QuestionGroup key={i} />);
    }
    return questionGroups;
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
            <QuestionGroup key={index} questionNumber={index + 1} />
        ))}

        <div style={{ marginBottom: '10px',}}/> 
        <Button radius="full" className="text-white" style={{ backgroundColor:'#E3649C', border:'none',  paddingTop: '20px'}}>
            Create Game
          </Button>
          
        </CardBody>
    </Card>
  );
}
export default CreateGameForm;

  