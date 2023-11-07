import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
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
      console.log(res)

      if (res.message == "Invalid Email or Password") {
        setMessage('User/Password combination incorrect');
        console.log("login signup no user")
      } 
      else if (res.message == "An email has been sent to your account to verify. You must verify before logging in.")
      {
        setMessage('An email has been sent to your account to verify. You must verify before logging in.');
      }
      else {
        let user = { email: res.email, name:res.name, _id: res.id };
        console.log("inside loginsignup")
        localStorage.setItem('user_data', JSON.stringify(user));
        navigate('/pickgame')
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

  const doRegisterVerify = async (event) => {

    try {
      const response = await fetch('/api/registerVerification/:id/verify/:token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      let res = await response.json();
      if (res.message === 'Account verified successfully! You may close this window and log in.') {
        setResultSignUp('Account verified successfully! You may close this window and log in.');
      } else {
        setResultSignUp('Error Verifying account.');
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container" style={{ border: '2px solid #8CD9E4', padding: 0, margin: 0,  maxWidth: '85%'}}>
        <Row style={{ zIndex: 1 }}>
          <Col md={6} className="form-container sign-up-container" style={{ padding: 0, margin: 0, maxWidth: '50%'}}>
            <form onSubmit={doSignup}>
              <h1>Create Account</h1>
              <input type="text" className="form-control mt-3" placeholder="Name" ref={(c) => (signUpName = c)} />
              <input type="email" className="form-control mt-3" placeholder="Email" ref={(c) => (signUpEmail = c)} />
              <input type="password" className="form-control mt-3" placeholder="Password" ref={(c) => (signUpPassword = c)} />
              <button className="button_style" type="submit">
                Sign Up
              </button>
              <span className="text-danger" id="signInResult">
                {resultSignUp}
              </span>
            </form>
          </Col>
          <Col md={6} className="form-container sign-in-container" style={{padding: 0, margin: 0, maxWidth: '50%'}}>
            <form onSubmit={doLogin}>
              <h1>Sign in</h1>
              <input type="email" className="form-control mt-3" placeholder="Email" ref={(c) => (loginEmail = c)} />
              <input type="password" className="form-control mt-3" placeholder="Password" ref={(c) => (loginPassword = c)} />
              <p onClick={togglePanel} className='mt-3'>Forgot your password?</p>
              <button className="button_style" type="submit">
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
                  <p>Already have an account? Please login with your personal info</p>
                  <button className="button_style" onClick={togglePanel} id="signIn">
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <h1>Hello, Friend!</h1>
                  <p>Don't have an account? </p>
                  <p>Enter your personal details and start the journey with us</p>
                  <button className="button_style" onClick={togglePanel} id="signUp">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginSignUp;
