import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getUserInfo } from "../actions/currentUser";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const WaitPlayGame = ({ socket, icons }) => {
  const location = useLocation();
  const quiz = location.state?.quiz || {};
  const initial_game = location.state?.game || {};
  const navigate = useNavigate();

  const [gameOn, setGameOn] = useState(false);
  const [game, setGame] = useState(initial_game);

  useEffect(() => {
    socket.on("receieve-users", (newUsers) => {
      setGame((prev) => ({ ...prev, users: newUsers }));
    });
  }, [socket]);

  return (
    <div className="wait_play_style container-p">
      <Breadcrumbs size="md">
        // <BreadcrumbItem href="/pickgame">Choose Game</BreadcrumbItem>
        <BreadcrumbItem href="/quizGameLibrary">Pick Quizoot</BreadcrumbItem>
        <BreadcrumbItem>Play Game</BreadcrumbItem>
      </Breadcrumbs>
      <div className="d-flex flex-col align-items-center" style={{minHeight:"100vh"}}>
        <div className="div_style mx-5 flex flex-col md:flex-row justify-content-around text-nowrap text-center">
          <p className="fs-1 fw-normal me-1">Playing:</p>
          <p className="fw-bold fs-1">{quiz.quiz_name}</p>
          <span className="mt-5 mx-5"></span>
          <p className="fs-1 fw-normal me-1">Game Code: </p>
          <p className="fw-bold fs-1 mr-5">{initial_game.id}</p>
        </div>
        <p className="fs-1 fw-normal mt-5">Players:</p>
        <div className="waiting-area">
          <ul>
            {Object.keys(game.users)?.map((u) => {
              return (
                <li key={u}>
                  {game.users[u].nickname}{" "}
                  <img
                    src={icons[game.users[u].icon]}
                    alt="icon"
                    className="img_sizing"
                    style={{
                      display: "inline-block",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <button
          style={{ backgroundColor: "green", borderColor: "none" }}
          onClick={() => {
            // console.log(game)
            socket.emit("start-round", game);
            setGameOn(true);
            navigate("/QuestionDisplay", { state: { quiz, game } });
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default WaitPlayGame;
