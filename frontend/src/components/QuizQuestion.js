import React, { useEffect, useState } from "react";
import TimerWithCircle from "../components/TimerWithCircle";

function QuizQuestion({ setShowRanking, setIsPlaying, quiz, game, socket }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [countDown, setCountDown] = useState(15);

  // new stuff
  // const [scores, setScores] = useState(null);
  const [gameOn, setGameOn] = useState(false);
  const [gameObject, setGameObject] = useState(game);


  useEffect(() => {

    socket.on("count-down", (count) => {
      setCountDown(count);
    });

    // socket.on("get-scores", (value) => {
    //   console.log("value", value);
    //   setScores(value);
    //   console.log("scores", scores);
    // });
  }, [socket]);


  // for testing
  console.log("quiz:", quiz);
  console.log("game:", gameObject);

  // Check if quiz is empty or currentQuestionIndex is out of bounds (usually because it hasn't loaded yet)
  // if (quiz.length === 0 || currentQuestionIndex >= quiz.q_and_a.length) {
  //   return <p className="message">Loading...</p>;
  // }

  // const currentQuestion = quiz.q_and_a[currentQuestionIndex];

  // returns the className for the correct answer choice if correct and vice versa
  function getButtonClass(answerChoice, correctAnswer) {
    if (showAnswer)
      if (correctAnswer === answerChoice) return "correct-answer";
      else return "wrong-answer";
    // returns empty string to assign no className
    else return "";
  }
  // gets the correct background color for each button
  function getBackgroundColor(answerIndex) {
    const colors = ["#ECD483", "#FF9B9B", "#8CD9E4", "#A4D67D"];
    return colors[answerIndex % colors.length];
  }

  // handles instructions once timer ends
  const handleTimerEnd = () => {
    setShowAnswer(true);
    
    // delays moving to next step by 3 seconds to show correct answer
    setTimeout(() => {
      if (gameObject.q_and_a[gameObject.round] < quiz.q_and_a.length - 1) {
        setIsPlaying(false);
        setShowRanking(true);
        moveToNextQuestion();
      } else {
        setIsPlaying(false);
      }

    }, 3000);
    
  };

  const moveToNextQuestion = () => {
    setIsPlaying(true);
    // setCurrentQuestionIndex(currentQuestionIndex + 1);
    // setResetTimer(true);
    setShowAnswer(false);
  };

  

  return (
    <>
      {
      gameObject.round < gameObject.q_and_a.length &&
      (<div>
        <div className="timer-container">
          {/* <TimerWithCircle
            duration={countDown}
            onTimerEnd={handleTimerEnd}
            resetTimer={resetTimer}
            setResetTimer={setResetTimer}
            countdown={countDown}
          /> */}
          {/* {countDown === "Time is up!"? setShowRanking(true): countDown} */}
          {countDown}
        </div>
        <div className="question-container">
          {/* <h2 className="question-text">{currentQuestion.question}</h2> */}
          <h2 className="question-text">{gameObject.q_and_a[gameObject.round].question}</h2>
          <div className="answer-grid">
            {/* {currentQuestion.answers.map((answer, answerIndex) => ( */}
            {gameObject.q_and_a[gameObject.round].answers.map((answer, answerIndex) => (
              <button
                key={answerIndex}
                className={`answer-button ${getButtonClass(answer, gameObject.q_and_a[gameObject.round].correct_answer)}`}
                style={{ backgroundColor: getBackgroundColor(answerIndex) }}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        {/* <div>
          <button onClick={handleTimerEnd} className="temp">
            skip question (temporary)
          </button>
        </div> */}
      </div>)
      }

      {/* {
        scores &&
        <ul className='h-100'>
            <h1>Round: {gameObject.round + 1}</h1>
            {
                Object.keys(scores).map(s =>
                    <li key={s + 'S'}>{scores[s].nickname}: {scores[s].points}</li>
                )
            }
            <div className='flex flex-row'>
                <button
                    style={{ backgroundColor: 'green' }}
                    onClick={() => {
                        socket.emit('start-round', gameObject);
                        setGameOn(true)
                        setScores(null);
                        setGameObject(prev => ({...prev, round: prev.round+1}))
                        setShowRanking(false);
                    }}
                >
                    Next Round
                </button>
            </div>
        </ul>

    } */}
    </>
  );
}

export default QuizQuestion;
