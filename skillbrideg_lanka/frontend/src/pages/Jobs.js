import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../services/jobService';
import JobCard from '../components/Jobs/JobCard';
import JobFilter from '../components/Jobs/JobFilter';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    jobName: ''
  });

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, filters]);

  const loadJobs = async () => {
    try {
      const jobsData = await jobService.getAllJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
      // For demo, create some mock jobs
      setJobs([
        {
          jobId: 1,
          jobName: 'Frontend Developer',
          jobDescription: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks.',
          level: 'SENIOR',
          salary: 120000,
          durationinmonths: 12,
          jobStatus: 'OPEN',
          recruiter: { companyName: 'Tech Solutions Ltd' }
        },
        {
          jobId: 2,
          jobName: 'Backend Engineer',
          jobDescription: 'Join our backend team to build scalable APIs and services. Experience with Node.js, Python, and database design required.',
          level: 'MID',
          salary: 100000,
          durationinmonths: 24,
          jobStatus: 'OPEN',
          recruiter: { companyName: 'Data Systems Inc' }
        },
        {
          jobId: 3,
          jobName: 'DevOps Specialist',
          jobDescription: 'Looking for DevOps engineer to manage our cloud infrastructure and CI/CD pipelines. AWS and Docker experience preferred.',
          level: 'SENIOR',
          salary: 150000,
          durationinmonths: 18,
          jobStatus: 'OPEN',
          recruiter: { companyName: 'Cloud Tech' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.jobName.toLowerCase().includes(searchLower) ||
        job.jobDescription.toLowerCase().includes(searchLower)
      );
    }

    if (filters.level) {
      filtered = filtered.filter(job => job.level === filters.level);
    }

    if (filters.jobName) {
      filtered = filtered.filter(job => job.jobName === filters.jobName);
    }

    setFilteredJobs(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      level: '',
      jobName: ''
    });
  };

  const uniqueLevels = [...new Set(jobs.map(job => job.level))];
  const uniqueJobNames = [...new Set(jobs.map(job => job.jobName))];

  return (
    <div>
      <section className="search-section">
        <div className="container">
          <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Find Your Perfect Job</h1>
          
          <JobFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            uniqueLevels={uniqueLevels}
            uniqueJobNames={uniqueJobNames}
          />
        </div>
      </section>

      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          {loading ? (
            <LoadingSpinner text="Loading jobs..." />
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2>
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Available
                </h2>
              </div>

              <div className="grid grid-cols-2">
                {filteredJobs.map(job => (
                  <JobCard key={job.jobId} job={job} />
                ))}
              </div>

              {filteredJobs.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
                  <h3>No jobs found</h3>
                  <p>Try adjusting your search filters or check back later for new opportunities.</p>
                  <button 
                    onClick={clearFilters}
                    className="btn btn-primary"
                    style={{ marginTop: '16px' }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;