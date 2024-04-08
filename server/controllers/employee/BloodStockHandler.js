// BloodStockHandler.js

const BloodStockHandler = (app, db) => {
    app.get('/blood-stock', (req, res) => {
        const query = 'SELECT blood_group, SUM(volume) AS volume FROM blood_samples GROUP BY blood_group';

      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error fetching blood stock' });
        } else {
          res.status(200).send(result);
        }
      });
    });
  };
  
  export default BloodStockHandler;
  