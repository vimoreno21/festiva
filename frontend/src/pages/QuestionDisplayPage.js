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
    - add avatars
*/

const temp_users = [
  {
    user_name: "Mel",
    user_avatar: require("../images/temporary_avatars/frog-transparent.gif"),
    points: 10,
  },
  {
    user_name: "Desa",
    user_avatar: require("../images/temporary_avatars/hedgehog-transparent.gif"),
    points: 0,
  },
  {
    user_name: "Hudaa",
    user_avatar: require("../images/temporary_avatars/parrot-transparent.gif"),
    points: 20,
  },
  {
    user_name: "Ricardo",
    user_avatar: require("../images/temporary_avatars/owl-transparent.gif"),
    points: 1000,
  },
  {
    user_name: "Arian",
    user_avatar: require("../images/temporary_avatars/walrus-transparent.gif"),
    points: 2,
  },
  {
    user_name: "Desa",
    user_avatar: require("../images/temporary_avatars/hedgehog-transparent.gif"),
    points: 0,
  },
  {
    user_name: "Desa",
    user_avatar: require("../images/temporary_avatars/hedgehog-transparent.gif"),
    points: 0,
  },
  {
    user_name: "Desa",
    user_avatar: require("../images/temporary_avatars/hedgehog-transparent.gif"),
    points: 0,
  },
  {
    user_name: "Desa",
    user_avatar: require("../images/temporary_avatars/hedgehog-transparent.gif"),
    points: 0,
  },
];

function QuestionDisplayPage({ socket }) {
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
        <WinnersPodium scores={scores} temp_users={temp_users} />
      ) : showRanking ? (
        <QuizRanking
          setShowRanking={setShowRanking}
          setIsPlaying={setIsPlaying}
          users={temp_users}
          gameObject={gameObject}
          setGameObject={setGameObject}
          scores={scores}
          setScores={setScores}
          socket={socket}
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
