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
            return; // Stops further execution if an error occurs
        }
        if (result.length > 0) {
            const request = result[0];
            if (request.status === 'Served') {
                res.send({ success: true, requestStatus: request, paymentEnabled: false });
                console.log(res);
                return; // Exit after handling 'Served'
            } 
           else if (request.status === 'Available') {
                res.send({ success: true, requestStatus: request, paymentEnabled: true });
                return; // Exit after handling 'Available'
            } 
           else if (request.status === 'Unavailable' || request.status === 'Pending') {
            const checkAvailabilityQuery = `
            SELECT SUM(volume) AS totalVolume FROM blood_samples
            WHERE blood_group = ?;
        `;
                db.query(checkAvailabilityQuery, [request.blood_group], (err, volumeResult) => {
                    if (err) {
                        res.send({ success: false, message: "Error checking blood availability: " + err });
                        return; // Exit if there is an error in the subquery
                    }
                    const totalVolume = volumeResult[0].totalVolume || 0;
                    if (totalVolume >= request.required_quantity) {
                        res.send({ success: true, requestStatus: {...request, status: 'Available'}, paymentEnabled: true });
                    } else {
                        res.send({ success: true, requestStatus: request, paymentEnabled: false });
                    }
                    return; // Exit after handling 'Unavailable' or 'Pending'
                });
                return; // Exit to ensure no further execution after initiating subquery
            } 
            res.send({ success: true, requestStatus: request, paymentEnabled: false });
            return; // Default response if none of the above conditions match
        } else {
            res.send({ success: false, message: "Request ID not found!" });
            return; // Exit if no results found
        }
    });
});
}
export default uDashboardHandler;