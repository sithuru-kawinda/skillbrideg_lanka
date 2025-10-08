import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';
import Alert from '../components/Common/Alert';

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobName: '',
    jobDescription: '',
    jobStatus: 'OPEN',
    level: 'JUNIOR',
    durationinmonths: 12,
    salary: '',
    recruiterID: 1
  });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.role !== 'RECRUITER') {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Only recruiters can post jobs.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const jobData = {
        ...formData,
        durationinmonths: parseInt(formData.durationinmonths),
        salary: parseInt(formData.salary),
        recruiterID: 1
      };

      await jobService.createJob(jobData);
      
      setAlert({ type: 'success', message: 'Job posted successfully!' });
      
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);
    } catch (error) {
      console.error('Error posting job:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'Failed to post job' 
      });
    } finally {
      setLoading(false);
    }
  };

  const levels = ['JUNIOR', 'MID', 'SENIOR', 'LEAD', 'MANAGER'];
  const jobStatuses = ['OPEN', 'CLOSED', 'DRAFT'];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Post a New Job</h1>
      
      <div className="card">
        <Alert 
          type={alert.type} 
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Job Description *</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="form-input"
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              rows="6"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Job Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="form-input"
                required
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Job Status *</label>
              <select
                name="jobStatus"
                value={formData.jobStatus}
                onChange={handleChange}
                className="form-input"
                required
              >
                {jobStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Duration (months) *</label>
              <input
                type="number"
                name="durationinmonths"
                value={formData.durationinmonths}
                onChange={handleChange}
                className="form-input"
                min="1"
                max="60"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Salary (LKR) *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 150000"
                min="0"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '24px' }}
            disabled={loading}
          >
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;