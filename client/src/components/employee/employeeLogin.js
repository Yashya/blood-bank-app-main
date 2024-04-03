import React, { useState } from "react";
import Axios from "axios";

import "../../assets/css/EmployeeLogin.css";

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = () => {
    Axios.post("http://localhost:3001/login/emp", {
      username: username,
      password: password,
    })
    .then((response) => {
      setLoginMessage(response.data.message);
      if (response.data.message === "Login successful!") {
        window.location.href = "/login/emp/dash";
      }
    })
    .catch((error) => {
      console.log(error);
      setLoginMessage("Error in login process.");
    });
  };

  return (
    <div className="employee-login">
      <h2>Employee Login</h2>
      <form>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>{loginMessage}</p>
      </form>
    </div>
  );
};

export default EmployeeLogin;
