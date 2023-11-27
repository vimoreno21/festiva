import React, { createContext, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import { User } from '@nextui-org/react';

function LoginSignUp() {
  let loginEmail;
  let loginPassword;
  let signUpName;
  let signUpEmail;
  let signUpPassword;
  let signUpPassword2;

  const [message, setMessage] = useState('');
  const [resultSignUp, setResultSignUp] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();




  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  // to use these function locally add http://localhost:5000 to before every /api
  const doLogin = async (event) => {


    setResultSignUp('');
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

      if (res.message === "Invalid Email or Password") {
        setMessage('User/Password combination incorrect');
        console.log("login signup no user")
      }
      else if (res.message === "An email has been sent to your account to verify. You must verify before logging in.") {
        setMessage('An email has been sent to your account to verify. You must verify before logging in.');
      }
      else {
        let user = { token: res.token, email: res.email, name:res.name, _id: res.id };
        console.log("inside loginsignup")
        localStorage.setItem('user_data', JSON.stringify(user));
        navigate('/pickgame')
      }
    } catch (e) {
      // alert(e.toString());
      return;
    }
  };

  const doSignup = async (event) => {
    event.preventDefault();
    let obj = {
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
      password2: signUpPassword2.value,
      verified: false,
      avatar: ''
    };
    let jsonBody = JSON.stringify(obj);

    if (signUpPassword2.value !== signUpPassword.value) {
      setResultSignUp('Passwords do not match.');
      return;
    }

    if (!isPasswordValid(obj.password)) {
      setResultSignUp('Password must meet complexity requirements: has one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: jsonBody,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = await response.json();
      if (res.message === 'Created account successfully! An Email has been sent to your account, please verify to login.') {
        setResultSignUp('Created account successfully! An Email has been sent to your account, please verify to login.');
      }
      else if (res.message === 'User already exists with email.') {
        setResultSignUp('User already exists with email.')
      }
      else {
        setResultSignUp('Error creating account.');
      }
    } catch (e) {
      // alert(e.toString());
      return;
    }
  };

  const doForgotPassword = async (event) => {
    navigate(ForgotPasswordPage);
  }

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container" style={{ border: '2px solid #8CD9E4', padding: 0, margin: 0, maxWidth: '85%' }}>
      <Row style={{ zIndex: 1 }}>
        <Col md={6} className="form-container sign-up-container" style={{ padding: 0, margin: 0, maxWidth: '50%' }}>
            <form onSubmit={doSignup}>
              <h1>Create Account</h1>
              <input type="text" className="form-control mt-3" placeholder="Name" ref={(c) => (signUpName = c)} />
              <input type="email" className="form-control mt-3" placeholder="Email" ref={(c) => (signUpEmail = c)} />
              <input type="password" className="form-control mt-3" placeholder="Password" ref={(c) => (signUpPassword = c)} />
              <input type="password" className="form-control mt-3" placeholder="Confirm Password" ref={(c) => (signUpPassword2 = c)} />
              <button className="button_style" type="submit">
                Sign Up
              </button>
              <span className="text-danger" id="signInResult">
                {resultSignUp}
              </span>
            </form>
        </Col>
        <Col md={6} className="form-container sign-in-container" style={{ padding: 0, margin: 0, maxWidth: '50%' }}>

            <form onSubmit={doLogin}>
              <h1>Sign in</h1>
              <input type="email" className="form-control mt-3" placeholder="Email" ref={(c) => (loginEmail = c)} />
              <input type="password" className="form-control mt-3" placeholder="Password" ref={(c) => (loginPassword = c)} />
              <Link to="/ForgotPasswordPage" style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}> Forgot Your Password?
              </Link>
              <button className="button_style" type="submit">
                Sign In
              </button>
              <span className="text-danger" id="loginResult">
                {message}
              </span>
            </form>
        </Col>
      </Row>
      <div className="overlay-container" style={{ zIndex: 0 }}>
        <div className="overlay">
          <div className={`overlay-panel ${isSignUp ? 'overlay-left' : 'overlay-right'}`}>
            {isSignUp ? (
              <>
                <h1>Welcome Back!</h1>
                <p>Already have an account? Please login with your personal info</p>
                <button className="button_style" onClick={() => { togglePanel(); setMessage(''); }} id="signIn">
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h1>Hello, Friend!</h1>
                <p>Don't have an account? Enter your personal details and start the journey with us</p>
                <button className="button_style" onClick={() => { togglePanel(); setResultSignUp(''); }} id="signUp">
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

// Add this function outside of your component
const isPasswordValid = (password) => {
  // Customize the password complexity requirements as needed
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasSpecialChar &&
    hasDigit
    // Add more complexity requirements if necessary
  );
};


export default LoginSignUp;
