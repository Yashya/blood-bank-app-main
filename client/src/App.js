import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import UserLogin from "./components/user/userLogin";
import UserRegister from "./components/user/userRegister";
import EmployeeLogin from "./components/employee/employeeLogin";
import EmployeRegister from "./components/employee/employeeRegister";
import UserDashboard from "./components/user/UserDashboard";
import EmpDashboard from "./components/employee/EmpDarshboard";
import Donate from "./components/layout/Donate";
import Feedback from "./components/bloodbank/Feedback";
import HospitalRegister from "./components/bloodbank/HospitalRegister";
import BloodRequest from "./components/user/BloodRequest";
import DonateBlood from "./components/user/DonateBlood";
import PaymentGateway from "./components/bloodbank/PaymentGateway";
import HospitalDashboard from "./components/layout/HospitalDashboard";
import BloodStock from "./components/employee/BloodStock";
//css
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/home" element={<Dashboard />} />
        <Route exact path="/donate/" element={<Donate />} />
        <Route exact path="/login/usr" element={<UserLogin />} />
        <Route exact path="/login/emp" element={<EmployeeLogin />} />
        <Route exact path="/reg/usr" element={<UserRegister />} />
        <Route exact path="/reg/emp" element={<EmployeRegister />} />
        <Route exact path="/login/usr/dash" element={<UserDashboard />} />
        <Route exact path="/login/emp/dash" element={<EmpDashboard />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/reg/hospital" element={<HospitalRegister />} />
        <Route exact path="/request" element={<BloodRequest/>}/>
        <Route exact path="/donateBlood" element={<DonateBlood/>}/>
        <Route exact path="/makePayment" element={<PaymentGateway/>}/>
        <Route exact path="/login/hospital/dash" element={<HospitalDashboard/>}/>
        <Route exact path="/view/blood-stock" element={<BloodStock/>}/>
      </Routes>
    </div>
  );
}

export default App;
