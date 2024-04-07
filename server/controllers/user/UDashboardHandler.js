const uDashboardHandler = (app, db) => {
    app.post('/searchRequestStatus', (req, res) => {
        const { requestId } = req.body;

        const sqlQuery = `
            SELECT * FROM request_blood
            WHERE request_id = ?;
        `;

        db.query(sqlQuery, [requestId], (err, result) => {
            if (err) {
                res.send({ success: false, message: "Error: " + err });
                return;
            }
            if (result.length > 0) {
                const request = result[0];
                const checkAvailabilityQuery = `
                    SELECT SUM(volume) AS totalVolume FROM blood_samples
                    WHERE blood_group = ?;
                `;
                db.query(checkAvailabilityQuery, [request.blood_group], (err, volumeResult) => {
                    if (err) {
                        res.send({ success: false, message: "Error checking blood availability: " + err });
                        return;
                    }
                    const totalVolume = volumeResult[0].totalVolume || 0;
                    if (totalVolume >= request.required_quantity) {
                        request.status = 'Available';
                    }
                    res.send({ success: true, requestStatus: request });
                });
            } else {
                res.send({ success: false, message: "Request ID not found!" });
            }
        });
    });

    // Additional endpoints related to the user dashboard can be added here
};

export default uDashboardHandler;
