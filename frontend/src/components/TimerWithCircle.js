import React, { useEffect, useState } from "react";

function TimerWithCircle({ onTimerEnd, socket }) {
  const [countDown, setCountDown] = useState(15);

  useEffect(() => {
      socket.on("count-down", (count) => {
        setCountDown(count);
      });

      console.log("Countdown:", countDown);

      if (countDown === "Time is up!") {
        console.log("Calling onTimerEnd()");
        onTimerEnd();
      }
  }, [socket, countDown, onTimerEnd]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // Calculate strokeDasharray based on the countdown
  const strokeDasharray = `${
    (countDown / 15) * circumference
  } ${circumference}`;

  return (
    <div>
      <svg width="200" height="160">
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
          {countDown}
        </text>
      </svg>
    </div>
  );
}

export default TimerWithCircle;
