const PaymentHandler = (app, db) => {
    app.post('/makePayment', (req, res) => {
        const { amount, requestId } = req.body;

        // Generate a new payment ID with the prefix "PAYMN"
        const generatePaymentIdQuery = "SELECT CONCAT('PAYMN', LPAD(IFNULL(MAX(CAST(SUBSTRING(payment_id, 6) AS UNSIGNED)), 0) + 1, 4, '0')) AS new_payment_id FROM payments";

        db.query(generatePaymentIdQuery, (err, result) => {
            if (err) {
                res.send({ success: false, message: "Error generating payment ID: " + err });
                return;
            }

            const newPaymentId = result[0].new_payment_id;

            // Insert the payment into the payments table
            const insertPaymentQuery = "INSERT INTO payments (payment_id, amount, request_id) VALUES (?, ?, ?)";
            db.query(insertPaymentQuery, [newPaymentId, amount, requestId], (err, result) => {
                if (err) {
                    res.send({ success: false, message: "Error processing payment: " + err });
                    return;
                }

                // Update the status in the request_blood table to 'Served'
                const updateRequestStatusQuery = "UPDATE request_blood SET status = 'Served' WHERE request_id = ?";
                db.query(updateRequestStatusQuery, [requestId], (err, result) => {
                    if (err) {
                        res.send({ success: false, message: "Error updating request status: " + err });
                        return;
                    }

                    // Fetch the blood group and required units from the request
                    const fetchRequestDetailsQuery = "SELECT blood_group, required_quantity FROM request_blood WHERE request_id = ?";
                    db.query(fetchRequestDetailsQuery, [requestId], (err, requestDetails) => {
                        if (err) {
                            res.send({ success: false, message: "Error fetching request details: " + err });
                            return;
                        }

                        const { blood_group, required_quantity } = requestDetails[0];
                        let remainingUnits = required_quantity;

                        // Fetch the available blood samples
                        const fetchSamplesQuery = "SELECT sample_id, volume FROM blood_samples WHERE blood_group = ? AND volume > 0 ORDER BY collection_date";
                        db.query(fetchSamplesQuery, [blood_group], (err, samples) => {
                            if (err) {
                                res.send({ success: false, message: "Error fetching blood samples: " + err });
                                return;
                            }

                            // Function to process each sample and update the audit log
                            const processSample = (index) => {
                                if (index >= samples.length || remainingUnits <= 0) {
                                    res.send({ success: true, message: "Payment successful, request status updated, and audit log updated" });
                                    return;
                                }

                                const sample = samples[index];
                                const usedUnits = Math.min(sample.volume, remainingUnits);
                                remainingUnits -= usedUnits;

                                // Update the volume in the blood_samples table
                                const updateVolumeQuery = "UPDATE blood_samples SET volume = volume - ? WHERE sample_id = ?";
                                db.query(updateVolumeQuery, [usedUnits, sample.sample_id], (err, result) => {
                                    if (err) {
                                        console.log("Error updating sample volume: " + err);
                                        processSample(index + 1);
                                        return;
                                    }

                                    // Generate a new audit log ID with the prefix "AU" for each sample used
                                    const generateAuditLogIdQuery = "SELECT CONCAT('AU', LPAD(IFNULL(MAX(CAST(SUBSTRING(id, 3) AS UNSIGNED)), 0) + 1, 4, '0')) AS new_audit_log_id FROM audit_log";
                                    db.query(generateAuditLogIdQuery, (err, result) => {
                                        if (err) {
                                            console.log("Error generating audit log ID: " + err);
                                            processSample(index + 1);
                                            return;
                                        }

                                        const newAuditLogId = result[0].new_audit_log_id;

                                        // Insert into the audit_log table for each sample used
                                        const insertAuditLogQuery = "INSERT INTO audit_log (id, sample_id, request_id, action, blood_group, timestamp) VALUES (?, ?, ?, 'Served', ?, NOW())";
                                        db.query(insertAuditLogQuery, [newAuditLogId, sample.sample_id, requestId, blood_group], (err, result) => {
                                            if (err) {
                                                console.log("Error inserting into audit log: " + err);
                                            }
                                            processSample(index + 1);
                                        });
                                    });
                                });
                            };

                            // Start processing the samples
                            processSample(0);
                        });
                    });
                });
            });
        });
    });
};

export default PaymentHandler;
