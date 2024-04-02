import React, { useState } from "react";
import Axios from "axios";

// CSS
import "../../assets/css/UserRegister.css";

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        date_of_birth_YYYY_MM_DD: "",
        role: "user", // Assuming default role is "user"
        gender: "",
        blood_group: "",
        contact_number: "",
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitUserRegister = () => {
        const regUrl = "http://localhost:3001/reg/usr";
        Axios.post(regUrl, formData).then((response) => {
            alert(response.data.message);
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
                        type="text"
                        placeholder={key.replace("_", " ")}
                        value={formData[key]}
                        onChange={handleChange}
                        required={key !== "role"}
                    />
                ))}
                <button type="button" onClick={submitUserRegister}>REGISTER</button>
            </form>
        </div>
    );
};

export default UserRegister;
