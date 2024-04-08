import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCenters = () => {
  const [centers, setCenters] = useState([]);
  const [newCenter, setNewCenter] = useState({
    name: '',
    contact_number: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = () => {
    axios.get('http://localhost:3001/view/donation-centers')
      .then(response => {
        setCenters(response.data);
      })
      .catch(error => {
        console.error('Error fetching donation centers:', error);
      });
  };

  const handleInputChange = (e) => {
    setNewCenter({ ...newCenter, [e.target.name]: e.target.value });
  };

  const handleAddCenter = () => {
    axios.post('http://localhost:3001/add/donation-center', newCenter)
      .then(() => {
        fetchCenters();
        setNewCenter({
          name: '',
          contact_number: '',
          email: '',
          address: ''
        });
      })
      .catch(error => {
        console.error('Error adding donation center:', error);
      });
  };

  const handleRemoveCenter = (centerId) => {
    axios.delete(`http://localhost:3001/remove/donation-center/${centerId}`)
      .then(() => {
        fetchCenters();
      })
      .catch(error => {
        console.error('Error removing donation center:', error);
      });
  };

  return (
    <div>
      <h2>Donation Centers</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Center Name"
          value={newCenter.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contact_number"
          placeholder="Contact Number"
          value={newCenter.contact_number}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newCenter.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCenter.address}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCenter}>Add Center</button>
      </div>
      <table>
        <thead>
        <tr>
            <th>Center ID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {centers.map(center => (
            <tr key={center.center_id}>
              <td>{center.center_id}</td>
              <td>{center.name}</td>
              <td>{center.contact_number}</td>
              <td>{center.email}</td>
              <td>{center.address}</td>
              <td>
                <button onClick={() => handleRemoveCenter(center.center_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCenters;
