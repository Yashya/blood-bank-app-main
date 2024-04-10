const DashboardHandler = (app, db) => {
    app.get('/home', (req, res) => {
      const searchTerm = req.query.searchTerm || '';
      const sqlSelect = 'SELECT * FROM donation_centers WHERE address LIKE ?;';
      const sqlQueryParams = [`%${searchTerm}%`];
  
      db.query(sqlSelect, sqlQueryParams, (err, result) => {
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
  