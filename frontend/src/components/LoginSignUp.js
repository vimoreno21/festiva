import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";

function LoginSignUp() {
  let loginEmail;
  let loginPassword;
  let signUpName;
  let signUpEmail;
  let signUpPassword;

  const [message, setMessage] = useState('');
  const [resultSignUp, setResultSignUp] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const doLogin = async (event) => {
    event.preventDefault();
    let obj = { email: loginEmail.value, password: loginPassword.value };
    let js = JSON.stringify(obj);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = await response.json();

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        let user = { email: res.email, _id: res._id };
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('we did it!');
        navigate('/pickgame')

        // window.location.href = '/cards';
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const doSignup = async (event) => {
    event.preventDefault();
    let obj = {
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
      verified: false,
      avatar: ''
    };
    let jsonBody = JSON.stringify(obj);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: jsonBody,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = await response.json();
      if (res.message === 'Created account successfully! An Email has been sent to your account, please verify to login.') {
        setResultSignUp('Created account successfully! An Email has been sent to your account, please verify to login.');
      } else {
        setResultSignUp('Error creating account.');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    // <Container style={{  backgroundColor: 'transparent', border: 'none', maxWidth: '768px', padding: 0, margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', border: '2px solid blue',  width: '100%'}}>
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container" style={{backgroundColor: 'lightgreen', border: '2px solid green',  padding: 0, margin: 0,  maxWidth: '90%'}}>
        <Row style={{ zIndex: 1 }}>
          <Col md={6} className="form-container sign-up-container" style={{backgroundColor: 'pink', border: '2px solid pink', padding: 0, margin: 0, maxWidth: '50%'}}>
            <form onSubmit={doSignup}>
              <h1>Create Account</h1>
              <input type="text" className="form-control mt-3" placeholder="Name" ref={(c) => (signUpName = c)} />
              <input type="email" className="form-control mt-3" placeholder="Email" ref={(c) => (signUpEmail = c)} />
              <input type="password" className="form-control mt-3" placeholder="Password" ref={(c) => (signUpPassword = c)} />
              <button className="btn btn-primary mt-3" type="submit">
                Sign Up
              </button>
              <span className="text-danger" id="signInResult">
                {resultSignUp}
              </span>
            </form>
          </Col>
          <Col md={6} className="form-container sign-in-container" style={{backgroundColor: 'purple', border: '2px solid purple', padding: 0, margin: 0, maxWidth: '50%'}}>
            <form onSubmit={doLogin}>
              <h1>Sign in</h1>
              <input type="email" className="form-control mt-3" placeholder="Email" ref={(c) => (loginEmail = c)} />
              <input type="password" className="form-control mt-3" placeholder="Password" ref={(c) => (loginPassword = c)} />
              <p onClick={togglePanel} className='mt-3'>Forgot your password?</p>
              <button className="btn btn-primary mt-3" type="submit">
                Sign In
              </button>
              <span className="text-danger" id="loginResult">
                {message}
              </span>
            </form>
          </Col>
        </Row>
        <div className="overlay-container" style={{zIndex: 0}}>
          <div className="overlay">
            <div className={`overlay-panel ${isSignUp ? 'overlay-left' : 'overlay-right'}`}>
              {isSignUp ? (
                <>
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="btn btn-secondary ghost mt-5" onClick={togglePanel} id="signIn">
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start the journey with us</p>
                  <button className="btn btn-secondary ghost mt-5" onClick={togglePanel} id="signUp">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    // </Container>
  );
}

export default LoginSignUp;
