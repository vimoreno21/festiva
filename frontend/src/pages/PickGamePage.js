import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// not responsive yet
const PickGamePage = () => {
  const navigate = useNavigate();

  const [game, setGame] = useState("");
  const onClickGame = () => {
    setGame(game);
  };

  const onPlayGame = () => {
    if (game) {
      if (game === "Fill in the Blank") {
        navigate("/waitToPlayGame");
      }
    }
  };

  return (
    <>
      <div className="pick_game_style">
        <div className="flex flex-col md:flex-row justify-around">
          <div className="md:w-50 div_style flex flex-col">
            <p className="fs-2 fw-bold">
              {" "}
               Step 1: Pick A Game
            </p>
            <div className="border border-dark p-4 ms-4">
              <p className="fw-normal fs-5 ">
                Get ready to quiz your way to a good time! Our game is all about
                the joy of quizzing, whether you're chilling with friends on a
                weekend, spicing up a family gathering, or even impressing your
                coworkers during a team-building session.
              </p>

              <p className="fw-normal fs-5">
                Who knows, you might just discover that the quietest person in
                the room is a quizmaster in disguise! It's the ultimate
                ice-breaker for parties, a great way to settle friendly debates.
              </p>
              <p className="fw-bold fs-5">
                Get ready to for some quiz showdowns!
              </p>
            </div>
          </div>
          <div className="md:w-50 div_style flex flex-col">
            <div className="w-75 h-100 set_back fs-3 rounded text-center justify-content-center flex">
              <button
                value={game}
                onClick={onClickGame}
                className="button_style border h-25 border-light set_color text-nowrap fs-5"
              >
                Quizoot
              </button>
            </div>
            <Link
              to="/quizGameLibrary"
              onClick={onPlayGame}
              className="button_style2 w-50 text-decoration-none"
            >
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickGamePage;
