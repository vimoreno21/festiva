import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import PickGamePage from './pages/PickGamePage';
import WaitPlayGame from './pages/WaitPlayGame';
import Socket2Page from './pages/Socket2Page';
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

          {/* represents web frontend */}
          <Route path="/socketio" element={<SocketIoMelTest socket={socket}/>} />

          {/* represents mobile frontend */}
          <Route path="/sockettwo" element={<Socket2Page socket={socket}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
