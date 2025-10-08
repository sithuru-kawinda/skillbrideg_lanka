import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Common/Alert';
import { recruiterService } from '../services/recruiterService'; // Correct path

const RecruiterSignup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    location: '',
    registrationNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Test backend connection on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await recruiterService.testConnection();
        setBackendStatus('connected');
        console.log('✅ Backend is connected and ready');
      } catch (error) {
        setBackendStatus('disconnected');
        console.error('❌ Backend connection failed:', error);
        setAlert({ 
          type: 'error', 
          message: 'Backend service is not available. Please make sure the Recruiter Service is running on port 8081.' 
        });
      }
    };

    checkBackend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: digitsOnly
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    if (!formData.companyName || !formData.companyEmail || !formData.location || 
        !formData.registrationNumber || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
      setAlert({ type: 'error', message: 'Please fill in all fields' });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return false;
    }

    if (formData.password.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters' });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }

    if (formData.phoneNumber.length !== 10) {
      setAlert({ type: 'error', message: 'Phone number must be 10 digits' });
      return false;
    }

    if (formData.companyName.length < 2) {
      setAlert({ type: 'error', message: 'Company name must be at least 2 characters' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    if (backendStatus !== 'connected') {
      setAlert({ 
        type: 'error', 
        message: 'Backend service is not available. Please try again later.' 
      });
      setLoading(false);
      return;
    }

    try {
      console.log('🚀 Starting recruiter registration process...');
      
      // Prepare data for backend (match your RecruiterDTO fields)
      const recruiterData = {
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        location: formData.location,
        registrationNumber: formData.registrationNumber,
        phoneNumber: formData.phoneNumber,
        password: formData.password // Include password for auth service
      };

      console.log('📤 Sending to backend port 8081:', recruiterData);
      
      // 1. Register with Recruiter Service (your backend)
      const recruiterResult = await recruiterService.register(recruiterData);
      console.log('✅ Backend registration successful:', recruiterResult);

      // 2. Register with Authentication Service
      console.log('🔄 Registering with authentication service...');
      const authResult = await register({
        email: formData.companyEmail,
        password: formData.password,
        role: 'RECRUITER'
      });
      
      if (!authResult.success) {
        throw new Error('Authentication registration failed: ' + authResult.message);
      }

      console.log('✅ Auth registration successful');

      // Store in localStorage for demo
      const recruiterProfile = {
        id: recruiterResult.id || Date.now(),
        authId: authResult.authId,
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        location: formData.location,
        registrationNumber: formData.registrationNumber,
        phoneNumber: formData.phoneNumber,
        createdAt: new Date().toISOString()
      };
      
      const existingRecruiters = JSON.parse(localStorage.getItem('demoRecruiters')) || [];
      existingRecruiters.push(recruiterProfile);
      localStorage.setItem('demoRecruiters', JSON.stringify(existingRecruiters));
      
      // Store demo user
      const demoUser = {
        email: formData.companyEmail,
        role: 'RECRUITER',
        authId: authResult.authId,
        companyName: formData.companyName
      };
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-jwt-token-' + Date.now());
      
      setAlert({ 
        type: 'success', 
        message: '🎉 Registration completed successfully! Redirecting to your dashboard...' 
      });
      
      setTimeout(() => {
        navigate('/recruiter/dashboard');
      }, 2000);

    } catch (error) {
      console.error('💥 Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message.includes('Cannot connect to recruiter service')) {
        errorMessage = 'Cannot connect to recruiter service. Please make sure the service is running on port 8081.';
      } else if (error.message.includes('Email already taken') || error.message.includes('already exists')) {
        errorMessage = 'This email is already registered. Please use a different email address.';
      } else if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Network connection failed. Please check your internet connection and make sure all services are running.';
      } else {
        errorMessage = error.message || 'Registration failed. Please try again.';
      }
      
      setAlert({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-icon">🏢</div>
          <h1 className="signup-title">Join as Recruiter</h1>
          <p className="signup-subtitle">
            Create your recruiter account to start hiring talent
          </p>
          
          {/* Backend status indicator */}
          <div className={`backend-status ${backendStatus}`}>
            {backendStatus === 'checking' && '🔄 Checking backend connection...'}
            {backendStatus === 'connected' && '✅ Backend connected'}
            {backendStatus === 'disconnected' && '❌ Backend disconnected'}
          </div>
        </div>
        
        <Alert 
          type={alert.type} 
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🏢</span>
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter company name"
              required
              minLength="2"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📧</span>
              Company Email
            </label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter company email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📍</span>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter company location"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📋</span>
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter business registration number"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📱</span>
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="07XXXXXXXX (10 digits)"
              required
              maxLength="10"
            />
            <div className="form-hint">
              Enter 10-digit phone number without spaces or dashes
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Create a password (min 6 characters)"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">✅</span>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={loading || backendStatus !== 'connected'}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              <>
                Complete Sign Up
                <span className="btn-icon">🎉</span>
              </>
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p className="footer-text">
            Already have an account? <Link to="/login" className="footer-link">Login here</Link>
          </p>
          <p className="footer-text">
            Looking for jobs? <Link to="/signup/seeker" className="footer-link seeker-link">Sign up as Job Seeker</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .backend-status {
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 0.875rem;
          margin-top: 10px;
        }
        
        .backend-status.connected {
          background-color: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        
        .backend-status.disconnected {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        
        .backend-status.checking {
          background-color: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }
        
        .seeker-link {
          color: #059669;
          font-weight: 500;
        }
        
        .form-hint {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s ease-in-out infinite;
          margin-right: 0.5rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default RecruiterSignup;