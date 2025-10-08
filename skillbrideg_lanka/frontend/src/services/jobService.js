import { API_ENDPOINTS } from '../utils/constants';

export const jobService = {
  async getAllJobs() {
    try {
      console.log('🔍 Fetching all jobs from:', API_ENDPOINTS.JOBS.ALL);
      const response = await fetch(API_ENDPOINTS.JOBS.ALL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response not OK:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Jobs data received:', data);
      return data;
    } catch (error) {
      console.error('💥 Error fetching jobs:', error);
      throw new Error(error.message || 'Failed to fetch jobs');
    }
  },

  async getJobsByLevel(level) {
    try {
      const response = await fetch(`${API_ENDPOINTS.JOBS.BY_LEVEL}/${level}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs by level: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs by level:', error);
      throw error;
    }
  },

  async getJobWithRecruiter(jobId) {
    try {
      console.log('🔍 Fetching job with recruiter for ID:', jobId);
      const response = await fetch(`${API_ENDPOINTS.JOBS.WITH_RECRUITER}/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response not OK:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Job with recruiter data:', data);
      return data;
    } catch (error) {
      console.error('💥 Error fetching job with recruiter:', error);
      throw new Error(error.message || 'Failed to fetch job details');
    }
  },

  async createJob(jobData) {
    try {
      console.log('🚀 Creating job:', jobData);
      
      // Get token from localStorage for authenticated requests
      const token = localStorage.getItem('token');
      
      const response = await fetch(API_ENDPOINTS.JOBS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(jobData)
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response not OK:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Job created successfully:', data);
      return data;
    } catch (error) {
      console.error('💥 Error creating job:', error);
      throw new Error(error.message || 'Failed to create job');
    }
  }
};

export default jobService;