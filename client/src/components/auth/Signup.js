import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const userRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { firstName, lastName, email, password };
      await axios.post("http://localhost:5000/api/users/register", newUser);

      history.push("/login");
      //   toast.success("Your account is created successfully.");
    } catch (err) {
      //   toast.error(err.response.data.msg);
    }
  };

  return (
    <div class="container">
      <form action="/action_page.php">
        <div class="form-container">
          <h1>SIGN UP</h1>

          <div class="form-sec">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div class="check-sec">
              <input type="checkbox" id="checkbox" name="checkbox" />
              <p>
                I agree all statement in{" "}
                <a id="terms" href="#">
                  Terms of service
                </a>
                .
              </p>
            </div>
          </div>
          <button type="submit" class="registerbtn" onClick ={userRegister}>
            SIGN UP
          </button>

          <p>
            Already have an account?{" "}
            <a id="link-btn" href="/login">
              Login
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
