const AuditLogHandler = (app, db) => {
    app.get('/view/audit', (req, res) => {
      const { id } = req.query;
      let query = 'SELECT * FROM audit_log';
      
      if (id) {
        query += ` WHERE id LIKE '%${id}%'`;
      }
  
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error fetching audit log' });
        } else {
          res.status(200).send(result);
        }
      });
    });
  };
  
  export default AuditLogHandler;
  