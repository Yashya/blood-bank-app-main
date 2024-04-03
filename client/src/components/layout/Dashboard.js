import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

// CSS
import '../../assets/css/Dashboard.css';

const Dashboard = () => {
    // Array of donation centers
    const [donationCenters, setDonationCenters] = useState([]);

    // useEffect call
    useEffect(() => {
        axios.get('http://localhost:3001/home')
            .then(function (response) {
                setDonationCenters(response.data);
            });
    }, []);

    return (
        <div className='dashboard'>
            <h1>Donation Centers</h1>

            <table className='donation-centers-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {donationCenters.length > 0 && donationCenters.map((center) => {
                        return (
                            <tr key={center.center_id}>
                                <td>{center.name}</td>
                                <td>{center.contact_number}</td>
                                <td>{center.email}</td>
                                <td>{center.address}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Footer />
        </div>
    );
};

export default Dashboard;
