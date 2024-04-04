const EmployeeLoginHandler = (app, db) => {
  app.post("/login/emp", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlLoginQuery = `
      SELECT u.user_id
      FROM credentials c
      JOIN users u ON c.id = u.user_id
      WHERE c.username = ? AND c.password = ? AND u.role = 'employee';
    `;

    db.query(sqlLoginQuery, [username, password], (err, result) => {
      if (err) {
        res.send({ message: "Error: " + err });
        return;
      }

      if (result.length > 0) {
        res.send({ message: "Login successful!" });
      } else {
        res.send({ message: "Invalid credentials or not authorized!" });
      }
    });
  });
};

export default EmployeeLoginHandler;
