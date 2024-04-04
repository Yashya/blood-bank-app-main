import React, { useState } from "react";
import Axios from "axios";

import "../../assets/css/EmployeeRegister.css";

const EmployeeRegister = () => {
    const [formData, setFormData] = useState({
        empName: "",
        empMail: "",
        empPhone: "",
        empAddress: "",
        username: "",
        password: "",
        blood_group: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitEmployeeRegister = () => {
        const regUrl = "http://localhost:3001/reg/emp";
        Axios.post(regUrl, formData).then((response) => {
            if (response.data.message) {
                setErrorMessage(response.data.message);
            } else {
                alert("Employee Registration Successful!");
                setErrorMessage("");
                // Redirect to login page or dashboard
            }
        });
    };

    return (
        <div className="employee-register">
            <h2>Employee Register</h2>
            <form className="empReg-form">
                {Object.keys(formData).map((key) => (
                    <input
                        key={key}
                        name={key}
                        type={key === "password" ? "password" : "text"}
                        placeholder={key.replace("_", " ").toUpperCase()}
                        value={formData[key]}
                        onChange={handleChange}
                        required
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
                <button type="button" onClick={submitEmployeeRegister}>REGISTER</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default EmployeeRegister;
