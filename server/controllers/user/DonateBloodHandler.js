const DonateBloodHandler = (app, db) => {
  app.post("/donateBlood", (req, res) => {
    const { username, donorId, nurseId, centerName, collectionDate, volume, centreId } = req.body;

    // Validate the volume field
    if (parseInt(volume) <= 0) {
      res.send({ success: false, message: "Volume must be greater than 0." });
      return;
    }

    // Function to handle the donation process
    const handleDonation = (donorId) => {
      const fetchBloodGroup = "SELECT blood_group FROM users WHERE user_id = ?";

      db.query(fetchBloodGroup, [donorId], (err, result) => {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else {
          const bloodGroup = result[0].blood_group;

          // Fetch the last sample_id and generate a new one
          const fetchLastSampleId = "SELECT sample_id FROM blood_samples WHERE sample_id LIKE 'SAM%' ORDER BY CAST(SUBSTRING(sample_id, 4) AS UNSIGNED) DESC LIMIT 1";
          db.query(fetchLastSampleId, (err, result) => {
            if (err) {
              console.log(err);
              res.send({ success: false });
            } else {
              const lastSampleId = result.length > 0 ? result[0].sample_id : "SAM0";
              const numericPartSample = parseInt(lastSampleId.substring(3)) + 1;
              const newSampleId = `SAM${numericPartSample.toString().padStart(4, '0')}`;  // Ensure the numeric part is at least 4 digits
          

              // Fetch the last audit_log id and generate a new one
              const fetchLastAuditId = "SELECT id FROM audit_log WHERE id LIKE 'AU%' ORDER BY CAST(SUBSTRING(id, 3) AS UNSIGNED) DESC LIMIT 1";
              db.query(fetchLastAuditId, (err, result) => {
                if (err) {
                  console.log(err);
                  res.send({ success: false });
                } else {
                  const lastAuditId = result.length > 0 ? result[0].id : "AU0";
                  const numericPartAudit = parseInt(lastAuditId.substring(2)) + 1;
                  const newAuditId = `AU${numericPartAudit.toString().padStart(4, '0')}`;  // Pad with zeros to ensure at least 4 digits
              

                  const insertBloodSample = `
                    INSERT INTO blood_samples (sample_id, audit_log_id, donor_id, nurse_id, center_name, collection_date, volume, centre_id, blood_group)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

                  const insertAuditLog = `
                    INSERT INTO audit_log (id, sample_id, center_id, action, blood_group, timestamp)
                    VALUES (?, ?, ?, 'donation', ?, NOW())
                  `;

                  db.query(insertBloodSample, [newSampleId, newAuditId, donorId, nurseId, centerName, collectionDate, volume, centreId, bloodGroup], (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send({ success: false });
                    } else {
                      db.query(insertAuditLog, [newAuditId, newSampleId, centreId, bloodGroup], (err, result) => {
                        if (err) {
                          console.log(err);
                          res.send({ success: false });
                        } else {
                          res.send({ success: true });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };

    // If a username is provided, fetch the corresponding donor ID
    if (username) {
      const fetchDonorId = "SELECT id FROM credentials WHERE username = ?";
      db.query(fetchDonorId, [username], (err, result) => {
        if (err) {
          console.log(err);
          res.send({ success: false });
        } else if (result.length > 0) {
          const fetchedDonorId = result[0].id;
          handleDonation(fetchedDonorId);
        } else {
          res.send({ success: false, message: "Username not found" });
        }
      });
    } else {
      handleDonation(donorId);
    }
  });
};

export default DonateBloodHandler;
