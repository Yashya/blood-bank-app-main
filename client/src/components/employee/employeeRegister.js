import React, { useState } from "react";
import Axios from "axios";

const EmployeeRegister = () => {
    const [formData, setFormData] = useState({
        empName: "",
        empMail: "",
        empPhone: "",
        empAddress: "",
        empDOB: "",
        empGender: "",
        empBloodGroup: "",
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Check if the contact number is exactly 10 digits
        if (!/^\d{10}$/.test(formData.empPhone)) {
            setErrorMessage("Contact number must be exactly 10 digits.");
            return false;
        }

        // Check if the email address contains '@'
        if (!formData.empMail.includes("@")) {
            setErrorMessage("Email address must contain '@'.");
            return false;
        }

        return true;
    };

    const submitEmployeeRegister = () => {
        // Validate the form data
        if (!validateForm()) {
            return;
        }

        Axios.post("http://localhost:3001/reg/emp", formData)
            .then((response) => {
                if (response.data.message) {
                    setErrorMessage(response.data.message);
                } else {
                    alert("Employee Registration Successful!");
                    setErrorMessage("");
                }
            })
            .catch((error) => {
                setErrorMessage("Error in registration: " + error.message);
            });
    };

    return (
        <div className="employee-register">
            <h2>Employee Register</h2>
            <form>
                {Object.keys(formData).map((key) => {
                    if (key === "empGender") {
                        return (
                            <div key={key}>
                                <label>Gender:</label>
                                <input
                                    type="radio"
                                    name="empGender"
                                    value="Male"
                                    onChange={handleChange}
                                /> Male
                                <input
                                    type="radio"
                                    name="empGender"
                                    value="Female"
                                    onChange={handleChange}
                                /> Female
                            </div>
                        );
                    } else if (key === "empBloodGroup") {
                        return (
                            <div key={key}>
                                <label>Blood Group:</label>
                                <select name="empBloodGroup" onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        );
                    } else if (key === "empDOB") {
                        return (
                            <div key={key}>
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    name="empDOB"
                                    value={formData.empDOB}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        );
                    } else {
                        return (
                            <input
                                key={key}
                                name={key}
                                type={key === "password" ? "password" : "text"}
                                placeholder={key.replace("emp", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            />
                        );
                    }
                })}
                <button type="button" onClick={submitEmployeeRegister}>REGISTER</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default EmployeeRegister;
