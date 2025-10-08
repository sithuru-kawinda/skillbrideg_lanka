import React, { useState } from 'react';
import jobService from '../services/jobService';

const TestConnection = () => {
  const [status, setStatus] = useState('');
  const [jobs, setJobs] = useState([]);

  const testBackendConnection = async () => {
    try {
      setStatus('Testing connection...');
      const jobsData = await jobService.getAllJobs();
      setJobs(jobsData);
      setStatus(`✅ Success! Found ${jobsData.length} jobs`);
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Backend Connection Test</h3>
      <button onClick={testBackendConnection} className="btn btn-primary">
        Test Backend Connection
      </button>
      <p>{status}</p>
      {jobs.length > 0 && (
        <div>
          <h4>Jobs from Backend:</h4>
          <pre>{JSON.stringify(jobs, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestConnection;