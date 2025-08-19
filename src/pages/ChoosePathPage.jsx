import React from 'react';
import './ChoosePathPage.css';
import { Link } from 'react-router-dom';

const ChoosePathPage = () => {
  return (
    <div className="choose-path-container">
      <div className="choose-path-wrapper">
        {/* Header */}
        <div className="header-section">
          <h1 className="main-title">Choose Your Path</h1>
          <p className="subtitle">
            Select your role to get started with finding opportunities or posting jobs
          </p>
        </div>

        {/* Path Cards */}
        <div className="cards-grid">
          {/* Student Card */}
          <div className="path-card student-card">
            <div className="card-header">
              <div className="icon-wrapper student-icon">
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
                  />
                </svg>
              </div>
              <h2 className="card-title">I'm a Student</h2>
              <p className="card-description">
                Looking for job opportunities after O/L, A/L exams
              </p>
            </div>

            {/* Student Benefits */}
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="bullet-point student-bullet"></div>
                <span className="benefit-text">Find temporary job opportunities</span>
              </div>
              <div className="benefit-item">
                <div className="bullet-point student-bullet"></div>
                <span className="benefit-text">Gain work experience</span>
              </div>
               <div className="benefit-item">
                <div className="bullet-point student-bullet"></div>
                <span className="benefit-text">Earn while you wait for results</span>
              </div>
              <div className="benefit-item">
                <div className="bullet-point student-bullet"></div>
                <span className="benefit-text">Build your professional network</span>
              </div>
            </div>

            {/* Student Button */}
            <button className="cta-button student-button">
              <span>Join as Student</span>
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Recruiter Card */}
          <div className="path-card recruiter-card">
            <div className="card-header">
              <div className="icon-wrapper recruiter-icon">
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <h2 className="card-title">I'm a Recruiter</h2>
              <p className="card-description">
                Looking to hire talented students for temporary positions
              </p>
            </div>

            {/* Recruiter Benefits */}
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="bullet-point recruiter-bullet"></div>
                <span className="benefit-text">Access to motivated students</span>
              </div>
              <div className="benefit-item">
                <div className="bullet-point recruiter-bullet"></div>
                <span className="benefit-text">Post job opportunities easily</span>
              </div>
              <div className="benefit-item">
                <div className="bullet-point recruiter-bullet"></div>
                <span className="benefit-text">Manage applications efficiently</span>
              </div>
              <div className="benefit-item">
                <div className="bullet-point recruiter-bullet"></div>
                <span className="benefit-text">Find fresh talent pool</span>
              </div>
            </div>

            {/* Recruiter Button */}
            <button className="cta-button recruiter-button">
              <span>Join as Recruiter</span>
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <p className="footer-text">
            Already have an account?{' '}
            <Link to ='/login' className="login-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePathPage;