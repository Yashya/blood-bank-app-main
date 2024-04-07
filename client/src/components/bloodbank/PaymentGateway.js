import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentGateway = () => {
  const [amount, setAmount] = useState(0);
  const [requestId, setRequestId] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const units = parseInt(params.get('units'));
    const requestId = params.get('requestId');
    setAmount(units * 50); // Assuming the cost per unit is 50
    setRequestId(requestId);
  }, [location]);

  const handlePayment = () => {
    Axios.post('http://localhost:3001/makePayment', {
      amount: amount,
      requestId: requestId
    }).then((response) => {
      if (response.data.success) {
        alert('Payment successful!');
        // Redirect or perform additional actions after successful payment
      } else {
        alert('Payment failed. Please try again.');
      }
    });
  };

  return (
    <div>
      <h2>Payment Gateway</h2>
      <p>Amount to be paid: {amount}</p>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default PaymentGateway;
