import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Common/Alert';

const SeekerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nic: '',
    phoneNumber: '',
    qualification: 'BACHELORS',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const { register, login } = useAuth();
  const navigate = useNavigate();

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
    if (!formData.fullName || !formData.email || !formData.nic || 
        !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
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

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }

    if (formData.phoneNumber.length !== 10) {
      setAlert({ type: 'error', message: 'Phone number must be 10 digits' });
      return false;
    }

    if (formData.nic.length < 10) {
      setAlert({ type: 'error', message: 'NIC must be at least 10 characters' });
      return false;
    }

    if (formData.fullName.length < 2) {
      setAlert({ type: 'error', message: 'Full name must be at least 2 characters' });
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

    let authId = null;

    try {
      console.log('🚀 Starting seeker registration...');
      
      // 1. FIRST register with Seeker Service (without auth dependency)
      const seekerData = {
        fullName: formData.fullName,
        email: formData.email,
        nic: formData.nic,
        phoneNumber: formData.phoneNumber,
        qualification: formData.qualification,
        password: formData.password // Send password for auth registration
      };

      console.log('📤 Sending seeker data to backend:', seekerData);
      
      const seekerResponse = await fetch('http://localhost:8086/seekers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seekerData)
      });

      console.log('📡 Seeker service response status:', seekerResponse.status);

      if (!seekerResponse.ok) {
        const errorText = await seekerResponse.text();
        console.error('❌ Seeker service error:', errorText);
        
        if (errorText.includes('already exists') || errorText.includes('already taken')) {
          throw new Error('EMAIL_ALREADY_EXISTS');
        } else {
          throw new Error(errorText || 'Registration failed with seeker service');
        }
      }

      const seekerResult = await seekerResponse.json();
      console.log('✅ Seeker service registration successful:', seekerResult);

      authId = seekerResult.seeker?.authID;

      // 2. THEN register with Authentication Service (if not handled by seeker service)
      if (!authId) {
        console.log('🔄 Registering with authentication service...');
        const authResult = await register({
          email: formData.email,
          password: formData.password,
          role: 'SEEKER'
        });

        if (!authResult.success) {
          throw new Error(authResult.message);
        }
        authId = authResult.user?.id;
      } else {
        // SeekerService already created the Authentication-Service account for
        // us — log in to get a real JWT and populate AuthContext's session
        // state (register() above only runs on the other branch).
        const loginResult = await login(formData.email, formData.password);
        if (!loginResult.success) {
          throw new Error(loginResult.message);
        }
      }

      // Store in localStorage for demo
      const seekerProfile = {
        id: seekerResult.seeker?.id || Date.now(),
        authID: authId,
        fullName: formData.fullName,
        email: formData.email,
        nic: formData.nic,
        phoneNumber: formData.phoneNumber,
        qualification: formData.qualification,
        createdAt: new Date().toISOString()
      };
      
      const existingSeekers = JSON.parse(localStorage.getItem('demoSeekers')) || [];
      existingSeekers.push(seekerProfile);
      localStorage.setItem('demoSeekers', JSON.stringify(existingSeekers));
      
      // Store demo profile fields (fullName, phoneNumber, etc.) that the real
      // JWT doesn't carry. AuthContext.login()/register() above already set
      // the real token, so this must not touch localStorage.token.
      const demoUser = {
        email: formData.email,
        role: 'SEEKER',
        authId: authId
      };
      localStorage.setItem('demoUser', JSON.stringify(demoUser));


      setAlert({ 
        type: 'success', 
        message: '🎉 Registration completed successfully! Redirecting to your profile...' 
      });
      
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (error) {
      console.error('💥 Registration error:', error);

      // Note: if the seeker profile save failed after Authentication-Service
      // already created the account (authId is set here), that auth account
      // is orphaned — there's no cross-service rollback endpoint to clean it
      // up. SeekerService now checks for duplicate email/nic before calling
      // Authentication-Service at all, which avoids the common case.

      // Better error messages
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        setAlert({ 
          type: 'error', 
          message: 'This email is already registered. Please use a different email address or try logging in.' 
        });
      } else if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        setAlert({ 
          type: 'error', 
          message: 'Cannot connect to backend services. Please make sure the Seeker Service is running on port 8086.' 
        });
      } else {
        setAlert({ 
          type: 'error', 
          message: error.message || 'Registration failed. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-icon">👨‍💼</div>
          <h1 className="signup-title">Join as Job Seeker</h1>
          <p className="signup-subtitle">
            Create your account to explore job opportunities
          </p>
        </div>

        <Alert 
          type={alert.type} 
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">👤</span>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
              required
              minLength="2"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📧</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🆔</span>
              NIC Number
            </label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your NIC number"
              required
              minLength="10"
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
              <span className="label-icon">🎓</span>
              Highest Qualification
            </label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="A/L">A/L</option>
              <option value="OND">Ordinary National Diploma</option>
              <option value="HND">Higher National Diploma</option>
              <option value="BACHELORS">Bachelor's Degree</option>
              <option value="MASTERS">Master's Degree</option>
              <option value="PHD">PhD</option>
              <option value="DIPLOMA">Diploma</option>
              <option value="CERTIFICATE">Certificate</option>
              <option value="OTHER">Other</option>
            </select>
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
            disabled={loading}
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
            Looking to hire? <Link to="/signup/recruiter" className="footer-link recruiter-link">Sign up as Recruiter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeekerSignup;