import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPayments = () => {
  const [payments, setPayments] = useState([]);
  const [searchPaymentId, setSearchPaymentId] = useState('');
  const [searchRequestId, setSearchRequestId] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    axios.get(`http://localhost:3001/view/payments?paymentId=${searchPaymentId}&requestId=${searchRequestId}`)
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  };

  const handleSearchChange = (e) => {
    if (e.target.name === 'paymentId') {
      setSearchPaymentId(e.target.value);
    } else {
      setSearchRequestId(e.target.value);
    }
  };

  const handleSearch = () => {
    fetchPayments();
  };

  return (
    <div>
      <h2>Payments</h2>
      <div>
        <input
          type="text"
          name="paymentId"
          placeholder="Search by Payment ID"
          value={searchPaymentId}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="requestId"
          placeholder="Search by Request ID"
          value={searchRequestId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Request ID</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.request_id}</td>
              <td>{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPayments;
