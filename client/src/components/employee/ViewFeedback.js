import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = (userId = '') => {
    axios.get(`http://localhost:3001/view/feedback?userId=${userId}`)
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchUserId(e.target.value);
  };

  const handleSearch = () => {
    fetchFeedbacks(searchUserId);
  };

  return (
    <div>
      <h2>Feedback</h2>
      <div>
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>User ID</th>
            <th>Feedback Text</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback.feedback_id}>
              <td>{feedback.feedback_id}</td>
              <td>{feedback.user_id}</td>
              <td>{feedback.feedback_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFeedback;
