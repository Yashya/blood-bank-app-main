const ViewRequestsHandler = (app, db) => {
  app.get('/view/requests', (req, res) => {
    // Extract query parameters
    const { requestId, patientId } = req.query;

    // Build the WHERE clause directly
    let whereCondition = '';
    if (requestId) {
      whereCondition = `WHERE request_id LIKE '%${requestId}%'`;
    }
    if (patientId) {
      whereCondition = whereCondition ? `${whereCondition} AND patient_id LIKE '%${patientId}%'` : `WHERE patient_id LIKE '%${patientId}%'`;
    }

    // Construct the query with the WHERE condition
    const query = `SELECT * FROM request_blood ${whereCondition}`;

    // Execute the query
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Error fetching requests' });
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.put('/update/request/:requestId', (req, res) => {
    const { requestId } = req.params;
    const { blood_group, required_quantity, status } = req.body;

    const query = `
      UPDATE request_blood
      SET blood_group = ?, required_quantity = ?, status = ?
      WHERE request_id = ?;
    `;

    db.query(query, [blood_group, required_quantity, status, requestId], (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Error updating request' });
      } else {
        res.status(200).send({ message: 'Request updated successfully' });
      }
    });
  });
};

export default ViewRequestsHandler;
