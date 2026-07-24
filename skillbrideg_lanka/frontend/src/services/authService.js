import api, { checkAllServices } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { decodeJwtPayload } from '../utils/helpers';

export const authService = {
  async checkServices() {
    return await checkAllServices();
  },

  async login(email, password) {
    try {
      console.log('🔐 Attempting login to:', API_ENDPOINTS.AUTH.LOGIN);
      
      // First check if auth service is available
      try {
        await api.get(API_ENDPOINTS.AUTH.HEALTH);
      } catch (error) {
        throw new Error('Authentication service is not available. Please make sure it\'s running on port 8082.');
      }

      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
        email: email.trim(),
        password: password
      });

      console.log('✅ Login successful:', response.data);
      
      const data = response.data;
      const token = data.token || data?.data?.token;
      
      if (!token) {
        throw new Error('No authentication token received from server');
      }
      
      return {
        token,
        user: {
          email: email,
          role: data.role || 'USER',
          id: data.id ?? null
        }
      };
    } catch (error) {
      console.error('💥 Login error:', error);
      throw new Error(error.message || 'Login failed. Please check your credentials and try again.');
    }
  },

  async register(userData) {
    try {
      console.log('📝 Registering user at:', API_ENDPOINTS.AUTH.REGISTER);
      
      // Check auth service health
      try {
        await api.get(API_ENDPOINTS.AUTH.HEALTH);
      } catch (error) {
        throw new Error('Authentication service is not available. Please make sure it\'s running on port 8082.');
      }

      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
        email: userData.email.trim(),
        password: userData.password,
        role: userData.role
      });

      console.log('✅ Registration successful:', response.data);

      const authId = response.data.authId;

      return { 
        authId: authId,
        user: {
          email: userData.email,
          role: userData.role,
          id: authId
        }
      };
    } catch (error) {
      console.error('💥 Registration error:', error);
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      // Demo profile data (company name, phone, etc.) is stored separately
      // in localStorage and layered on top of the real identity below.
      const demoUser = localStorage.getItem('demoUser');
      const demoProfile = demoUser ? JSON.parse(demoUser) : {};

      const payload = decodeJwtPayload(token);
      if (!payload) {
        // Not a real JWT (or it's unparseable) — nothing to trust but the demo profile.
        return demoUser ? demoProfile : null;
      }

      const role = Array.isArray(payload.role) ? payload.role[0] : payload.role;

      return {
        ...demoProfile,
        email: payload.sub || demoProfile.email,
        role: (role || demoProfile.role || 'USER').replace(/^ROLE_/, ''),
        id: payload.id ?? demoProfile.id ?? null
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
};

export default authService;