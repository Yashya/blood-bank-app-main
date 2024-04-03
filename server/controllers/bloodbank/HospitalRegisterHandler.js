const HospitalRegisterHandler = (app, db) => {
    app.post('/reg/hospital', (req, res) => {
        const { name, contact_number, email, address, username, password } = req.body;
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
};

export default HospitalRegisterHandler;
