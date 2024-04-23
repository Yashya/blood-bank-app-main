import React, { useState } from 'react';
import Axios from 'axios';
import '../../assets/css/BloodRequest.css';
const BloodRequest = () => {
  const [bloodType, setBloodType] = useState('');
  const [unitsRequired, setUnitsRequired] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(unitsRequired) <= 0) {
      alert('Units required must be greater than 0.');
      return;
    }

    if (unitsRequired > 5) {
      alert('Normal users can request a maximum of 5 units.');
      return;
    }

    // Additional validation for username and userId
    if (username && userId) {
      Axios.get(`http://localhost:3001/validateUser`, {
        params: {
          userId: userId,
          username: username
        }
      }).then(response => {
        if (response.data.success) {
          submitBloodRequest();
        } else {
          alert('Username and User ID do not match. Please enter correct information.');
        }
      }).catch(error => {
        console.error('Validation error:', error);
        alert('Error validating user information.');
      });
    } else {
      submitBloodRequest();
    }
  };

  const submitBloodRequest = () => {
    Axios.post('http://localhost:3001/bloodRequest', {
      userId: userId,
      username: username,
      bloodType: bloodType,
      unitsRequired: unitsRequired,
    }).then((response) => {
      if (response.data.success) {
        if (response.data.available) {
          window.location.href = response.data.redirectUrl;
        } else {
          alert('Request has been made but the blood requested is currently unavailable.');
        }
      } else {
        alert('Error: ' + response.data.message);
      }
    }).catch(error => {
      console.error('Submission error:', error);
      alert('Error submitting blood request.');
    });
  };

  return (
    <div className="blood-request-container">
      <h1>Blood Request</h1>
      <form onSubmit={handleSubmit}>
      <p>Please enter either user id or username</p>
        <label>
          Blood Type:
          <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </label>
        <label>
          Units Required:
          <input type="number" value={unitsRequired} onChange={(e) => setUnitsRequired(e.target.value)} />
        </label>
        <label>
          User ID (optional):
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Username (optional):
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default BloodRequest;
