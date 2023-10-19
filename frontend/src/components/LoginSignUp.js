import React, { useState } from 'react';

function LoginSignUp() {
    var loginEmail;
    var loginPassword;
  
    const [message,setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const togglePanel = () => {
        setIsSignUp(!isSignUp);
    };

    const doLogin = async (event) => {
        event.preventDefault();
        // Replace this with your desired login logic
        var obj = {email:loginEmail.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            // line below is missing path
            const response = await fetch('/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = await response.json();

            if ( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {email:res.email,_id:res._id}
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
        alert('doIt()'); // Replace this with your desired signup logic
    };

    return (
        <div> 
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={doSignup}>
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
