export const recruiterService = {
  async testConnection() {
    try {
      console.log('🔍 Testing connection to Recruiter Service...');
      
      // Test the health endpoint directly
      const response = await fetch('http://localhost:8081/api/recruiters/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend connected:', data);
        return data;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      throw new Error('Cannot connect to recruiter service: ' + error.message);
    }
  },

  async register(recruiterData) {
    try {
      console.log('📤 Sending registration to Recruiter Service...');
      
      const response = await fetch('http://localhost:8081/api/recruiters/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruiterData)
      });
      
      console.log('📡 Registration response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Registration successful:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  }
};