import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import jobService from '../services/jobService';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    try {
      const jobData = await jobService.getJobWithRecruiter(id);
      setJob(jobData);
    } catch (error) {
      console.error('Error loading job details:', error);
      // For demo, create mock data
      setJob({
        job: {
          jobId: id,
          jobName: 'Frontend Developer',
          jobDescription: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks. The ideal candidate should have experience with state management, API integration, and performance optimization.',
          level: 'SENIOR',
          salary: 120000,
          durationinmonths: 12,
          jobStatus: 'OPEN'
        },
        recruiter: {
          companyName: 'Tech Solutions Ltd',
          companyEmail: 'hr@techsolutions.com',
          location: 'Colombo, Sri Lanka',
          phoneNumber: '+94 11 2345678'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <LoadingSpinner text="Loading job details..." />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <h2>Job Not Found</h2>
          <p>{error || 'The job you are looking for does not exist.'}</p>
          <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Link to="/jobs" style={{ color: '#3b82f6', textDecoration: 'none', marginBottom: '24px', display: 'inline-block' }}>
        ← Back to Jobs
      </Link>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{job.job?.jobName}</h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '16px' }}>
              {job.recruiter?.companyName || 'Unknown Company'}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>
              LKR {job.job?.salary?.toLocaleString()}
            </div>
            <div className="job-tag" style={{ fontSize: '1rem' }}>
              {job.job?.level}
            </div>
          </div>
        </div>

        <div className="job-meta" style={{ marginBottom: '32px' }}>
          <span className="job-tag" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
            {job.job?.durationinmonths} months duration
          </span>
          <span className="job-tag" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
            {job.job?.jobStatus}
          </span>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>Job Description</h2>
          <p style={{ lineHeight: '1.8', color: '#4b5563' }}>
            {job.job?.jobDescription}
          </p>
        </div>

        {job.recruiter && (
          <div className="card" style={{ backgroundColor: '#f8fafc', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginBottom: '16px' }}>Recruiter Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div>
                <strong>Company:</strong> {job.recruiter.companyName}
              </div>
              <div>
                <strong>Email:</strong> {job.recruiter.companyEmail}
              </div>
              <div>
                <strong>Location:</strong> {job.recruiter.location}
              </div>
              <div>
                <strong>Phone:</strong> {job.recruiter.phoneNumber}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #e5e7eb' }}>
          <button className="btn btn-primary" style={{ marginRight: '16px' }}>
            Apply Now
          </button>
          <button className="btn btn-secondary">
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};
  
export default JobDetails;