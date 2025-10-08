import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../services/jobService';
import JobCard from '../components/Jobs/JobCard';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedJobs = async () => {
      try {
        const jobs = await jobService.getAllJobs();
        setFeaturedJobs(jobs.slice(0, 6));
      } catch (error) {
        console.error('Error loading featured jobs:', error);
        // create some mock jobs
        setFeaturedJobs([
          {
            jobId: 1,
            jobName: 'Frontend Developer',
            jobDescription: 'We are looking for a skilled Frontend Developer to join our team...',
            level: 'SENIOR',
            salary: 120000,
            durationinmonths: 12,
            recruiter: { companyName: 'Tech Solutions Ltd' }
          },
          {
            jobId: 2,
            jobName: 'Backend Engineer',
            jobDescription: 'Join our backend team to build scalable APIs and services...',
            level: 'MID',
            salary: 100000,
            durationinmonths: 24,
            recruiter: { companyName: 'Data Systems Inc' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedJobs();
  }, []);

  return (
    <div>
      <section className="header">
        <div className="container">
          <h1>Find Your Dream Job in Sri Lanka</h1>
          <p>Connect with top employers and discover opportunities that match your skills</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/jobs" className="btn btn-primary" style={{ padding: '16px 32px' }}>
              Browse Jobs
            </Link>
            <Link to="/signup/seeker" className="btn btn-secondary" style={{ padding: '16px 32px' }}>
              Join as Job Seeker
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2.5rem' }}>
            Featured Jobs
          </h2>
          
          {loading ? (
            <div className="loading">
              <div>Loading jobs...</div>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {featuredJobs.map(job => (
                <JobCard key={job.jobId} job={job} />
              ))}
            </div>
          )}

          {!loading && featuredJobs.length === 0 && (
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <p>No jobs available at the moment. Check back later!</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/jobs" className="btn btn-secondary">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2.5rem' }}>
            Why Choose SkillBridge Lanka?
          </h2>
          <div className="grid grid-cols-3">
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
              <h3 style={{ marginBottom: '16px' }}>Fast Matching</h3>
              <p>Get matched with relevant job opportunities based on your skills and preferences</p>
            </div>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💼</div>
              <h3 style={{ marginBottom: '16px' }}>Top Companies</h3>
              <p>Connect with leading companies and startups across Sri Lanka</p>
            </div>
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ marginBottom: '16px' }}>Secure Platform</h3>
              <p>Your data is protected with enterprise-grade security measures</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;