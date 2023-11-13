import React from 'react'
import GameLibrary from '../components/GamesLibrary.js';
import '../dist/output.css';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

function QuizGameLibraryPage() {
    return (
      <div className="librarypage_div container-p" > 
      {/* style={{ display: 'flex'}} */}
        <Breadcrumbs size='md'>
          <BreadcrumbItem href="/pickgame">Choose Game</BreadcrumbItem>
          <BreadcrumbItem> Pick Quizoot</BreadcrumbItem>
        </Breadcrumbs>
        <div className="chooseGame">Choose Quizoot:</div>
        <GameLibrary/>
      </div>
    );
  }
  
  export default QuizGameLibraryPage;
  