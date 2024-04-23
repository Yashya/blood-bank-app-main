import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../assets/css/DonateBlood.css';

const DonateBlood = () => {
  const [donorId, setDonorId] = useState('');
  const [username, setUsername] = useState('');
  const [nurseId, setNurseId] = useState('');
  const [centerName, setCenterName] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [volume, setVolume] = useState('');
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/getCenters').then((response) => {
      setCenters(response.data.centers);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  // Calculate today's date and the max date (5 days from now)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const submitDonation = () => {
    if (parseInt(volume) <= 0) {
      alert("Volume must be greater than 0.");
      return;
    }

    if (username && donorId) {
      Axios.get('http://localhost:3001/getUserId', {
        params: {
          username: username
        }
      }).then((response) => {
        if (response.data.success) {
          const fetchedDonorId = response.data.userId;
          if (fetchedDonorId !== donorId) {
            alert('Username and Donor ID do not match. Please enter correct information.');
            return;
          }
          donateBlood(donorId);
        } else {
          alert('Failed to fetch donor ID based on username. Please check the username and try again.');
        }
      }).catch((error) => {
        console.log(error);
        alert('Error in fetching donor ID.');
      });
    } else if (username) {
      Axios.get('http://localhost:3001/getUserId', {
        params: {
          username: username
        }
      }).then((response) => {
        if (response.data.success) {
          const fetchedDonorId = response.data.userId;
          donateBlood(fetchedDonorId);
        } else {
          alert('Failed to fetch donor ID. Please try again.');
        }
      }).catch((error) => {
        console.log(error);
        alert('Error in fetching donor ID.');
      });
    } else if (donorId) {
      donateBlood(donorId);
    } else {
      alert('Please enter a Username or Donor ID to proceed.');
    }
  };

  const donateBlood = (donorId) => {
    const selectedCenter = centers.find(center => center.name === centerName);
    const centreId = selectedCenter ? selectedCenter.center_id : null;

    Axios.post('http://localhost:3001/donateBlood', {
      donorId,
      nurseId,
      centerName,
      collectionDate,
      volume,
      centreId
    }).then((response) => {
      if (response.data.success) {
        alert('Donation successful!');
      } else {
        alert('Donation failed. Please try again.');
      }
    }).catch((error) => {
      console.log(error);
      alert('Error in submitting donation.');
    });
  };

  return (
    <div className="donate-blood-container">
      <h2>Donate Blood</h2>
      <p>Please enter either a Username or Donor ID to proceed:</p>
      <input type="text" placeholder="Donor ID" value={donorId} onChange={(e) => setDonorId(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Nurse ID" value={nurseId} onChange={(e) => setNurseId(e.target.value)} />
      <select value={centerName} onChange={(e) => setCenterName(e.target.value)}>
        <option value="">Select Center</option>
        {centers.map((center, index) => (
          <option key={index} value={center.name}>{center.name}</option>
        ))}
      </select>
      <input type="date" placeholder="Collection Date" value={collectionDate} onChange={(e) => setCollectionDate(e.target.value)} min={today} max={maxDateString} />
      <input type="number" placeholder="Volume (in units)" value={volume} onChange={(e) => setVolume(e.target.value)} />
      <button onClick={submitDonation}>Submit Donation</button>
    </div>
  );
};

export default DonateBlood;
