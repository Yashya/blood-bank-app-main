const EmployeeRegisterHandler = (app, db) => {
  app.post("/reg/emp", (req, res) => {
      const { empName, empMail, empPhone, empAddress, username, password } = req.body;

      // Check if username, email, or contact number already exists
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

          db.query(sqlCheckEmail, [empMail], (err, result) => {
              if (err) {
                  res.send({ message: "Error: " + err });
                  return;
              }
              if (result.length > 0) {
                  res.send({ message: "Email already used!" });
                  return;
              }

              db.query(sqlCheckContactNumber, [empPhone], (err, result) => {
                  if (err) {
                      res.send({ message: "Error: " + err });
                      return;
                  }
                  if (result.length > 0) {
                      res.send({ message: "Contact number already used!" });
                      return;
                  }

                  // Insert into credentials table
                  const sqlInsertCredentials = "INSERT INTO credentials (username, password) VALUES (?, ?)";
                  const sqlInsertUsers = "INSERT INTO users (user_id, name, email, address, role, contact_number) VALUES (LAST_INSERT_ID(), ?, ?, ?, 'employee', ?)";

                  // First, insert into the credentials table
                  db.query(sqlInsertCredentials, [username, password], (err, result) => {
                      if (err) {
                          res.send({ message: "Error in registration: " + err });
                          return;
                      }
                      // Then, insert into the users table
                      db.query(sqlInsertUsers, [empName, empMail, empAddress, empPhone], (err, result) => {
                          if (err) {
                              res.send({ message: "Error in registration: " + err });
                          } else {
                              res.send({ message: "Employee Registration Successful!", user_id: result.insertId });
                          }
                      });
                  });
              });
          });
      });
  });
};

export default EmployeeRegisterHandler;
