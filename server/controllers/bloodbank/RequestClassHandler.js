const RequestClassHandler = (app, db) => {
  app.post("/request", (req, res) => {
    const user_id = req.body.user_id;
    const blood_group = req.body.blood_group;
    const unit = req.body.unit;

    console.log("User ID: " + user_id + ", Blood Group: " + blood_group + ", Unit: " + unit);

    const sqlSelect = "SELECT * FROM blood_stocks WHERE blood_group=?";
    const sqlInsert = "INSERT INTO user_request(user_id, blood_group, unit) VALUES (?, ?, ?)";

    db.query(sqlSelect, [blood_group], (err, result) => {
      if (err) {
        console.log("**ERROR**" + err);
        res.send({ message: "Error while processing request" });
      } else {
        if (result.length > 0 && unit <= result[0].unit) {
          // Blood group exists and has sufficient units
          db.query(sqlInsert, [user_id, blood_group, unit], (err, result) => {
            if (err) {
              console.log("**ERROR ACCEPTING REQUEST!**" + err);
              res.send({ message: "Error while processing request" });
            } else {
              res.send({ message: "REQUEST ACCEPTED. COLLECT IT FROM THE BLOOD BANK." });
            }
          });
        } else {
          // Blood group does not exist or does not have sufficient units
          // Insert the request into user_request table anyway
          db.query(sqlInsert, [user_id, blood_group, unit], (err, result) => {
            if (err) {
              console.log("**ERROR ACCEPTING REQUEST!**" + err);
              res.send({ message: "Error while processing request" });
            } else {
              res.send({ message: "REQUEST NOTED. CURRENTLY UNAVAILABLE." });
            }
          });
        }
      }
    });
  });
};

export default RequestClassHandler;
