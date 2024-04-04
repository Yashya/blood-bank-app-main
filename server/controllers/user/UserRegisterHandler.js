const UserRegisterHandler = (app, db) => {
    app.post("/reg/usr", (req, res) => {
      const { name, email, address, date_of_birth, role, gender, blood_group, contact_number, username, password } = req.body;
  
      const sqlCheckUsername = "SELECT * FROM credentials WHERE username = ?";
      const sqlCheckEmail = "SELECT * FROM users WHERE email = ?";
      const sqlCheckContactNumber = "SELECT * FROM users WHERE contact_number = ?";
  
      db.query(sqlCheckUsername, [username], (err, result) => {
        if (err) {
          res.send({ message: "Error: " + err });
          return;
        }
        if (result.length > 0) {
          res.send({ message: "Username already exists!" });
          return;
        }
  
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
  
            const sqlInsertCredentials = "INSERT INTO credentials (username, password) VALUES (?, ?)";
            const sqlInsertUsers = "INSERT INTO users (user_id, name, email, address, date_of_birth, role, gender, blood_group, contact_number) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ?, ?)";
  
            db.query(sqlInsertCredentials, [username, password], (err, result) => {
              if (err) {
                res.send({ message: "Error in registration: " + err });
                return;
              }
              db.query(sqlInsertUsers, [name, email, address, date_of_birth, role, gender, blood_group, contact_number], (err, result) => {
                if (err) {
                  res.send({ message: "Error in registration: " + err });
                } else {
                  res.send({ message: "User Registration Successful!", user_id: result.insertId });
                }
              });
            });
          });
        });
      });
    });
  };
  
  export default UserRegisterHandler;
  