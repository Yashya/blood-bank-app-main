const HospitalRegisterHandler = (app, db) => {
    app.post('/reg/hospital', (req, res) => {
        const { name, contact_number, email, address, username, password } = req.body;

        // Start a transaction
        db.beginTransaction(err => {
            if (err) {
                res.send({ message: "Error starting transaction: " + err });
                return;
            }

            // Check if username, email, or contact number exists
            const sqlCheck = "SELECT username FROM credentials WHERE username = ? UNION SELECT email FROM hospitals WHERE email = ?";
            db.query(sqlCheck, [username, email], (err, result) => {
                if (err) {
                    db.rollback(() => {
                        res.send({ message: "Error: " + err });
                    });
                    return;
                }
                if (result.length > 0) {
                    db.rollback(() => {
                        res.send({ message: "Username or email already exists!" });
                    });
                    return;
                }

                // Retrieve the highest numeric part of the existing hospital IDs
                const sqlGetMaxHospitalId = "SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS max_id FROM credentials WHERE id LIKE 'HOS%'";
                db.query(sqlGetMaxHospitalId, (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            res.send({ message: "Error: " + err });
                        });
                        return;
                    }
                    const maxHospitalId = result[0].max_id || 0;
                    const nextHospitalIdNumber = maxHospitalId + 1;
                    const newHospitalId = `HOS${nextHospitalIdNumber}`;

                    // Insert into credentials table
                    const sqlInsertCredentials = "INSERT INTO credentials (id, username, password) VALUES (?, ?, ?)";
                    db.query(sqlInsertCredentials, [newHospitalId, username, password], (err, result) => {
                        if (err) {
                            db.rollback(() => {
                                res.send({ message: "Error in registration: " + err });
                            });
                            return;
                        }

                        // Insert into hospitals table
                        const sqlInsertHospitals = "INSERT INTO hospitals (hospital_id, name, contact_number, email, address) VALUES (?, ?, ?, ?, ?)";
                        db.query(sqlInsertHospitals, [newHospitalId, name, contact_number, email, address], (err, result) => {
                            if (err) {
                                db.rollback(() => {
                                    res.send({ message: "Error in registration: " + err });
                                });
                                return;
                            }

                            // Commit the transaction
                            db.commit(err => {
                                if (err) {
                                    db.rollback(() => {
                                        res.send({ message: "Error committing transaction: " + err });
                                    });
                                    return;
                                }
                                res.send({ message: "Hospital Registration Successful!", hospital_id: newHospitalId });
                            });
                        });
                    });
                });
            });
        });
    });
};

export default HospitalRegisterHandler;
