import axios from 'axios';

const API_BASE_URL = 'http://localhost:8086/seekers'; 

// Create axios instance with better error handling
const seekerApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

seekerApi.interceptors.request.use(
  (config) => {
    console.log('🚀 Making seeker API request to:', config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Seeker request setup error:', error);
    return Promise.reject(error);
  }
);

seekerApi.interceptors.response.use(
  (response) => {
    console.log('✅ Seeker API Response success:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Seeker API Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Seeker service not responding');
    }
    
    if (!error.response) {
      throw new Error('Cannot connect to seeker service. Please make sure it\'s running on port 8086.');
    }
    
    // Extract error message from response
    const errorMessage = error.response?.data?.message || 
                        error.response?.data ||
                        error.message ||
                        'Seeker registration failed';
    
    throw new Error(errorMessage);
  }
);

export const seekerService = {
  async registerSeeker(seekerData) {
    try {
      console.log('📤 Sending seeker registration data to port 8086:', { 
        ...seekerData, 
        password: '***' 
      });
      
      const response = await seekerApi.post('/register', seekerData);
      console.log('✅ Seeker registration successful:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('💥 Seeker registration error:', error);
      throw error;
    }
  },

  async testConnection() {
    try {
      const response = await seekerApi.get('/test');
      return response.data;
    } catch (error) {
      throw new Error('Seeker service connection test failed: ' + error.message);
    }
  },

  async getSeekerById(seekerId) {
    const response = await seekerApi.get(`/${seekerId}`);
    return response.data;
  }
};

export default seekerService;