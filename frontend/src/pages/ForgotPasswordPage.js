
import React, { useState } from 'react';
import {Card, CardHeader, CardBody, Input, Button} from "@nextui-org/react";
import ForgotPasswordPage2 from './ForgotPasswordPage';
import { useNavigate, Link } from "react-router-dom";

function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);
    const [resultSignUp, setResultSignUp] = useState('');
    const [resultEmail, setResultEmail] = useState('');
    let signUpPassword;
    let signUpPassword2;
    let email;
    let code;

    const sendCode = async (event) => {
        // alert("You will receive a reset email if a user with that email exists.");
        setResultEmail("You will receive a reset email if a user with that email exists.");
        setSent(true);

        let obj = {
            email: email.value,
        };
        let jsonBody = JSON.stringify(obj);

        try {
            const response = await fetch('/api/sendPasswordRecovery', {
                method: 'POST',
                body: jsonBody,
                headers: { 'Content-Type': 'application/json' },
            });

            let res = await response.json();
            if (res.message === 'User does not exist.') {
                console.log("User does not exist.");
            } 
            else if (res.message === 'Password recovery email sent.') {
                console.log('Password recovery email sent.');
            }
            else {
                console.log('Error sending email.');
            }
        } catch (e) {
            return;
        }
    };

    const doReset = async (event) => {
        
        if (signUpPassword.value !== signUpPassword2.value)
        {
            setResultSignUp('Passwords do not match.');
            return;
        }
    
        if (!isPasswordValid(signUpPassword.value)) {
            setResultSignUp('Password must meet complexity requirements.');
            return;
        }
        
        let obj = {
            pin: code.value,
            email: 'email',
            password: signUpPassword.value,
            password2: signUpPassword2.value
        };
        
        let jsonBody2 = JSON.stringify(obj);
    
        try {
        const response = await fetch('/api/resetPassword', {
            method: 'POST',
            body: jsonBody2,
            headers: { 'Content-Type': 'application/json' },
        });
    
        let res = await response.json();
        if (res.message === 'Password reset successfully! You may now login.') {
            setResultSignUp('Password reset successfully! You may now login.');
        } 
        else if (res.message === 'Error resetting password') {
            setResultSignUp('Error resetting password')
        }
        else {
            setResultSignUp('Error resetting password...');
        }
        } catch (e) {
            return;
        }
        // alert("Password Reset!");
    };

    return(
        
        <div className="forgot_pass_div container-p" > 

          { !sent && (
            <Card className="game-card max-w-[500px]" > 
              
                <CardHeader style={{fontSize:'30px'}}>
                    Email Address
                </CardHeader>
                <CardBody >
                <Input
                    size="lg"
                    key='email'
                    type="email"
                    color='primary'
                    label="Enter Your Email Address"
                    placeholder=""
                    labelPlacement="outside"
                    fullWidth
                    ref={(c) => (email = c)}
                />
                <div style={{ marginBottom: '25px' }}/>
                <Button
                    className={" text-foreground border-default-200"}
                    color="primary"
                    radius="full"
                    size="lg"
                    variant="flat"
                    onPress={() => sendCode()}
                    >
                    Send Reset Code
                </Button>
                </CardBody>
            </Card>
          )}


          {sent && (
            <Card className="game-card max-w-[500px]" > 
                <CardHeader style={{fontSize:'30px'}}>
                    Reset Your Password
                </CardHeader>
                <span className="text-danger" id="emailResult">
                    {resultEmail}
                </span>
                <CardBody >
                <Input
                    size="lg"
                    key='number'
                    type="string"
                    color='primary'
                    label="Enter the code recieved by email"
                    placeholder=""
                    labelPlacement="outside"
                    fullWidth
                    ref={(c) => (code = c)}
                />
                <div style={{ marginBottom: '15px' }}/>

                <Input
                    size="lg"
                    key='password'
                    type="password"
                    color='primary'
                    label="Enter New Password"
                    placeholder=""
                    labelPlacement="outside"
                    fullWidth
                    ref={(c) => (signUpPassword = c)}
                />
                <div style={{ marginBottom: '15px' }}/>

                <Input
                    size="lg"
                    key='passwordConfirm'
                    type="password"
                    color='primary'
                    label="Confirm Password"
                    placeholder=""
                    labelPlacement="outside"
                    fullWidth
                    ref={(c) => (signUpPassword2 = c)}
                />
                <div style={{ marginBottom: '15px' }}/>

                <Link to="/ForgotPasswordPage" onClick={()=> setSent(false)} style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    }}> Resend Email Code? 
                </Link>
                <div style={{ marginBottom: '15px' }}/>

                <Button
                    className={" text-foreground border-default-200"}
                    color="primary"
                    radius="full"
                    size="lg"
                    variant="flat"
                    onClick={doReset}
                    >
                    Reset Password
                </Button>
                <div style={{ marginBottom: '15px' }}/>
                <span className="text-danger" id="signInResult">
                    {resultSignUp}
                </span>
                </CardBody>
            </Card>
          )
          }
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
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit
      // Add more complexity requirements if necessary
    );
};

export default ForgotPasswordPage;