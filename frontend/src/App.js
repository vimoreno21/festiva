// import React from 'react';
// import LoginPage from './pages/LoginPage';
// import StartPage from './pages/StartPage';
// function App()
// {
//   return (
//     <StartPage />
//   );
// }
// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Container fluid><StartPage /></Container>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
