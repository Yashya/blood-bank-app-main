import React, { useState } from 'react';
import Axios from 'axios';

import '../../assets/css/Feedback.css';

const Feedback = () => {
    const [userId, setUserId] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userId') {
            setUserId(value);
        } else if (name === 'feedback') {
            setFeedbackText(value);
        }
    };

    const submitFeedback = () => {
        const feedbackUrl = 'http://localhost:3001/feedback';
        Axios.post(feedbackUrl, { userId, feedback: feedbackText }).then((response) => {
            alert(response.data.message);
        });
    };

    return (
        <div className='feedback'>
            <h2>Give Feedback</h2>
            <form className='feedback-form'>
                <input
                    type='text'
                    name='userId'
                    placeholder='User ID'
                    value={userId}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name='feedback'
                    placeholder='Your feedback...'
                    value={feedbackText}
                    onChange={handleChange}
                    required
                />
                <button type='button' onClick={submitFeedback}>Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
