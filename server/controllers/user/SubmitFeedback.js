const SubmitFeedback = (app, db) => {
    app.post('/feedback', (req, res) => {
        const { userId, feedback } = req.body;

        const sqlCallInsertFeedback = 'CALL InsertFeedback(?, ?)';

        db.query(sqlCallInsertFeedback, [userId, feedback], (err, result) => {
            if (err) {
                res.send({ message: 'Error in submitting feedback: ' + err });
            } else {
                res.send({ message: 'Feedback submitted successfully!' });
            }
        });
    });
};

export default SubmitFeedback;
