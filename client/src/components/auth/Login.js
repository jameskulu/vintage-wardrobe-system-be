import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container">
            <form action="">
                <div className="login-form-container">
                    <h1>LOG IN</h1>

                    <div className="login-form">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="email"
                            autoComplete="off"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="pwd"
                            id="pwd"
                            autoComplete="off"
                        />
                        <Link id="login-link" to="#">
                            Forgot Password?
                        </Link>

                        <button type="button" className="loginbtn">
                            LOGIN
                        </button>

                        <p>
                            Don’t have an account?{' '}
                            <Link to="/Signup">Sign Up</Link>.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
