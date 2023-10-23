import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { Container, Row, Col } from 'reactstrap';
import SocketIoMelTest from './pages/SocketIoMelTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<StartPage/>}/>

        {/* ignore this route im just using it for testing displaying socket stuff on frontend -melanie */}
        <Route path="/socketio" element={<SocketIoMelTest/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
