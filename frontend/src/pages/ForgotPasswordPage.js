
import React, { useState } from 'react';
import {Card, CardHeader, CardBody, Input, Button} from "@nextui-org/react";
import ForgotPasswordPage2 from './ForgotPasswordPage';
import { useNavigate, Link } from "react-router-dom";

function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);
    let signUpPassword;
    let signUpPassword2;

    const sendCode = () => {
        alert("You will receive a reset email if a user with that email exists.");
        setSent(true);
    };

    const doReset = async (event) => {
        alert("Password Reset!");


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
                    type="string"
                    color='primary'
                    label="Enter Your Email Address"
                    placeholder=""
                    labelPlacement="outside"
                    fullWidth
                    isClearable
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

                <Link to="/ForgotPasswordPage" onClick={()=> setSent(true)} style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    }}> Forgot Your Password? 
                </Link>
                <div style={{ marginBottom: '15px' }}/>

                <Button
                    className={" text-foreground border-default-200"}
                    color="primary"
                    radius="full"
                    size="lg"
                    variant="flat"
                    onPress={() => doReset()}
                    >
                    Reset Password
                </Button>
                </CardBody>
            </Card>
          )
          }
        </div>
        
    );
}

export default ForgotPasswordPage;