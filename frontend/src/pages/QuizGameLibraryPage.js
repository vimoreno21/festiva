import React from 'react'
import GameLibrary from '../components/GamesLibrary.js';
import '../dist/output.css';

function QuizGameLibraryPage() {
    return (
      <div className="librarypage_div container-p" style={{ display: 'flex'}}>
        <h1>Choose quiz:</h1>
        <GameLibrary/>
      </div>
    );
  }
  
  export default QuizGameLibraryPage;
  