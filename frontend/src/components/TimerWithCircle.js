import React, { useState, useEffect } from "react";

function TimerWithCircle({ duration, onTimerEnd, resetTimer, setResetTimer }) {
  const [timer, setTimer] = useState(duration);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(timerInterval);
        onTimerEnd();
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, duration, onTimerEnd]);

  useEffect(() => {
    if (resetTimer) {
      setTimer(duration);
      setResetTimer(false);
    }
  }, [resetTimer, duration, setResetTimer]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Calculate strokeDasharray based on the timer
  const strokeDasharray = `${
    (timer / duration) * circumference
  } ${circumference}`;

  return (
    <div>
      <svg width="200" height="200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#ccc"
          strokeWidth="10"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#8CD9E4"
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
        />
        <text x="100" y="110" textAnchor="middle" fontSize="20" fill="#000">
          {timer}
        </text>
      </svg>
    </div>
  );
}

export default TimerWithCircle;
