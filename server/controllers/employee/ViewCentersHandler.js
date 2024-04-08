const ViewCentersHandler = (app, db) => {
    app.get('/view/donation-centers', (req, res) => {
      const query = 'SELECT * FROM donation_centers';
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error fetching donation centers' });
        } else {
          res.status(200).send(result);
        }
      });
    });
  
    app.post('/add/donation-center', (req, res) => {
      const { name, contact_number, email, address } = req.body;
      const query = 'INSERT INTO donation_centers (name, contact_number, email, address) VALUES (?, ?, ?, ?)';
      db.query(query, [name, contact_number, email, address], (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error adding donation center' });
        } else {
          res.status(200).send({ message: 'Donation center added successfully' });
        }
      });
    });
  
    app.delete('/remove/donation-center/:centerId', (req, res) => {
      const { centerId } = req.params;
      const query = 'DELETE FROM donation_centers WHERE center_id = ?';
      db.query(query, [centerId], (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error removing donation center' });
        } else {
          res.status(200).send({ message: 'Donation center removed successfully' });
        }
      });
    });
  };
  
  export default ViewCentersHandler;
  