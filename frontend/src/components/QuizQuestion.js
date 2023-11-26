import React, { useEffect, useState } from "react";
import TimerWithCircle from "../components/TimerWithCircle";
import { useNavigate } from "react-router-dom";

function QuizQuestion({ setShowRanking, setIsPlaying}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  // Check if quizData is empty or currentQuestionIndex is out of bounds (usually because it hasn't loaded yet)
  if (
    quizData.length === 0 ||
    currentQuestionIndex >= quizData[0].q_and_a.length
  ) {
    return <p className="message">Loading...</p>;
  }

  const currentQuestion = quizData[0].q_and_a[currentQuestionIndex];

  // returns the className for the correct answer choice if correct and vice versa
  function getButtonClass(answer) {
    if (showAnswer)
      if (currentQuestion.correct_answer === answer) return "correct-answer";
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
    if (currentQuestionIndex < quizData[0].q_and_a.length - 1) {
      setShowAnswer(true);
      setIsPlaying(false);

      // delays moving to next step by 3 seconds to show correct answer
      setTimeout(() => {
        setShowRanking(true);
        moveToNextQuestion();
      }, 3000);
    } else {
      setResetTimer(false);
      setIsPlaying(false);
    }
  };

  // Handles moving to the next question
  const moveToNextQuestion = () => {
    setIsPlaying(true);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setResetTimer(true);
    setShowAnswer(false);
  };

  return (
    <>
      <div className="timer-container">
        <TimerWithCircle
          duration={5}
          onTimerEnd={handleTimerEnd}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
        />
      </div>
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.question}</h2>
        <div className="answer-grid">
          {currentQuestion.answers.map((answer, answerIndex) => (
            <button
              key={answerIndex}
              className={`answer-button ${getButtonClass(answer)}`}
              style={{ backgroundColor: getBackgroundColor(answerIndex) }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button onClick={handleTimerEnd} className="temp">
          skip question (temporary)
        </button>
      </div>
    </>
  );
}

export default QuizQuestion;
