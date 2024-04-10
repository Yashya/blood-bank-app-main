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
import ViewRequests from "./components/employee/ViewRequests";
import ViewAudit from "./components/employee/ViewAudit"
import ViewFeedback from "./components/employee/ViewFeedback.js";
import ViewPayments from "./components/employee/ViewPayments.js";
import ViewCenters from "./components/employee/ViewCenters.js";
//css
import "./App.css";
import "./index.css"
//fonts
import "./fonts/Sebino-Regular.ttf"
import "./fonts/sequel-sans-black-disp.ttf"
import "./fonts/HelveticaNowText-Medium.ttf"
import "./fonts/VayuSans-ExtraBold.ttf"

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
        <Route exact path="/view/requests" element={<ViewRequests/>}/>
        <Route exact path="/view/audit" element={<ViewAudit/>}/>
        <Route exact path="/view/feedback" element={<ViewFeedback/>}/>
        <Route exact path="/view/payments" element={<ViewPayments/>}/>
        <Route exact path="/view/donation-centers" element={<ViewCenters/>}/>
      </Routes>
    </div>
  );
}

export default App;
