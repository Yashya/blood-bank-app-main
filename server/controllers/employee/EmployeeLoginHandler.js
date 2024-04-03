const EmployeeLoginHandler = (app, db) => {
  app.post("/login/emp", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlSelectCredentials = "SELECT id FROM credentials WHERE username = ? AND password = ?";
    const sqlSelectUser = "SELECT * FROM users WHERE user_id = ? AND role = 'employee'";

    db.query(sqlSelectCredentials, [username, password], (err, credentialsResult) => {
      if (err) {
        res.send({ err: err });
        console.log("**ERROR**");
        return;
      }

      if (credentialsResult.length > 0) {
        const userId = credentialsResult[0].id;
        db.query(sqlSelectUser, [userId], (err, userResult) => {
          if (err) {
            res.send({ err: err });
            console.log("**ERROR**");
            return;
          }

          if (userResult.length > 0) {
            res.send({ message: "Login successful!" });
            console.log("**LOGIN SUCCESSFUL**");
          } else {
            res.send({ message: "Not authorized!" });
            console.log("**NOT AUTHORIZED**");
          }
        });
      } else {
        res.send({ message: "Wrong username/password combination!" });
        console.log("**INVALID COMBINATION**");
      }
    });
  });
};

export default EmployeeLoginHandler;
