import React from "react";

// CSS
import "../../assets/css/EmpDashboard.css";

const EmpDashBoard = () => {
  return (
    <div className="emp-dashboard">
      <div className="dashboard-card">
        <a href="/view/blood-stock">
          <button>
            <div className="card-content">
              <h2>View Blood Stock</h2>
              <p>Check current blood supply levels</p>
            </div>
          </button>
        </a>
      </div>
      <div className="dashboard-card">
        <a href="/view/requests">
          <button>
            <div className="card-content">
              <h2>View Requests</h2>
              <p>Manage blood requests</p>
            </div>
          </button>
        </a>
      </div>
      <div className="dashboard-card">
        <a href="/view/audit">
          <button>
            <div className="card-content">
              <h2>View Audit</h2>
              <p>Review transaction logs</p>
            </div>
          </button>
        </a>
      </div>
      <div className="dashboard-card">
        <a href="/view/feedback">
          <button>
            <div className="card-content">
              <h2>View Feedback</h2>
              <p>Gather donor and recipient feedback</p>
            </div>
          </button>
        </a>
      </div>
      <div className="dashboard-card">
        <a href="/view/payments">
          <button>
            <div className="card-content">
              <h2>View Payments</h2>
              <p>Track Payment logs</p>
            </div>
          </button>
        </a>
      </div>
      <div className="dashboard-card">
        <a href="/view/donation-centers">  
          <button>
            <div className="card-content">
              <h2>View Donation Centers</h2>
              <p>Locate all active donation centers</p>
            </div>
          </button>  
        </a>
      </div>
    </div>
  );
};

export default EmpDashBoard;