import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
//import {io} from 'socket.io-client';
import {io} from 'socket.io-client/dist/socket.io';
import { Container, Row, Col } from 'reactstrap';
import SocketIoMelTest from './pages/SocketIoMelTest';

const socket = io.connect("https://festiva-ucf-3a962394b6e7.herokuapp.com");


function App() {
  return (
    <BrowserRouter>
    <NavBar fluid/>
      <Container fluid>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/start" element={<StartPage />} />
          {/* ignore this route im just using it for testing displaying socket stuff on frontend -melanie */}
          <Route path="/socketio" element={<SocketIoMelTest/>} socket={socket}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
