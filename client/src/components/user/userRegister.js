import React, { useState } from "react";
import Axios from "axios";

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
            <form>
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
                <button type="button" onClick={submitUserRegister}>REGISTER</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UserRegister;
