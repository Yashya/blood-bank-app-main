const UserRegisterHandler = (app, db) => {
  app.post("/reg/usr", (req, res) => {
      // Variables
      const { name, email, address, date_of_birth, role, gender, blood_group, contact_number, username, password } = req.body;

      // Insert into credentials table
      const sqlInsertCredentials = "INSERT INTO credentials (username, password) VALUES (?, ?)";

      // Insert into users table
      const sqlInsertUsers = "INSERT INTO users (user_id, name, email, address, date_of_birth, role, gender, blood_group, contact_number) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ?, ?)";

      // First, insert into the credentials table
      db.query(sqlInsertCredentials, [username, password], (err, result) => {
          if (err) {
              res.send({ message: "Error in registration: " + err });
              return;
          }
          // Then, insert into the users table
          db.query(sqlInsertUsers, [name, email, address, date_of_birth, role, gender, blood_group, contact_number], (err, result) => {
              if (err) {
                  res.send({ message: "Error in registration: " + err });
              } else {
                  res.send({ message: "User Registration Successful!", user_id: result.insertId });
              }
          });
      });
  });
};

export default UserRegisterHandler;
