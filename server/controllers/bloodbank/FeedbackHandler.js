const FeedbackHandler = (app, db) => {
    app.post('/feedback', (req, res) => {
        // Variables
        const { userId, feedback } = req.body;

        // Insert into feedback table
        const sqlInsertFeedback = 'INSERT INTO feedback (user_id, feedback_text) VALUES (?, ?)';

        db.query(sqlInsertFeedback, [userId, feedback], (err, result) => {
            if (err) {
                res.send({ message: 'Error in submitting feedback: ' + err });
            } else {
                res.send({ message: 'Feedback submitted successfully!' });
            }
        });
    });
};

export default FeedbackHandler;
