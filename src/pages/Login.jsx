// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
    // Add navigation logic here
  };

  return (
    <div className="login-container">
      <div className="login-card">
       <Link to='/'>
       <button className="back-arrow" onClick={handleBackClick}>
          ←
        </button>
       </Link> 
        
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
        </div>
        
        <p className="login-subtitle">Sign in to continue your journey</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        
        <div className="register-link">
          Don't have an account? <a href="#register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;