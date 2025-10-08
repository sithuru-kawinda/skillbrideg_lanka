import React from 'react';
import { Link } from 'react-router-dom';
import { formatSalary } from '../../utils/helpers';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.jobName}</h3>
      <p className="job-company">
        {job.recruiter?.companyName || 'Unknown Company'}
      </p>
      
      <div className="job-meta">
        <span className="job-tag">{job.level}</span>
        <span className="job-salary">{formatSalary(job.salary)}</span>
        {job.durationinmonths && (
          <span className="job-tag" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
            {job.durationinmonths} months
          </span>
        )}
      </div>
      
      <p style={{ color: '#6b7280', marginBottom: '16px', lineHeight: '1.5', flex: 1 }}>
        {job.jobDescription?.substring(0, 120)}...
      </p>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link 
          to={`/jobs/${job.jobId}`} 
          className="btn btn-primary"
          style={{ flex: 1, textAlign: 'center' }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;