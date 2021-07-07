import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const userRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error('Two password fields did not match.');
        }

        try {
            const newUser = { firstName, lastName, email, password };
            await axios.post(
                'http://localhost:5000/api/users/register',
                newUser
            );

            history.push('/login');
            toast.success('Your account is created successfully.');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className="container">
            <form action="">
                <div className="form-container">
                    <h1>SIGN UP</h1>

                    <div className="form-sec">
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoComplete="off"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            autoComplete="off"
                        />

                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="off"
                        />

                        <div className="check-sec">
                            <input
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                            />
                            <p>
                                I agree all statement in{' '}
                                <Link id="terms" to="#">
                                    Terms of service
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="registerbtn"
                        onClick={userRegister}
                    >
                        SIGN UP
                    </button>

                    <p>
                        Already have an account?{' '}
                        <Link id="link-btn" to="/login">
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
