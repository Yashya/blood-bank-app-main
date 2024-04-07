const UserRegisterHandler = (app, db) => {
  app.post("/reg/usr", (req, res) => {
      const { name, email, address, date_of_birth, role, gender, blood_group, contact_number, username, password } = req.body;

      // Start a transaction
      db.beginTransaction(err => {
          if (err) {
              res.send({ message: "Error starting transaction: " + err });
              return;
          }

          // Check if username or email already exists
          const sqlCheck = "SELECT username FROM credentials WHERE username = ? UNION SELECT email FROM users WHERE email = ?";
          db.query(sqlCheck, [username, email], (err, result) => {
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

              // Retrieve the highest numeric part of the existing user IDs
              const sqlGetMaxUserId = "SELECT MAX(CAST(SUBSTRING(id, 4) AS UNSIGNED)) AS max_id FROM credentials WHERE id LIKE 'USR%'";
              db.query(sqlGetMaxUserId, (err, result) => {
                  if (err) {
                      db.rollback(() => {
                          res.send({ message: "Error: " + err });
                      });
                      return;
                  }
                  const maxUserId = result[0].max_id || 0;
                  const nextUserIdNumber = maxUserId + 1;
                  const newUserId = `USR${nextUserIdNumber}`;

                  // Insert into credentials table
                  const sqlInsertCredentials = "INSERT INTO credentials (id, username, password) VALUES (?, ?, ?)";
                  db.query(sqlInsertCredentials, [newUserId, username, password], (err, result) => {
                      if (err) {
                          db.rollback(() => {
                              res.send({ message: "Error in registration: " + err });
                          });
                          return;
                      }

                      // Insert into users table
                      const sqlInsertUsers = "INSERT INTO users (user_id, name, email, address, date_of_birth, role, gender, blood_group, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                      db.query(sqlInsertUsers, [newUserId, name, email, address, date_of_birth, role, gender, blood_group, contact_number], (err, result) => {
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
                              res.send({ message: "User Registration Successful!", user_id: newUserId });
                          });
                      });
                  });
              });
          });
      });
  });
};

export default UserRegisterHandler;
