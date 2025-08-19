import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Mail, Eye, Download, MessageSquare } from 'lucide-react';

import './RecruiterDashboard.css'
const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('My Jobs');
  const [dashboardData, setDashboardData] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    newApplications: 0
  });
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: '',
    location: '',
    duration: '',
    educationLevel: '',
    monthlyStipend: '',
    description: '',
    requirements: ''
  });

  // Fetch dashboard statistics
  useEffect(() => {
    fetchDashboardStats();
    fetchApplicants();
    fetchJobs();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await fetch('/api/applicants');
      const data = await response.json();
      setApplicants(data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitJob = async () => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobForm),
      });
      
      if (response.ok) {
        // Reset form and refresh data
        setJobForm({
          title: '',
          location: '',
          duration: '',
          educationLevel: '',
          monthlyStipend: '',
          description: '',
          requirements: ''
        });
        fetchJobs();
        fetchDashboardStats();
        setActiveTab('My Jobs');
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderMyJobs = () => (
    <div className="tab-content">
      <div className="content-header">
        <h2>Posted Jobs</h2>
        <button 
          className="btn-primary"
          onClick={() => setActiveTab('Post New Job')}
        >
          + Post New Job
        </button>
      </div>
      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-info">
              <h3>{job.title}</h3>
              <div className="job-details">
                <span className="location">📍 {job.location}</span>
                <span className="salary">💰 Rs. {job.monthlyStipend}</span>
                <span className="duration">⏱️ {job.duration}</span>
                <span className="posted-date">Posted: {formatDate(job.createdAt)}</span>
              </div>
              <span className={`status ${job.status?.toLowerCase()}`}>
                {job.status}
              </span>
            </div>
            <div className="job-stats">
              <div className="applicant-count">
                <span className="count">{job.applicantCount || 0}</span>
                <span className="label">applicants</span>
              </div>
              <span className={`job-status ${job.isActive ? 'active' : 'inactive'}`}>
                {job.isActive ? 'active' : 'inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicants = () => (
    <div className="tab-content">
      <h2>Job Applicants</h2>
      <div className="applicants-list">
        {applicants.map((applicant) => (
          <div key={applicant.id} className="applicant-card">
            <div className="applicant-info">
              <h3>{applicant.name}</h3>
              <p className="position">Applied for: {applicant.position}</p>
              <div className="applicant-details">
                <span className="email">✉️ {applicant.email}</span>
                <span className="applied-date">Applied: {formatDate(applicant.appliedAt)}</span>
              </div>
              <span className={`status ${applicant.status?.toLowerCase()}`}>
                {applicant.status}
              </span>
            </div>
            <div className="applicant-actions">
              <button className="action-btn view">
                <Eye size={16} />
              </button>
              <button className="action-btn download">
                <Download size={16} />
              </button>
              <button className="action-btn message">
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPostNewJob = () => (
    <div className="tab-content">
      <h2>Post New Job</h2>
      <div className="job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobForm.title}
            onChange={handleInputChange}
            placeholder="e.g. Customer Service Assistant"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={jobForm.location}
              onChange={handleInputChange}
              placeholder="e.g. Colombo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="educationLevel">Education Level Required</label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={jobForm.educationLevel}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Education Level</option>
              <option value="high_school">High School</option>
              <option value="diploma">Diploma</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={jobForm.duration}
              onChange={handleInputChange}
              placeholder="e.g. 3 months"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="monthlyStipend">Monthly Stipend</label>
            <input
              type="number"
              id="monthlyStipend"
              name="monthlyStipend"
              value={jobForm.monthlyStipend}
              onChange={handleInputChange}
              placeholder="e.g. 25000"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobForm.description}
            onChange={handleInputChange}
            placeholder="Describe the job role and responsibilities..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={jobForm.requirements}
            onChange={handleInputChange}
            placeholder="List the job requirements (experience, skills, etc.)..."
            rows="3"
            required
          />
        </div>

        <button type="button" onClick={handleSubmitJob} className="btn-submit">
          + Post Job
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
        <p>Tech Solutions Lanka - Manage your job postings and applications</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon briefcase">
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Jobs</span>
            <span className="stat-value">{dashboardData.activeJobs}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Applicants</span>
            <span className="stat-value">{dashboardData.totalApplicants}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon mail">
            <Mail size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">New Applications</span>
            <span className="stat-value">{dashboardData.newApplications}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="tab-navigation">
          {['My Jobs', 'Post New Job', 'Applicants'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content-wrapper">
          {activeTab === 'My Jobs' && renderMyJobs()}
          {activeTab === 'Applicants' && renderApplicants()}
          {activeTab === 'Post New Job' && renderPostNewJob()}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;