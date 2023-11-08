import React, { useEffect, useState } from "react";
import TimerWithCircle from "../components/TimerWithCircle";
import backgroundMusic from "../audio/hipjazz.mp3";
import AudioPlayer from "../components/AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ResponsiveTextContainer from "../components/ResponsiveTextContainer";
//import ScaleText from "react-scale-text";
import { useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
/*
    Notes
    - connect to database
    - after timer ends, show the correct answer
    - navigate to rankings
    - once all questions end navigate to leaderboard
    - once all users pick their answers we can move on to the next question without waiting for timer to end
    - if deemed necessary, fix timer so that it can play on reload and it stops playing when we go to previous page
    - get rid of nav bar and instead add a go back button
    - make text responsive or add word count
    - navbar went under :()

    Done:
    - add game title!
    

*/

const temp = [
  {
    quiz_name: "team quiz",
    quiz_description: "blah blah",
    number_of_questions: 3,
    q_and_a: [
      // each question, its set of answers, and the correct answer for the question is an object in this array
      {
        question: "Who is the project manager?",
        answers: ["Muhadeseh", "Melanie", "Victoria", "Huda"],
        correct_answer: "Victoria",
      },
      {
        question: "Who is part of front-end web?",
        answers: ["Huda", "Arian", "Ricardo", "Muhadeseh"],
        correct_answer: "Muhadeseh",
      },
      {
        question: "Who is the MVP?",
        answers: ["Muhadeseh", "Ricardo", "Melanie", "Huda"],
        correct_answer: "Melanie",
      },
    ],
  },
];

function QuestionDisplayPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = temp[0].q_and_a[currentQuestionIndex];
  const [resetTimer, setResetTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();

  const handleExitButton = () => {
    // replaces history stack with the quizGameLibrary page
    navigate(-2, { replace: true });
  };

  const leftArrowIcon = (
    <FontAwesomeIcon
      icon={faArrowLeft}
      size="lg"
      style={{ color: "#f5695c" }}
    />
  );

  // gets the correct background color for each button
  function getBackgroundColor(answerIndex) {
    const colors = ["#ECD483", "#FF9B9B", "#8CD9E4", "#A4D67D"];
    return colors[answerIndex % colors.length];
  }

  // handles instructions once timer ends
  const handleTimerEnd = () => {
    if (currentQuestionIndex < temp[0].q_and_a.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // ** change later so we move to next question after leaderboard has been shown
      moveToNextQuestion();
    } else {
      setResetTimer(false);
      setIsPlaying(false);
    }
  };

  // Handles moving to the next question
  const moveToNextQuestion = () => {
    setResetTimer(true);
    setIsPlaying(true);
  };

  return (
    <div className="questionDisplay-container">
      <div className="game-nav">
        <button className="back-button" onClick={handleExitButton}>
          {leftArrowIcon} Exit
        </button>
        <span className="game-title">Quizoot</span>
      </div>
      <div>
        <AudioPlayer src={backgroundMusic} isPlaying={isPlaying} />
      </div>
      <div className="timer-container">
        <TimerWithCircle
          duration={10}
          onTimerEnd={handleTimerEnd}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
        />
      </div>
      <div className="question-container ">
        <h2 className="question-text">{currentQuestion.question}</h2>
        <div className="answer-grid">
          {currentQuestion.answers.map((answer, answerIndex) => (
            <button
              key={answerIndex}
              className="answer-button"
              style={{ backgroundColor: getBackgroundColor(answerIndex) }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      {/* deleting later
      button skips question without the need to finish timer */}
      <div>
        <button onClick={handleTimerEnd} className="temp">
          skip question (temporary)
        </button>
      </div>
    </div>
  );
}

export default QuestionDisplayPage;
