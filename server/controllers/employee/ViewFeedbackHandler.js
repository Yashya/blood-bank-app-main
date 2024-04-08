const ViewFeedback = (app, db) => {
    app.get('/view/feedback', (req, res) => {
      const { userId } = req.query;
      let query = 'SELECT * FROM feedback';
      
      if (userId) {
        query += ` WHERE user_id LIKE '%${userId}%'`;
      }
  
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error fetching feedback' });
        } else {
          res.status(200).send(result);
        }
      });
    });
  };
  

  export default ViewFeedback;
  