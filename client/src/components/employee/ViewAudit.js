import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAudit = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = (id = '') => {
    axios.get(`http://localhost:3001/view/audit?id=${id}`)
      .then(response => {
        setAuditLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching audit log:', error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearch = () => {
    fetchAuditLogs(searchId);
  };

  return (
    <div>
      <h2>Audit Log</h2>
      <div>
        <input
          type="text"
          placeholder="Search by AUID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Sample ID</th>
            <th>Request ID</th>
            <th>Center ID</th>
            <th>Action</th>
            <th>Blood Group</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
  {auditLogs.map(log => (
    <tr key={log.id}>
      <td>{log.id}</td>
      <td>{log.sample_id}</td>
      <td>{log.request_id}</td>
      <td>{log.center_id}</td>
      <td>{log.action}</td>
      <td>{log.blood_group}</td>
      <td>{new Date(log.timestamp).toLocaleString()}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default ViewAudit;
