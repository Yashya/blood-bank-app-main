import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "../../assets/css/Donate.css";

const Donate = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [searchUsername, setSearchUsername] = useState('');
  const [searchResult, setSearchResult] = useState('');

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

    const handleSearch = () => {
        Axios.post('http://localhost:3001/searchUserId', {
            username: searchUsername,
          }).then((response) => {
            if (response.data.success) {
              setSearchResult(`User ID for ${searchUsername} is ${response.data.userId}`);
            } else {
              setSearchResult(`User ID not found for ${searchUsername}`);
            }
          }).catch((error) => {
            console.error(error);
            setSearchResult("Error in searching User ID.");
          });
        };
      

    return (
        
        <div className="donate container mx-auto p-4">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome to the VitalFlow Blood Center
</h1>
            <p className="text-lg">Join us in our mission to save lives through blood donation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registration Links */}
            <div>
                <Link to="/reg/usr">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
  Register as Donor/ Recipient
</button>
                </Link>
                <Link to="/reg/hospital">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Register Hospital
                    </button>
                </Link>
            </div>

            {/* Common Login Form */}
            <div className="common-login-form">
                <h2 className="text-2xl font-semibold mb-3">Login</h2>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                    type="button"
                    onClick={handleCommonLogin}
                >
                    Login
                </button>
                <p className="mt-2">{loginMessage}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
            <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={searchUserId}
                >
                    Search User ID
                </button>
                </div>

            {/* Additional Content */}
            <div className="col-span-2 mt-6">
                <h3 className="text-xl font-semibold mb-2">Why Donate Blood?</h3>
                <p className="mb-2">Blood donation is a simple act that can save lives. Every donation can help up to three people in need of blood. Join our community of donors and make a difference today.</p>
                
            </div>

        </div>
    </div>
);
};

export default Donate;
