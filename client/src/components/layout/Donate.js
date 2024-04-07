import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "../../assets/css/Donate.css";

const Donate = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const handleCommonLogin = () => {
        Axios.post("http://localhost:3001/login/common", {
            username: username,
            password: password,
        }).then((response) => {
            setLoginMessage(response.data.message);
            if (response.data.success) {
                alert(`Welcome, ${response.data.role}!`);
                window.location.href = response.data.redirectUrl;
            }
        }).catch((error) => {
            console.log(error);
            setLoginMessage("Error in login process.");
        });
    };

    const searchUserId = () => {
        Axios.post("http://localhost:3001/searchUserId", {
            username: username,
        }).then((response) => {
            if (response.data.success) {
                setUserId(response.data.userId);
                alert(`User ID for ${username} is ${response.data.userId}`);
            } else {
                alert(`User ID not found for ${username}`);
            }
        }).catch((error) => {
            console.log(error);
            alert("Error in searching User ID.");
        });
    };

    return (
        <div className="donate">
            <Link to="/reg/usr">
                <button>REGISTER</button>
            </Link>
            <Link to="/reg/hospital">
                <button>REGISTER HOSPITAL</button>
            </Link>

            {/* Common Login Form */}
            <div className="common-login-form">
                <h2>Login</h2>
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
                <button type="button" onClick={handleCommonLogin}>
                    Login
                </button>
                <p>{loginMessage}</p>
            </div>

            {/* Search User ID Button */}
            <button type="button" onClick={searchUserId}>
                Search User ID
            </button>

            {/* Feedback Button */}
            <Link to="/feedback">
                <button>Feedback</button>
            </Link>
        </div>
    );
};

export default Donate;
