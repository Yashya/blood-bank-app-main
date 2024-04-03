const EmployeeRegisterHandler = (app, db) => {
  app.post("/reg/emp", (req, res) => {
    const { empName, empMail, empPhone, empAddress, username, password } = req.body;

    const sqlInsertCredentials = "INSERT INTO credentials (username, password) VALUES (?, ?)";
    const sqlInsertUser = "INSERT INTO users (user_id, name, email, address, role, contact_number) VALUES (LAST_INSERT_ID(), ?, ?, ?, 'employee', ?)";

    db.query(sqlInsertCredentials, [username, password], (err, result) => {
      if (err) {
        res.send({ message: "Error in registration: " + err });
        return;
      }
      db.query(sqlInsertUser, [empName, empMail, empAddress, empPhone], (err, result) => {
        if (err) {
          res.send({ message: "Error in registration: " + err });
        } else {
          res.send({ message: "Employee Registration Successful!" });
        }
      });
    });
  });
};

export default EmployeeRegisterHandler;
