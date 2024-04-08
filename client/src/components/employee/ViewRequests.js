import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchParams, setSearchParams] = useState({
    requestId: '',
    patientId: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchRequests(searchParams);
  };

  const fetchRequests = (params = {}) => {
    axios.get('http://localhost:3001/view/requests', { params })
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
      });
  };

  const handleUpdate = (index, field, value) => {
    const updatedRequests = [...requests];
    updatedRequests[index][field] = value;
    setRequests(updatedRequests);
  };

  const saveUpdates = (requestId, index) => {
    const { blood_group, required_quantity, status } = requests[index];
    axios.put(`http://localhost:3001/update/request/${requestId}`, {
      blood_group,
      required_quantity,
      status
    })
      .then(() => {
        alert('Request updated successfully!');
      })
      .catch(error => {
        console.error('Error updating request:', error);
      });
  };

  return (
    <div>
      <h2>Requests</h2>
      <div>
        <input
          type="text"
          name="requestId"
          placeholder="Search by Request ID"
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="patientId"
          placeholder="Search by Patient ID"
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Hospital ID</th>
            <th>Patient ID</th>
            <th>Blood Group</th>
            <th>Required Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.hospital_id || 'N/A'}</td>
              <td>{request.patient_id || 'N/A'}</td>
              <td>
                <input
                  type="text"
                  value={request.blood_group}
                  onChange={(e) => handleUpdate(index, 'blood_group', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={request.required_quantity}
                  onChange={(e) => handleUpdate(index, 'required_quantity', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) => handleUpdate(index, 'status', e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Served">Served</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </td>
              <td>
                <button onClick={() => saveUpdates(request.request_id, index)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRequests;
