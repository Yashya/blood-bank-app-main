import React, { useState } from "react";
import Axios from "axios";

import "../../assets/css/UserLogin.css";

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [searchUsername, setSearchUsername] = useState("");
    const [userId, setUserId] = useState("");

    const userLoginCheck = () => {
        Axios.post("http://localhost:3001/login/usr", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                alert(response.data.message);
            } else {
                alert("Welcome!");
                window.location = "/login/usr/dash";
            }
        });
    };

    const searchUserId = () => {
        Axios.get(`http://localhost:3001/search/userid?userUserName=${searchUsername}`)
            .then((response) => {
                if (response.data.user_id) {
                    setUserId(`Your User ID is: ${response.data.user_id}`);
                } else {
                    setUserId(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                setUserId("Error in fetching User ID");
            });
    };

    return (
        <div className="user-login">
            <h2>User Login</h2>
            <form>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="button" onClick={userLoginCheck}>Submit</button>
            </form>
            <div className="forgot-userid">
                <input
                    type="text"
                    placeholder="Enter Username to find User ID"
                    onChange={(e) => setSearchUsername(e.target.value)}
                />
                <button onClick={searchUserId}>Search User ID</button>
                <p>{userId}</p>
            </div>
        </div>
    );
};

export default UserLogin;
