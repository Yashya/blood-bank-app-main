import React, { useState } from "react";
import Axios from "axios";

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        date_of_birth: "",
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

    const validateForm = () => {
        // Check if the contact number is exactly 10 digits
        if (!/^\d{10}$/.test(formData.contact_number)) {
            setErrorMessage("Contact number must be exactly 10 digits.");
            return false;
        }

        // Check if the email address contains '@'
        if (!formData.email.includes("@")) {
            setErrorMessage("Email address must contain '@'.");
            return false;
        }

        return true;
    };

    const submitUserRegister = () => {
        // Validate the form data
        if (!validateForm()) {
            return;
        }

        Axios.post("http://localhost:3001/reg/usr", formData)
            .then((response) => {
                if (response.data.message) {
                    setErrorMessage(response.data.message);
                } else {
                    alert("User Registration Successful!");
                    setErrorMessage("");
                }
            })
            .catch((error) => {
                setErrorMessage("Error in registration: " + error.message);
            });
    };

    return (
        <div className="user-register">
            <h2>User Register</h2>
            <form>
                {Object.keys(formData).map((key) => {
                    if (key === "gender") {
                        return (
                            <div key={key}>
                                <label>Gender:</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                /> Male
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                /> Female
                            </div>
                        );
                    } else if (key === "blood_group") {
                        return (
                            <div key={key}>
                                <label>Blood Group:</label>
                                <select name="blood_group" onChange={handleChange}>
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
                    } else if (key === "date_of_birth") {
                        return (
                            <div key={key}>
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
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
                                placeholder={key.replace("_", " ").toUpperCase()}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            />
                        );
                    }
                })}
                <button type="button" onClick={submitUserRegister}>REGISTER</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UserRegister;
