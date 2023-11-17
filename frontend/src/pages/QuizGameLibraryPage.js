import React, { useState, useEffect } from 'react';
import GameLibrary from '../components/GamesLibrary.js';
import '../dist/output.css';
import { useNavigate } from 'react-router-dom';
import {Breadcrumbs, BreadcrumbItem, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import {SearchIcon} from "../images/SearchIcon.jsx";
import { getUserInfo } from "../actions/currentUser";
import { fetchQuizzes } from '../actions/fetchQuizzes';

function QuizGameLibraryPage({socket}) {

  const [quizzes, setQuizzes] = useState([]);
  const user = getUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
  fetchQuizzes(user, setQuizzes);
  }, []);

  const handleQuizClick = (quiz) => {
    // id
    const id = String(Math.floor(Math.random() * 5000) + 1000) + ''
    // Navigate to /waitToPlayGame and pass the selected quiz as state
    const game = {
      id: id,
      users: {},
      round: 0,
      q_and_a: quiz.questions
    };
    // start the game 
    socket.emit('create-game', game);
    navigate('/waitToPlayGame', { state: { quiz, game} });
  };


    return (
      <div className="librarypage_div container-p" > 
      {/* style={{ display: 'flex'}} */}
        <Breadcrumbs size='md'>
          <BreadcrumbItem href="/pickgame">Choose Game</BreadcrumbItem>
          <BreadcrumbItem> Pick Quizoot</BreadcrumbItem>
        </Breadcrumbs>
        <div className="chooseGame" style={{paddingRight:'40px', color:'#6a5acd'}}>Choose A Quizoot:</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom:'50px', paddingTop:'25px'}}>
          <Autocomplete 
            label="Type to search" 
            labelPlacement='outside'
            color='secondary'
            className="sm" 
            classNames={{
              base: "max-w-sm sm:max-w-[5rem] h-12",
              mainWrapper: "h-full",
              input: "text-medium",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              border: 'none'
            }}
          >
            {quizzes.map((quiz) => (
              <AutocompleteItem key={quiz.quiz_name} value={quiz.quiz_name} onClick={() => handleQuizClick(quiz)}>
                {quiz.quiz_name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        
      <GameLibrary socket={socket} quizzes={quizzes} setQuizzes={setQuizzes}/>
      </div>
    );
  }
  
  export default QuizGameLibraryPage;
  
