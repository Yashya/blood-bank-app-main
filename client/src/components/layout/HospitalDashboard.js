import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const HospitalDashboard = () => {
  const [requests, setRequests] = useState([{ bloodType: '', unitsRequired: '' }]);
  const [hospitalId, setHospitalId] = useState('');
  const [hospitalUsername, setHospitalUsername] = useState('');
  const [submittedRequests, setSubmittedRequests] = useState([]);

  // Function to handle change in request fields
  const handleRequestChange = (index, event) => {
    const newRequests = [...requests];
    newRequests[index][event.target.name] = event.target.value;
    setRequests(newRequests);
  };

  // Function to add a new request field
  const addRequestField = () => {
    setRequests([...requests, { bloodType: '', unitsRequired: '' }]);
  };

  // Function to submit all requests
  const submitRequests = () => {
    requests.forEach((request) => {
      Axios.post('http://localhost:3001/hospitalBloodRequest', {
        hospitalId: hospitalId,
        hospitalUsername: hospitalUsername,
        bloodType: request.bloodType,
        unitsRequired: request.unitsRequired,
      }).then((response) => {
        if (response.data.success) {
          alert(`Request for ${request.bloodType} (${request.unitsRequired} units) submitted successfully.`);
          fetchHospitalRequests(); // Refresh the list of submitted requests
        } else {
          alert(`Error submitting request for ${request.bloodType}: ${response.data.message}`);
        }
      }).catch((error) => {
        console.error(error);
        alert('Error submitting requests.');
      });
    });
  };
  const refreshRequestStatus = () => {
    Axios.post('http://localhost:3001/updateRequestStatus', {
      hospitalId: hospitalId,
      hospitalUsername: hospitalUsername,
    }).then((response) => {
      if (response.data.success) {
        setSubmittedRequests(response.data.requests); // Update the state with the refreshed statuses
      } else {
        alert('Error refreshing request statuses: ' + response.data.message);
      }
    }).catch((error) => {
      console.error(error);
      alert('Error refreshing request statuses.');
    });
  };
  

  // Function to fetch requests made by the hospital
  const fetchHospitalRequests = () => {
    Axios.post('http://localhost:3001/fetchHospitalRequests', {
      hospitalId: hospitalId,
      hospitalUsername: hospitalUsername,
    }).then((response) => {
      if (response.data.success) {
        setSubmittedRequests(response.data.requests);
      } else {
        alert('Error fetching requests: ' + response.data.message);
      }
    }).catch((error) => {
      console.error(error);
      alert('Error fetching requests.');
    });
  };

  // Fetch requests when hospitalId or hospitalUsername changes
  useEffect(() => {
    if (hospitalId || hospitalUsername) {
      fetchHospitalRequests();
    }
  }, [hospitalId, hospitalUsername]);

  // Function to redirect to the payment gateway
  const redirectToPaymentGateway = (requestId, unitsRequired) => {
    const url = `/makePayment?requestId=${requestId}&units=${unitsRequired}`;
    window.location.href = url;
  };

  return (
    <div className='hospital-dash'>
      <div>
        <label>Hospital ID:</label>
        <input
          type='text'
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
        />
        <label>or Hospital Username:</label>
        <input
          type='text'
          value={hospitalUsername}
          onChange={(e) => setHospitalUsername(e.target.value)}
        />
      </div>

      {requests.map((request, index) => (
        <div key={index}>
          <label>Blood Type:</label>
          <input
            type='text'
            name='bloodType'
            value={request.bloodType}
            onChange={(event) => handleRequestChange(index, event)}
          />
          <label>Units Required:</label>
          <input
            type='number'
            name='unitsRequired'
            value={request.unitsRequired}
            onChange={(event) => handleRequestChange(index, event)}
          />
        </div>
      ))}

      <button onClick={addRequestField}>Add Another Request</button>
      <button onClick={submitRequests}>Submit Requests</button>
      <button onClick={refreshRequestStatus}>Refresh Status</button>


      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Blood Group</th>
            <th>Units Required</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submittedRequests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.blood_group}</td>
              <td>{request.required_quantity}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Available' && (
                  <button onClick={() => redirectToPaymentGateway(request.request_id, request.required_quantity)}>
                    Make Payment
                    </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalDashboard;
