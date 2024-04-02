const UserLoginHandler = (app, db) => {
  app.post("/login/usr", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;

      const sqlSelect = "SELECT * FROM credentials WHERE username = ? AND password = ?";

      db.query(sqlSelect, [username, password], (err, result) => {
          if (err) {
              res.send({ err: err });
              console.log("**ERROR**");
          } else if (result.length > 0) {
              res.send(result);
              console.log("**RESULT SENT TO FRONT END**");
          } else {
              res.send({ message: "Wrong username/password combination!" });
              console.log("**INVALID COMBINATION**");
          }
      });
  });

  app.get("/search/userid", (req, res) => {
      const username = req.query.userUserName;

      const sqlSelect = "SELECT id FROM credentials WHERE username = ?";

      db.query(sqlSelect, [username], (err, result) => {
          if (err) {
              res.send({ err: err });
              console.log("**ERROR**");
          } else if (result.length > 0) {
              res.send({ user_id: result[0].id });
              console.log("**USER ID SENT TO FRONT END**");
          } else {
              res.send({ message: "Username not found!" });
              console.log("**USERNAME NOT FOUND**");
          }
      });
  });
};

export default UserLoginHandler;
