import AnswerGroup from './AnswerGroup';
import { Input } from "@nextui-org/react";
import React, { useState } from 'react';

const QuestionGroup = ({ questionNumber, numQuestions, selectedOptions, setSelectedOptions, onChange}) => {
    const [question, setQuestion] = useState({
        question: '',
        answers: ['', '', '', ''], // Initial empty answers array
        correct_answer: '', // Initial empty correct answer
    });

    const handleQuestionTextChange = (e) => {
        const updatedQuestionData = {
            question: e.target.value,
            answers: question.answers,
            correct_answer: question.correct_answer
        };
        //console.log(updatedQuestionData);
        setQuestion(updatedQuestionData);
        // Send the complete question data to the parent component
        onChange(questionNumber-1, updatedQuestionData);
    };

    const handleAnswerChange = (inputNumber, value) => {
        inputNumber = +inputNumber;
        const oldAnswer = question.answers[inputNumber];
        question.answers[inputNumber] = value;

        const updatedQuestionData = {
            question: question.question,
            answers: question.answers,
            correct_answer: question.correct_answer
        };
        //console.log(updatedQuestionData);
        setQuestion(updatedQuestionData);

        if (question.correct_answer){
            if (question.correct_answer === oldAnswer) { // meaning youre changing the correct answer
                handleCorrectAnswerChange(inputNumber, value);
            }
        }
        
        // Send the complete question data to the parent component
        onChange(questionNumber-1, updatedQuestionData);
    };

    const handleCorrectAnswerChange = (inputNumber, value) => {
        console.log("changing " + value);
        const updatedQuestionData = {
            question: question.question,
            answers: question.answers,
            correct_answer: question.answers[inputNumber]
        };
        //console.log(updatedQuestionData);

        setQuestion(updatedQuestionData);
        // Send the complete question data to the parent component
        onChange(questionNumber-1, updatedQuestionData);
    };


    return(
        <div style={{paddingTop: '0px'}}>
            <Input
            size="lg"
            key={`Question-${questionNumber}`}
            type="string"
            color='danger'
            label={`Question ${questionNumber}`}
            placeholder=""
            labelPlacement="outside"
            fullWidth
            onChange={handleQuestionTextChange}
            value={question.question} // Ensure to bind the value this might cause issues 
            />
            <div style={{ marginBottom: '10px',}}/> 
            <AnswerGroup questionNumber={questionNumber} 
            numQuestions={numQuestions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onChange={handleAnswerChange}
            onCorrectAnswerChange={handleCorrectAnswerChange} /* Pass the handler as a prop */
            />
            
        </div>
    );
};

export default QuestionGroup;
