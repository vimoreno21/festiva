import React, { useState } from 'react';

function LoginSignUp() {
    let loginEmail;
    let loginPassword;
    let signUpName;
    let signUpEmail;
    let signUpPassword;
  
    const [message,setMessage] = useState('');
    const [resultSignUp, setResultSignUp] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const togglePanel = () => {
        setIsSignUp(!isSignUp);
    };

    const doLogin = async (event) => {
        event.preventDefault();
        let obj = {email:loginEmail.value,password:loginPassword.value};
        let js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let res = await response.json();

            if ( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                let user = {email:res.email,_id:res._id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('we did it!');
                //window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };
    const doSignup = async (event) => {
        event.preventDefault();
        let obj = {name:signUpName.value,email:signUpEmail.value,password:signUpPassword.value};
        let jsonBody = JSON.stringify(obj);

        try
        {    
            const response = await fetch('/api/register',
                {method:'POST',body:jsonBody,headers:{'Content-Type': 'application/json'}});

            let res = await response.json();
            if ( res.message === "Created account successfully!" )
            {
                setResultSignUp('Created new user!');
            }
            else
            {
                setResultSignUp('Error creating account.');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return (
        <div> 
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={doSignup}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" ref={(c) => signUpName = c}/>
                        <input type="email" placeholder="Email" ref={(c) => signUpEmail = c}/>
                        <input type="password" placeholder="Password" ref={(c) => signUpPassword = c} />
                        <button type="submit">Sign Up</button>
                        <span id="signInResult">{resultSignUp}</span>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={doLogin}>
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" ref={(c) => loginEmail = c}/>
                        <input type="password" placeholder="Password" ref={(c) => loginPassword = c}/>
                        <p onClick={togglePanel}>Forgot your password?</p>
                        <button type="submit">Sign In</button>
                        <span id="loginResult">{message}</span>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className={`overlay-panel ${isSignUp ? 'overlay-left' : 'overlay-right'}`}>
                            {isSignUp ? (
                                <>
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="ghost" onClick={togglePanel} id="signIn">Sign In</button>
                                </>
                            ) : (
                                <>
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start the journey with us</p>
                                    <button className="ghost" onClick={togglePanel}id="signUp">Sign Up</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignUp;
