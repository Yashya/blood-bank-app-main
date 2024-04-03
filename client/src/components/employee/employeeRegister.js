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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEmployeeRegister = () => {
    const regUrl = "http://localhost:3001/reg/emp";
    Axios.post(regUrl, formData).then((response) => {
      alert(response.data.message);
    });
  };

  return (
    <div className="emp-register">
      <h2>Employee Register</h2>
      <form className="empReg-form">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            type={key === "password" ? "password" : "text"}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="button" onClick={submitEmployeeRegister}>Register</button>
      </form>
    </div>
  );
};

export default EmployeeRegister;
