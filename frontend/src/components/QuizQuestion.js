import React, { useEffect, useState } from "react";
import TimerWithCircle from "../components/TimerWithCircle";
import { useNavigate } from "react-router-dom";
function QuizQuestion({ setShowRanking, setIsPlaying, quiz, gameObject, setShowWinnersPodium, socket }) {
  const [quizData, setQuizData] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPlaying(true);
    async function fetchQuiz() {
      let obj = { quiz_name: "team quiz 2" };
      let js = JSON.stringify(obj);

      try {
        const response = await fetch(
          "/api/searchPremadeQuiz",
          {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json", 'x-auth-token': JSON.parse(localStorage.getItem('user_data'))?.token },
          }
        );

        const res = await response.json();

        if (response.status == 401) {
          navigate('/start');
        }

        setQuizData(res);
      } catch (e) {
        alert(e.toString());
        return;
      }
    }

    fetchQuiz();
  }, []);
  
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
    setIsPlaying(false);
    setShowAnswer(true);
    
    // delays moving to next step by 3 seconds to show correct answer
    setTimeout(() => {
      if (gameObject.round < gameObject.q_and_a.length - 1) {
        setShowRanking(true);
        moveToNextQuestion();
      } else {
        setShowWinnersPodium(true);
      }
    }, 3000);
  };

  const moveToNextQuestion = () => {
    // setShowRanking(false);
    setIsPlaying(true);
    setShowAnswer(false);
  };

  return (
    <>
      {
      gameObject.round < gameObject.q_and_a.length &&
      (<div>
        <div className="timer-container">
          <TimerWithCircle
            onTimerEnd={handleTimerEnd}
            socket={socket}
          />
        </div>
        <div className="question-container">
          <h2 className="question-text">{gameObject.q_and_a[gameObject.round].question}</h2>
          <div className="answer-grid">
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
      </div>)
      }
    </>
  );
}

export default QuizQuestion;
