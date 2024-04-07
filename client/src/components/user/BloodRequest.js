import React, { useState } from 'react';
import Axios from 'axios';

const BloodRequest = () => {
  const [bloodType, setBloodType] = useState('');
  const [unitsRequired, setUnitsRequired] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unitsRequired > 5) {
      alert('Normal users can request a maximum of 5 units.');
      return;
    }

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
    });
  };

  return (
    <div>
      <h1>Blood Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Blood Type:
          <input type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} />
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
