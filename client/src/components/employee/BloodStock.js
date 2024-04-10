

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const BloodStock = () => {
  const [bloodStock, setBloodStock] = useState([]);

  const fetchBloodStock = () => {
    Axios.get('http://localhost:3001/blood-stock')
      .then((response) => {
        setBloodStock(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blood stock:', error);
      });
  };

  useEffect(() => {
    fetchBloodStock();
  }, []);

  const data = {
    labels: bloodStock.map(stock => stock.blood_group),
    datasets: [
      {
        label: 'Volume/Units Left',
        data: bloodStock.map(stock => stock.volume),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div style={{ height: '60vh', width: '80vw' }}>
      <h2 style={{ textAlign: 'center' }}>Blood Stock</h2>
      <button 
  style={{
    background: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '12px'
  }} 
  onClick={fetchBloodStock}>
  Refresh
</button>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BloodStock;
