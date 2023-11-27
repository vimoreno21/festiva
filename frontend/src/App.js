import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GlobalNavBar from "./components/GlobalNavBar";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PickGamePage from "./pages/PickGamePage";
import WaitPlayGame from "./pages/WaitPlayGame";
import Socket2Page from './pages/Socket2Page';
import io from "socket.io-client";
import SocketIoMelTest from "./pages/SocketIoMelTest";
import QuestionDisplayPage from "./pages/QuestionDisplayPage";
import QuizGameLibraryPage from "./pages/QuizGameLibraryPage";
import EmailVerify from "./components/EmailVerify/index";
import CreateGame from "./pages/CreateGame";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GlobalNavBar2 from "./components/GlobalNavBarTwo";

const socket = io.connect("https://festiva-ucf-3a962394b6e7.herokuapp.com");
//const socket = io.connect("http://localhost:5000");
// console.log(socket)


function App() {

  const icons = {
    frog: '/avatars/frog.gif',
    hedgehog: '/avatars/hedgehog.gif',
    owl: '/avatars/owl.gif',
    parrot: '/avatars/parrot.gif',
    walrus: '/avatars/walrus.gif',
    snake: '/avatars/snake.gif',
    whale: '/avatars/whale.gif',
    platypus: '/avatars/platypus.gif',
    sloth: '/avatars/sloth.gif',
    chicken: '/avatars/chicken.gif',
    squid: '/avatars/squid.gif',
    spider: '/avatars/spider.gif',
    giraffe: '/avatars/giraffe.gif',
    panda: '/avatars/panda.gif'
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with navbar */}
        <Route
          path="/*"
          element={
            <div>
              <GlobalNavBar />
              {/* <GlobalNavBar2/> */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/start" element={<StartPage />} />
                <Route path="/pickgame" element={<PickGamePage />} />
                <Route path="/waitToPlayGame" element={<WaitPlayGame socket={socket} icons={icons}/>} />
                <Route path="/api/registerVerification/:id/verify/:token" element={<EmailVerify />} />
                <Route path="/quizGameLibrary" element={<QuizGameLibraryPage />} />
                <Route path="/CreateGame" element={<CreateGame />} />
                <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage/>} />
                {/* represents web frontend */}
                <Route path="/socketio" element={<SocketIoMelTest socket={socket} icons={icons} />} />
                {/* represents mobile frontend */}
                <Route path="/sockettwo" element={<Socket2Page socket={socket} icons={icons} />} />
              </Routes>
            </div>
          }
        />
        {/* Route without navbar */}
        <Route path="/questionDisplay" element={<QuestionDisplayPage socket={socket} icons={icons}/>} />
        <Route path="/quizGameLibrary" element={<QuizGameLibraryPage socket={socket}/>} />
        <Route path="/CreateGame" element={<CreateGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
