import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const RecruiterProfile = () => {
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, load from localStorage
    const loadRecruiterProfile = () => {
      try {
        const demoUser = JSON.parse(localStorage.getItem('demoUser'));
        const demoRecruiters = JSON.parse(localStorage.getItem('demoRecruiters')) || [];
        const recruiterData = demoRecruiters.find(r => r.authId === demoUser?.authId);
        
        if (recruiterData) {
          setRecruiter(recruiterData);
        }
      } catch (error) {
        console.error('Error loading recruiter profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecruiterProfile();
  }, []);

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  if (!recruiter) return <div className="no-data">No profile data found</div>;

  return (
    <div className="recruiter-profile">
      {/* Header Section */}
      <div className="profile-header">
        <div className="header-content">
          <div className="avatar-section">
            <div className="company-avatar">
              {recruiter.companyName?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div className="company-info">
              <h1 className="company-name">{recruiter.companyName || 'Not Provided'}</h1>
              <p className="company-email">{recruiter.companyEmail}</p>
              <span className="role-badge recruiter">Recruiter Account</span>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">#{recruiter.id}</span>
              <span className="stat-label">Business ID</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{new Date(recruiter.createdAt).getFullYear()}</span>
              <span className="stat-label">Member Since</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Company Information Card */}
        <div className="info-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">🏢</span>
              Company Information
            </h2>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <label>Location</label>
                  <span className="info-value">{recruiter.location || 'Not Provided'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📋</div>
                <div className="info-content">
                  <label>Registration Number</label>
                  <span className="info-value">{recruiter.registrationNumber || 'Not Provided'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <label>Phone Number</label>
                  <span className="info-value">{recruiter.phoneNumber || 'Not Provided'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-content">
                  <label>Business Email</label>
                  <span className="info-value">{recruiter.companyEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Card */}
        <div className="info-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon">💼</span>
              Business Details
            </h2>
          </div>
          <div className="card-body">
            <div className="details-list">
              <div className="detail-row">
                <span className="detail-label">Company Established</span>
                <span className="detail-value">{new Date(recruiter.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Account Type</span>
                <span className="detail-value tag corporate">Corporate Account</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="detail-value tag active">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          <button className="btn btn-primary">
            <span className="btn-icon">✏️</span>
            Edit Profile
          </button>
          <button className="btn btn-secondary">
            <span className="btn-icon">🔒</span>
            Change Password
          </button>
          <button className="btn btn-outline">
            <span className="btn-icon">📊</span>
            View Analytics
          </button>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .recruiter-profile {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Header Styles */
        .profile-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          margin-bottom: 30px;
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .avatar-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .company-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .company-info h1 {
          margin: 0 0 8px 0;
          font-size: 2.2rem;
          font-weight: 700;
        }

        .company-email {
          margin: 0 0 12px 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .role-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .role-badge.recruiter {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .header-stats {
          display: flex;
          gap: 30px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Content Styles */
        .profile-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid #eaeaea;
          overflow: hidden;
        }

        .card-header {
          padding: 24px 30px;
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
        }

        .card-title {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 600;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-title .icon {
          font-size: 1.6rem;
        }

        .card-body {
          padding: 30px;
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
        }

        .info-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .info-content {
          flex: 1;
        }

        .info-content label {
          display: block;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.9rem;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          display: block;
          color: #2d3748;
          font-size: 1.1rem;
          font-weight: 500;
        }

        /* Details List */
        .details-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-weight: 600;
          color: #4a5568;
        }

        .detail-value {
          color: #2d3748;
          font-weight: 500;
        }

        /* Tags */
        .tag {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .tag.corporate {
          background: #e6fffa;
          color: #234e52;
        }

        .tag.active {
          background: #f0fff4;
          color: #22543d;
        }

        /* Action Buttons */
        .action-section {
          display: flex;
          gap: 15px;
          justify-content: center;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: #6b7280;
          color: white;
        }

        .btn-secondary:hover {
          background: #4b5563;
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #e5e7eb;
          color: #374151;
        }

        .btn-outline:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        /* No Data State */
        .no-data {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
          font-size: 1.1rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .recruiter-profile {
            padding: 15px;
          }

          .header-content {
            flex-direction: column;
            gap: 25px;
            text-align: center;
            padding: 30px 20px;
          }

          .avatar-section {
            flex-direction: column;
            text-align: center;
          }

          .header-stats {
            justify-content: center;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .action-section {
            flex-direction: column;
          }

          .company-avatar {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }

          .company-info h1 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .card-body {
            padding: 20px;
          }

          .info-item {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .detail-row {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default RecruiterProfile;