import React, { useState } from "react";
import Axios from "axios";

// CSS
import "../../assets/css/UserRegister.css";

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        date_of_birth: "",
        role: "user", 
        gender: "",
        blood_group: "",
        contact_number: "",
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitUserRegister = () => {
        const regUrl = "http://localhost:3001/reg/usr";
        Axios.post(regUrl, formData).then((response) => {
            if (response.data.message) {
                setErrorMessage(response.data.message);
            } else {
                alert("User Registration Successful!");
                setErrorMessage("");
                
            }
        });
    };

    return (
        <div className="user-register">
            <h2>User Register</h2>
            <form className="userReg-form">
                {Object.keys(formData).map((key) => (
                    <input
                        key={key}
                        name={key}
                        type={key === "password" ? "password" : "text"}
                        placeholder={key.replace("_", " ").toUpperCase()}
                        value={formData[key]}
                        onChange={handleChange}
                        required={key !== "role"}
                    />
                ))}
                <select name="blood_group" value={formData.blood_group} onChange={handleChange} required>
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <button type="button" onClick={submitUserRegister}>REGISTER</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UserRegister;
