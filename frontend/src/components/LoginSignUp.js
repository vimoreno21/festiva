import React, { useState } from 'react';

function LoginSignUp() {
    const [isSignUp, setIsSignUp] = useState(false);

    const togglePanel = () => {
        setIsSignUp(!isSignUp);
    };

    const doLogin = async (event) => {
        event.preventDefault();
        alert('doIt()'); // Replace this with your desired login logic
    };

    return (
        <div> 
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={doLogin}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={doLogin}>
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <p onClick={togglePanel}>Forgot your password?</p>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className={`overlay-panel ${isSignUp ? 'overlay-left' : 'overlay-right'}`}>
                            {isSignUp ? (
                                <>
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start the journey with us</p>
                                    <button className="ghost" onClick={togglePanel}id="signUp">Sign Up</button>
                                </>
                            ) : (
                                <>
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="ghost" onClick={togglePanel} id="signIn">Sign In</button>
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
