import React from "react";

// CSS
import "../../assets/css/EmpDashboard.css";

const EmpDashBoard = () => {
  return (
    <div className="emp-dashboard">
      <a href="/view/blood-stock">
        <button>View Blood Stock</button>
      </a>
      <a href="/view/requests">
        <button>View Requests</button>
      </a>
      <a href="/view/audit">
        <button>View Audit</button>
      </a>
      <a href="/view/feedback">
        <button>View Feedback</button>
      </a>
      <a href="/view/payments">
        <button>View Payments</button>
      </a>
    </div>
  );
};

export default EmpDashBoard;
