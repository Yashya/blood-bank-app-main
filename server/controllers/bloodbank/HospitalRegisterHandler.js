const HospitalRegisterHandler = (app, db) => {
    app.post('/reg/hospital', (req, res) => {
        // Variables
        const { name, contact_number, email, address } = req.body;

        // Insert into credentials table
        const sqlInsertCredentials = 'INSERT INTO credentials (username, password) VALUES (?, ?)';

        // Insert into hospitals table
        const sqlInsertHospitals = 'INSERT INTO hospitals (hospital_id, name, contact_number, email, address) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?)';

        // Generate random username and password for hospital (Modify as needed)
        const username = name.toLowerCase().replace(/\s/g, '') + '_hospital';
        const password = 'hospital123';

        // First, insert into the credentials table
        db.query(sqlInsertCredentials, [username, password], (err, result) => {
            if (err) {
                res.send({ message: 'Error in registration: ' + err });
                return;
            }
            // Then, insert into the hospitals table
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
