import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import PickGamePage from './pages/PickGamePage';
import WaitPlayGame from './pages/WaitPlayGame';
import io from 'socket.io-client';
import { Container, Row, Col } from 'reactstrap';
import SocketIoMelTest from './pages/SocketIoMelTest';

const socket = io.connect("https://festiva-ucf-3a962394b6e7.herokuapp.com");
//const socket = io.connect("http://localhost:5000");
// console.log(socket)

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/pickgame" element={<PickGamePage />} />
          <Route path="/waitToPlayGame" element={<WaitPlayGame />} />

          {/* ignore this route im just using it for testing displaying socket stuff on frontend -melanie */}
          <Route path="/socketio" element={<SocketIoMelTest socket={socket}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
