const HospitalRegisterHandler = (app, db) => {
    app.post('/reg/hospital', (req, res) => {
        const { name, contact_number, email, address, username, password } = req.body;

        // Check if email or contact_number exists
        const sqlCheckEmail = "SELECT * FROM hospitals WHERE email = ?";
        const sqlCheckContactNumber = "SELECT * FROM hospitals WHERE contact_number = ?";

        db.query(sqlCheckEmail, [email], (err, result) => {
            if (err) {
                res.send({ message: "Error: " + err });
                return;
            }
            if (result.length > 0) {
                res.send({ message: "Email already used!" });
                return;
            }

            db.query(sqlCheckContactNumber, [contact_number], (err, result) => {
                if (err) {
                    res.send({ message: "Error: " + err });
                    return;
                }
                if (result.length > 0) {
                    res.send({ message: "Contact number already used!" });
                    return;
                }

                const sqlInsertCredentials = 'INSERT INTO credentials (username, password) VALUES (?, ?)';
                const sqlInsertHospitals = 'INSERT INTO hospitals (hospital_id, name, contact_number, email, address) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?)';

                db.query(sqlInsertCredentials, [username, password], (err, result) => {
                    if (err) {
                        res.send({ message: 'Error in registration: ' + err });
                        return;
                    }
                    db.query(sqlInsertHospitals, [name, contact_number, email, address], (err, result) => {
                        if (err) {
                            res.send({ message: 'Error in registration: ' + err });
                        } else {
                            res.send({ message: 'Hospital Registration Successful!', hospital_id: result.insertId });
                        }
                    });
                });
            });
        });
    });
};

export default HospitalRegisterHandler;
