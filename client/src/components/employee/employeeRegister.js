import React, { useState } from "react";
import Axios from "axios";

const EmployeeRegister = () => {
    const [formData, setFormData] = useState({
        empName: "",
        empMail: "",
        empPhone: "",
        empAddress: "",
        username: "",
        password: ""
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
            }
        });
    };

    return (
        <div className="employee-register">
            <h2>Employee Register</h2>
            <form>
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
                <button type="button" onClick={submitEmployeeRegister}>REGISTER</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default EmployeeRegister;
