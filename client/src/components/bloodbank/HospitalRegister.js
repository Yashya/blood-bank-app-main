import React, { useState } from 'react';
import Axios from 'axios';

import '../../assets/css/HospitalRegister.css';

const HospitalRegister = () => {
    const [hospitalData, setHospitalData] = useState({
        name: '',
        contact_number: '',
        email: '',
        address: '',
        username: '', 
        password: ''  
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Check if the contact number is exactly 10 digits
        if (!/^\d{10}$/.test(hospitalData.contact_number)) {
            setErrorMessage("Contact number must be exactly 10 digits.");
            return false;
        }

        // Check if the email address contains '@'
        if (!hospitalData.email.includes("@")) {
            setErrorMessage("Email address must contain '@'.");
            return false;
        }

        return true;
    };

    const submitHospitalRegister = () => {
        // Validate the form data
        if (!validateForm()) {
            return;
        }

        Axios.post('http://localhost:3001/reg/hospital', hospitalData).then((response) => {
            if (response.data.message) {
                setErrorMessage(response.data.message);
            } else {
                alert("Hospital Registration Successful!");
                setErrorMessage("");
            }
        });
    };

    return (
        <div className='hospital-register'>
            <h2>Hospital Register</h2>
            <form className='hospitalReg-form'>
                {Object.keys(hospitalData).map((key) => (
                    <input
                        key={key}
                        name={key}
                        type={key === 'password' ? 'password' : 'text'}
                        placeholder={key.replace('_', ' ')}
                        value={hospitalData[key]}
                        onChange={handleChange}
                        required
                    />
                ))}
                <button type='button' onClick={submitHospitalRegister}>REGISTER</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default HospitalRegister;
