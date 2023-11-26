import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion";
import QuizRanking from "../components/QuizRanking";
import backgroundMusic from "../audio/hipjazz.mp3";
import AudioPlayer from "../components/AudioPlayer";
import { useLocation } from "react-router-dom";
import WinnersPodium from "../components/WinnersPodium";

/*
    Notes
    -  fix audio stuff
    - fix empty section on bottom of page
*/

function QuestionDisplayPage({ socket, icons }) {
  const [showRanking, setShowRanking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // for audio
  const [scores, setScores] = useState(null);
  const [showWinnersPodium, setShowWinnersPodium] = useState(false);

  const location = useLocation();
  const quiz = location.state?.quiz || {};
  const game = location.state?.game || {};
  const navigate = useNavigate();
  const [gameObject, setGameObject] = useState(game);

  useEffect(() => {
    socket.on("get-scores", (value) => {
      setScores(value);
    });
  }, [socket]);

  const handleExitButton = () => {
    // replaces history stack with the quizGameLibrary page
    navigate(-2, { replace: true });
    setIsPlaying(false);
  };

  const leftArrowIcon = (
    <FontAwesomeIcon
      icon={faArrowLeft}
      size="lg"
      style={{ color: "#f5695c" }}
    />
  );

  return (
    <div className="questionDisplay-container">
      <AudioPlayer src={backgroundMusic} isPlaying={isPlaying} />
      <div className="game-nav">
        <button className="exit-button" onClick={handleExitButton}>
          {leftArrowIcon} Exit
        </button>
        <span className="game-title">Quizoot</span>
      </div>
      {showWinnersPodium ? (
        <WinnersPodium scores={scores} icons={icons} />
      ) : showRanking ? (
        <QuizRanking
          setShowRanking={setShowRanking}
          setIsPlaying={setIsPlaying}
          gameObject={gameObject}
          setGameObject={setGameObject}
          scores={scores}
          setScores={setScores}
          socket={socket}
          icons={icons}
        />
      ) : (
        <QuizQuestion
          setShowRanking={setShowRanking}
          setIsPlaying={setIsPlaying}
          quiz={quiz}
          gameObject={gameObject}
          setShowWinnersPodium={setShowWinnersPodium}
          socket={socket}
        />
      )}
    </div>
  );
}

export default QuestionDisplayPage;
