import React, { useState } from 'react';
import Axios from 'axios';
//css
import '../../assets/css/UserDash.css';

const UserDashboard = () => {
  const [requestId, setRequestId] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const [paymentEnabled, setPaymentEnabled] = useState(false);

  // Donate function
  const donate = () => {
    window.location = '/donateBlood'; // Redirect to Donate Blood page
  };

  const request = () => {
    window.location = '/request';
  };

  // Function to search for blood request status
  const searchRequestStatus = () => {
    Axios.post('http://localhost:3001/searchRequestStatus', {
      requestId: requestId,
    }).then((response) => {
      if (response.data.success) {
        setRequestStatus(response.data.requestStatus);
        setPaymentEnabled(response.data.paymentEnabled);
      } else {
        alert(response.data.message);
      }
    }).catch((error) => {
      console.log(error);
      alert('Error in searching request status.');
    });
  };

  // Function to redirect to the payment gateway
  const redirectToPaymentGateway = () => {
    const url = `/makePayment?requestId=${requestStatus.request_id}&units=${requestStatus.required_quantity}`;
    window.location.href = url;
  };

  return (
    <div className='user-dashboard'>
      <h1>Welcome to Your Dashboard</h1>
      <div>
        <button onClick={donate}>DONATE</button>
        <button onClick={request}>REQUEST</button>
      </div>
      {/* Input field and button to search for blood request status */}
      <div>
        <input
          type='text'
          placeholder='Enter Request ID'
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
        <button onClick={searchRequestStatus}>Search Request Status</button>
      </div>

      {/* Display request status */}
      {requestStatus && (
        <div>
          <p>Request ID: {requestStatus.request_id}</p>
          <p>Patient ID: {requestStatus.patient_id}</p>
          <p>Blood Group: {requestStatus.blood_group}</p>
          <p>Required Quantity: {requestStatus.required_quantity}</p>
          <p>Status: {requestStatus.status}</p>
          {/* Display Make Payment button only when payment is enabled */}
          {paymentEnabled && (
            <button onClick={redirectToPaymentGateway}>Make Payment</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;