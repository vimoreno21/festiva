import React from 'react'
import { Link } from 'react-router-dom';

function QuizGameLibraryPage() {
    return (
      <div>
        <h1>Choose quiz:</h1>
        <button>
            <Link to="/waitToPlayGame" className="temp">Team Quiz</Link>
        </button>
      </div>
    );
  }
  
  export default QuizGameLibraryPage;
  