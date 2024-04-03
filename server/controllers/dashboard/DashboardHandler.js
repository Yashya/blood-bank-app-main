const DashboardHandler = (app, db) => {
  app.get('/home', (req, res) => {
      const sqlSelect = 'SELECT * FROM donation_centers;';

      db.query(sqlSelect, (err, result) => {
          if (err) {
              console.log('Error fetching donation centers:', err);
              res.send([]);
              return;
          }
          res.send(result);
      });
  });
};

export default DashboardHandler;
