const UserRequestHandler = (app, db) => {
  app.post('/bloodRequest', (req, res) => {
    const { userId, username, bloodType, unitsRequired, isHospital } = req.body;
    if (parseInt(unitsRequired) <= 0) {
      res.send({ success: false, message: "Units required must be greater than 0." });
      return;
    }


    const insertBloodRequest = (user_id) => {
      const prefix = isHospital ? 'REQH' : 'REQ';
      const generateRequestIdQuery = `SELECT CONCAT('${prefix}', LPAD(IFNULL(MAX(CAST(SUBSTRING(request_id, ${prefix.length + 1}) AS UNSIGNED)), 0) + 1, 4, '0')) AS new_request_id FROM request_blood WHERE request_id LIKE '${prefix}%'`;
      
      db.query(generateRequestIdQuery, (err, result) => {
        if (err) {
          res.send({ success: false, message: "Error generating request ID: " + err });
          return;
        }

        const newRequestId = result[0].new_request_id;
        const checkAvailabilityQuery = `SELECT SUM(volume) AS totalVolume FROM blood_samples WHERE blood_group = ?`;

        db.query(checkAvailabilityQuery, [bloodType], (err, result) => {
          if (err) {
            res.send({ success: false, message: "Error checking blood availability: " + err });
            return;
          }

          if (result[0].totalVolume >= unitsRequired) {
            const insertRequestQuery = `INSERT INTO request_blood (request_id, hospital_id, patient_id, blood_group, required_quantity, status) VALUES (?, ${isHospital ? '?' : 'NULL'}, ${isHospital ? 'NULL' : '?'}, ?, ?, 'Pending')`;
            
            db.query(insertRequestQuery, [newRequestId, isHospital ? userId : user_id, bloodType, unitsRequired], (err, result) => {
              if (err) {
                res.send({ success: false, message: "Error inserting request: " + err });
                return;
              }

              res.send({ success: true, available: true, redirectUrl: '/makePayment?units=' + unitsRequired + '&requestId=' + newRequestId });
            });
          } else {
            const insertRequestQuery = `INSERT INTO request_blood (request_id, hospital_id, patient_id, blood_group, required_quantity, status) VALUES (?, ${isHospital ? '?' : 'NULL'}, ${isHospital ? 'NULL' : '?'}, ?, ?, 'Unavailable')`;
            
            db.query(insertRequestQuery, [newRequestId, isHospital ? userId : user_id, bloodType, unitsRequired], (err, result) => {
              if (err) {
                res.send({ success: false, message: "Error inserting request: " + err });
                return;
              }

              res.send({ success: true, available: false,requestId: newRequestId });
            });
          }
        });
      });
    };

    if (userId) {
      insertBloodRequest(userId);
    } else if (username) {
      const findUserIdQuery = `SELECT u.user_id FROM users u JOIN credentials c ON u.user_id = c.id WHERE c.username = ?`;
      
      db.query(findUserIdQuery, [username], (err, result) => {
        if (err) {
          res.send({ success: false, message: "Error finding user ID: " + err });
          return;
        }

        if (result.length > 0) {
          const user_id = result[0].user_id;
          insertBloodRequest(user_id);
        } else {
          res.send({ success: false, message: "User not found." });
        }
      });
    } else {
      res.send({ success: false, message: "User ID or username is required." });
    }
  });

  // Additional endpoints can be added here...
};

export default UserRequestHandler;
