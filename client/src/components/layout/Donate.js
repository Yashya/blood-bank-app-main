import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import UserRegister from "../user/userRegister";
import UserLogin from "../user/userLogin";
import HospitalRegister from "../bloodbank/HospitalRegister"; 
import Feedback from "../bloodbank/Feedback"; 

//css
import "../../assets/css/Donate.css";

const Donate = () => {
  return (
    <div className="donate">
      <Link to="/reg/usr">
        <button>REGISTER</button>
      </Link>
      <Link to="/login/usr">
        <button>LOGIN</button>
      </Link>
      <Link to="/reg/hospital"> 
        <button>REGISTER HOSPITAL</button>
      </Link>

      <div className="feedback-button"> 
        <Link to="/feedback">
          <button>GIVE FEEDBACK</button>
        </Link>
      </div>

      <Routes>
        <Route path="/reg/usr" component={UserRegister} />
        <Route path="/login/usr" component={UserLogin} />
        <Route path="/reg/hospital" component={HospitalRegister} /> 
        <Route path="/reg/hospital" component={Feedback} /> 
      </Routes>
    </div>
  );
};

export default Donate;
