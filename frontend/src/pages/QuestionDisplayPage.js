import React, { useEffect, useState } from "react";
import TimerWithCircle from "../components/TimerWithCircle";
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
  const [resetTimer, setResetTimer] = useState(false);
  const currentQuestion = temp[0].q_and_a[currentQuestionIndex];

  const handleTimerEnd = () => {
    setResetTimer(true);
    if (currentQuestionIndex < temp[0].q_and_a.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setResetTimer(false);
    }
  };

  return (
    <div className="questionDisplay-container">
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
              style={{ height: "3rem" }}
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
