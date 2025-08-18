import React from 'react';
import './ChoosePathPage.css';
import { Link } from 'react-router-dom';

const ChoosePathPage = () => {
  return (
    <div className="choose-path-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="title">Choose Your Path</h1>
          <p className="subtitle">Select your role to get started with finding opportunities or posting jobs</p>
        </div>

        {/* Cards Container */}
        <div className="cards-container">
          {/* Student Card */}
          <div className="card student-card">
            <div className="card-content">
              {/* Student Icon */}
              <div className="icon-container student-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              
              <h2 className="card-title">I'm a Student</h2>
              <p className="card-description">
                Looking for job opportunities for O/L or A/L exams
              </p>

              {/* Features List */}
              <div className="features-list">
                <div className="feature-item">
                  <div className="bullet orange-bullet"></div>
                  <span>Find temporary job opportunities</span>
                </div>
                <div className="feature-item">
                  <div className="bullet orange-bullet"></div>
                  <span>Gain work experience</span>
                </div>
                <div className="feature-item">
                  <div className="bullet orange-bullet"></div>
                  <span>Earn while you wait for results</span>
                </div>
                <div className="feature-item">
                  <div className="bullet pink-bullet"></div>
                  <span>Build your professional network</span>
                </div>
              </div>

              {/* Student Button */}
              <button className="cta-button student-button">
                Join as Student
                <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Recruiter Card */}
          <div className="card recruiter-card">
            <div className="card-content">
              {/* Recruiter Icon */}
              <div className="icon-container recruiter-icon">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              
              <h2 className="card-title">I'm a Recruiter</h2>
              <p className="card-description">
                Looking to hire talented students for temporary positions
              </p>

              {/* Features List */}
              <div className="features-list">
                <div className="feature-item">
                  <div className="bullet pink-bullet"></div>
                  <span>Access to motivated students</span>
                </div>
                <div className="feature-item">
                  <div className="bullet pink-bullet"></div>
                  <span>Post job opportunities easily</span>
                </div>
                <div className="feature-item">
                  <div className="bullet green-bullet"></div>
                  <span>Manage applications efficiently</span>
                </div>
                <div className="feature-item">
                  <div className="bullet orange-bullet"></div>
                  <span>Build future talent pipeline</span>
                </div>
              </div>

              {/* Recruiter Button */}
              <button className="cta-button recruiter-button">
                Join as Recruiter
                <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="login-section">
          <p className="login-text">
            Already have an account?{' '}
            <Link to='/login'>
              <button className="login-link">
                 Login here
               </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePathPage;