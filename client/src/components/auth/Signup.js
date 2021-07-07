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
    <div>
        this is Signup page...
     </div>
  );
};

export default Signup;
