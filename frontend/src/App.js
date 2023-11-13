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


const socket = io.connect("https://festiva-ucf-3a962394b6e7.herokuapp.com");
//const socket = io.connect("http://localhost:5000");



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {" "}
        {/* Routes without navbar */}
        <Route path="/questionDisplay" element={<QuestionDisplayPage />} />
      </Routes>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/pickgame" element={<PickGamePage />} />
        <Route path="/waitToPlayGame" element={<WaitPlayGame socket={socket}/>} />
        <Route
          path="/api/registerVerification/:id/verify/:token"
          element={<EmailVerify />}
        />
        <Route path="/questionDisplay" element={<QuestionDisplayPage />} />
        <Route path="/quizGameLibrary" element={<QuizGameLibraryPage />} />
        <Route path="/CreateGame" element={<CreateGame />} />

          {/* represents web frontend */}
          <Route path="/socketio" element={<SocketIoMelTest socket={socket}/>} />

          {/* represents mobile frontend */}
          <Route path="/sockettwo" element={<Socket2Page socket={socket}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
