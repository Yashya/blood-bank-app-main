import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import '../../assets/css/Dashboard.css';

const Dashboard = () => {
  const [donationCenters, setDonationCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/home?searchTerm=${searchTerm}`)
      .then(function (response) {
        setDonationCenters(response.data);
      });
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='dashboard'>
      <div className='search-area'>
        <h1>Find a Donation Center</h1>
        <p>Locate the nearest donation center and help save lives.</p>
        <input
          type='text'
          placeholder='Enter your location to find the nearest donation center...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <h3 className='nearest-center-text'>Find the Nearest Center</h3>
      </div>

      <div className='donation-centers'>
        {donationCenters.map((center) => (
          <div key={center.center_id} className='center-card'>
            <h2>{center.name}</h2>
            <p>{center.address}</p>
            <p>Email: {center.email}</p>
            <p>Phone: {center.contact_number}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
