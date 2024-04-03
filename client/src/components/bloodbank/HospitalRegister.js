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

    const handleChange = (e) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
    };

    const submitHospitalRegister = () => {
        const regUrl = 'http://localhost:3001/reg/hospital';
        Axios.post(regUrl, hospitalData).then((response) => {
            alert(response.data.message);
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
            </form>
        </div>
    );
};

export default HospitalRegister;
