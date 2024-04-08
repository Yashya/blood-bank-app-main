const HospitalDashboardHandler = (app, db) => {
    app.post('/hospitalBloodRequest', (req, res) => {
      const { hospitalId, hospitalUsername, bloodType, unitsRequired } = req.body;
  
      if (parseInt(unitsRequired) <= 0) {
        res.send({ success: false, message: "Units required must be greater than 0." });
        return;
      }
      // Function to insert the blood request
      const insertBloodRequest = (hospital_id) => {
        // Generate a new request ID with the prefix "REQH"
        const generateRequestIdQuery = `
    SELECT CONCAT('REQH', LPAD(IFNULL(MAX(CAST(SUBSTRING(request_id, 5) AS UNSIGNED)), 0) + 1, 4, '0')) AS new_request_id
    FROM request_blood
    WHERE request_id LIKE 'REQH%';
  `;

  
  db.query(generateRequestIdQuery, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Error generating request ID: " + err });
      return;
    }

  
    const newRequestId = result[0].new_request_id;
    const insertRequestQuery = "INSERT INTO request_blood (request_id, hospital_id, blood_group, required_quantity, status) VALUES (?, ?, ?, ?, 'Pending')";

  
    db.query(insertRequestQuery, [newRequestId, hospital_id, bloodType, unitsRequired], (err, result) => {
      if (err) {
        res.send({ success: false, message: "Error inserting request: " + err });
        return;
      }

  
            res.send({ success: true, message: "Request submitted successfully", requestId: newRequestId });
          });
        });
      };
  
      if (hospitalId) {
        insertBloodRequest(hospitalId);
      } else if (hospitalUsername) {
        // Fetch the hospital ID using the username from the credentials table
        const findHospitalIdQuery = "SELECT id FROM credentials WHERE username = ?";
        db.query(findHospitalIdQuery, [hospitalUsername], (err, result) => {
          if (err) {
            res.send({ success: false, message: "Error finding hospital ID: " + err });
            return;
          }
  
          if (result.length > 0) {
            const hospital_id = result[0].id;
            insertBloodRequest(hospital_id);
          } else {
            res.send({ success: false, message: "Hospital username not found." });
          }
        });
      } else {
        res.send({ success: false, message: "Hospital ID or username is required." });
      }
    });
  
    app.post('/fetchHospitalRequests', (req, res) => {
        const { hospitalId, hospitalUsername } = req.body;
        let queryCondition = '';
        let queryValue = '';
    
        if (hospitalId) {
            queryCondition = 'h.hospital_id = ?';
            queryValue = hospitalId;
        } else if (hospitalUsername) {
            queryCondition = 'c.username = ?';
            queryValue = hospitalUsername;
        } else {
            res.send({ success: false, message: "Hospital ID or username is required." });
            return;
        }
    
        const fetchRequestsQuery = `
            SELECT r.request_id, r.blood_group, r.required_quantity, r.status
            FROM request_blood r
            JOIN hospitals h ON r.hospital_id = h.hospital_id
            JOIN credentials c ON h.hospital_id = c.id
            WHERE ${queryCondition};
        `;
    
        db.query(fetchRequestsQuery, [queryValue], (err, result) => {
            if (err) {
                res.send({ success: false, message: "Error fetching requests: " + err });
                return;
            }
    
            res.send({ success: true, requests: result });
        });
    });
    
    app.post('/updateRequestStatus', (req, res) => {
      const { hospitalId, hospitalUsername } = req.body;
      let queryCondition = '';
      let queryValue = '';
    
      if (hospitalId) {
        queryCondition = 'h.hospital_id = ?';
        queryValue = hospitalId;
      } else if (hospitalUsername) {
        queryCondition = 'c.username = ?';
        queryValue = hospitalUsername;
      } else {
        res.send({ success: false, message: "Hospital ID or username is required." });
        return;
      }
    
    
  
      // Update the status of requests based on the total volume
      const updateStatusQuery = `
    UPDATE request_blood r
    JOIN hospitals h ON r.hospital_id = h.hospital_id
    JOIN credentials c ON h.hospital_id = c.id
    SET r.status = IF((SELECT SUM(volume) FROM blood_samples WHERE blood_group = r.blood_group) >= r.required_quantity, 'Available', 'Unavailable')
    WHERE ${queryCondition};
  `;


  
  db.query(updateStatusQuery, [queryValue], (err, result) => {
    if (err) {
      res.send({ success: false, message: "Error updating request statuses: " + err });
      return;
    }


  
        // Fetch the updated requests
        const fetchRequestsQuery = `
      SELECT r.request_id, r.blood_group, r.required_quantity, r.status
      FROM request_blood r
      JOIN hospitals h ON r.hospital_id = h.hospital_id
      JOIN credentials c ON h.hospital_id = c.id
      WHERE ${queryCondition};
    `;


  
    db.query(fetchRequestsQuery, [queryValue], (err, requests) => {
      if (err) {
        res.send({ success: false, message: "Error fetching updated requests: " + err });
        return;
      }


  
          res.send({ success: true, requests: requests });
        });
      });
    });
  
    // Additional endpoints related to the hospital dashboard can be added here...
  };
  
  export default HospitalDashboardHandler;
  