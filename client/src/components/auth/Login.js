import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div class="container">
            <form action="">
                <div class="login-form-container">
                    <h1>LOG IN</h1>
    
    
                    <div class="login-form">
                     <input type="text" placeholder="Username" name="username" id="username" required/>
                     <input type="password" placeholder="Password" name="pwd" id="pwd" required/>
                     <a id='login-link' href="#">Forgot Password?</a>
    
                     <button type="submit" class="loginbtn">LOGIN</button>
                   
    
                    <p>Don’t have an account? <Link to ="/Signup">Sign Up</Link>.</p>
                </div>
                </div>
            </form>
        </div>
        );
};

export default Login;
