import axios from 'axios';

// Create axios instance with better error handling
const api = axios.create({
  timeout: 30000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service status tracking
const serviceStatus = {
  auth: false,
  recruiter: false,
  seeker: false,
  job: false
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to:`, config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request setup error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response success:', response.status);
    
    // Track service status
    const url = response.config.url;
    if (url.includes('8082')) serviceStatus.auth = true;
    if (url.includes('8081')) serviceStatus.recruiter = true;
    if (url.includes('8086')) serviceStatus.seeker = true;
    if (url.includes('8083')) serviceStatus.job = true;
    
    return response;
  },
  (error) => {
    console.error('❌ API Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    
    // Update service status on error
    const url = error.config?.url;
    if (url) {
      if (url.includes('8082')) serviceStatus.auth = false;
      if (url.includes('8081')) serviceStatus.recruiter = false;
      if (url.includes('8086')) serviceStatus.seeker = false;
      if (url.includes('8083')) serviceStatus.job = false;
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Please check if the backend service is running');
    }
    
    if (!error.response) {
      throw new Error(`Network error - Cannot connect to service at ${error.config?.url}`);
    }
    
    // Extract meaningful error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        error.message ||
                        'Service unavailable';
    
    throw new Error(errorMessage);
  }
);

// Service health check function
export const checkAllServices = async () => {
  const services = [
    { name: 'Authentication', url: API_ENDPOINTS.AUTH.HEALTH },
    { name: 'Recruiter', url: API_ENDPOINTS.RECRUITERS.TEST },
    { name: 'Seeker', url: API_ENDPOINTS.SEEKERS.HEALTH },
    { name: 'Job', url: `${API_ENDPOINTS.JOBS.BASE}/health` }
  ];

  const results = await Promise.allSettled(
    services.map(async (service) => {
      try {
        const response = await api.get(service.url);
        return { 
          name: service.name, 
          status: 'UP', 
          data: response.data 
        };
      } catch (error) {
        return { 
          name: service.name, 
          status: 'DOWN', 
          error: error.message 
        };
      }
    })
  );

  return results.map(result => result.value);
};

export { serviceStatus };
export default api;