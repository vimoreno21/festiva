import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion";
import QuizRanking from "../components/QuizRanking";
import backgroundMusic from "../audio/hipjazz.mp3";
import AudioPlayer from "../components/AudioPlayer";

/*
    Notes
    - navigate to rankings
    - once all questions end navigate to leaderboard
    - once all users pick their answers we can move on to the next question without waiting for timer to end
    - if deemed necessary, fix timer so that it can play on reload and it stops playing when we go to previous page
    - make text responsive or add word count
    - fix empty section on bottom of page
    - change quiz_name so its passed on from game library page
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

function QuestionDisplayPage() {
  const [showRanking, setShowRanking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // for audio

  const navigate = useNavigate();

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
      {showRanking ? (
        <QuizRanking
          setShowRanking={setShowRanking}
          setIsPlaying={setIsPlaying}
          users={temp_users}
        />
      ) : (
        <QuizQuestion
          setShowRanking={setShowRanking}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}

export default QuestionDisplayPage;
