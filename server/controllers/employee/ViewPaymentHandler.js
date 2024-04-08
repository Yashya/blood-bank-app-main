const ViewPaymentsHandler = (app, db) => {
    app.get('/view/payments', (req, res) => {
      const { paymentId, requestId } = req.query;
      let query = 'SELECT * FROM payments';
      
      if (paymentId || requestId) {
        query += ' WHERE';
        if (paymentId) {
          query += ` payment_id LIKE '%${paymentId}%'`;
        }
        if (paymentId && requestId) {
          query += ' AND';
        }
        if (requestId) {
          query += ` request_id LIKE '%${requestId}%'`;
        }
      }
  
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error fetching payments' });
        } else {
          res.status(200).send(result);
        }
      });
    });
  };
  
  export default ViewPaymentsHandler;
  