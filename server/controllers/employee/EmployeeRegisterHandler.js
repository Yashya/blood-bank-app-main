const EmployeeRegisterHandler = (app, db) => {
    app.post("/reg/emp", (req, res) => {
        const { empName, empMail, empPhone, empAddress, empDOB, empGender, empBloodGroup, username, password } = req.body;

        // Start a transaction
        db.beginTransaction(err => {
            if (err) {
                res.send({ message: "Error starting transaction: " + err });
                return;
            }

            // Check if username or email already exists
            const sqlCheck = "SELECT username FROM credentials WHERE username = ? UNION SELECT email FROM users WHERE email = ?";
            db.query(sqlCheck, [username, empMail], (err, result) => {
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

                // Retrieve the highest numeric part of the existing employee IDs
                const sqlGetMaxEmpId = "SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS max_id FROM credentials WHERE id LIKE 'EMP%'";
                db.query(sqlGetMaxEmpId, (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            res.send({ message: "Error: " + err });
                        });
                        return;
                    }
                    const maxEmpId = result[0].max_id || 0;
                    const nextEmpIdNumber = maxEmpId + 1;
                    const newEmpId = `EMP${nextEmpIdNumber}`;

                    // Insert into credentials table
                    const sqlInsertCredentials = "INSERT INTO credentials (id, username, password) VALUES (?, ?, ?)";
                    db.query(sqlInsertCredentials, [newEmpId, username, password], (err, result) => {
                        if (err) {
                            db.rollback(() => {
                                res.send({ message: "Error in registration: " + err });
                            });
                            return;
                        }

                        // Insert into users table
                        const sqlInsertUsers = "INSERT INTO users (user_id, name, email, address, role, contact_number, date_of_birth, gender, blood_group) VALUES (?, ?, ?, ?, 'employee', ?, ?, ?, ?)";
                        db.query(sqlInsertUsers, [newEmpId, empName, empMail, empAddress, empPhone, empDOB, empGender, empBloodGroup], (err, result) => {
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
                                res.send({ message: "Employee Registration Successful!", user_id: newEmpId });
                            });
                        });
                    });
                });
            });
        });
    });
};

export default EmployeeRegisterHandler;
