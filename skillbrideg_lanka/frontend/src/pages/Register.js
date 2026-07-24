import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This page only picks a role and hands off to SeekerSignup/RecruiterSignup,
// which collect email/password and perform the actual registration. It used
// to register the account itself and then redirect into those forms, which
// registered the same email a second time and always failed with "Email
// already taken".
const Register = () => {
  const [role, setRole] = useState('SEEKER');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(role === 'RECRUITER' ? '/signup/recruiter' : '/signup/seeker');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="form-title">Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">I am a</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
              required
            >
              <option value="SEEKER">Job Seeker</option>
              <option value="RECRUITER">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Continue
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;