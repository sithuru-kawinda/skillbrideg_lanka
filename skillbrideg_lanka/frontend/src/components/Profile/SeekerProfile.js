import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const SeekerProfile = () => {
  const [seeker, setSeeker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, load from localStorage
    const loadSeekerProfile = () => {
      try {
        const demoUser = JSON.parse(localStorage.getItem('demoUser'));
        const demoSeekers = JSON.parse(localStorage.getItem('demoSeekers')) || [];
        const seekerData = demoSeekers.find(s => s.authID === demoUser?.authId);
        
        if (seekerData) {
          setSeeker(seekerData);
        }
      } catch (error) {
        console.error('Error loading seeker profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSeekerProfile();
  }, []);

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  if (!seeker) return <div>No profile data found</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {seeker.fullName?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="profile-info">
          <h1>{seeker.fullName || 'Not Provided'}</h1>
          <p className="profile-email">{seeker.email}</p>
          <div className="profile-badge seeker-badge">Job Seeker</div>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-section">
          <h3>Personal Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>NIC Number:</label>
              <span>{seeker.nic || 'Not Provided'}</span>
            </div>
            <div className="detail-item">
              <label>Phone Number:</label>
              <span>{seeker.phoneNumber || 'Not Provided'}</span>
            </div>
            <div className="detail-item">
              <label>Qualification:</label>
              <span>{seeker.qualification || 'Not Provided'}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Account Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Member Since:</label>
              <span>{new Date(seeker.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <label>Profile ID:</label>
              <span>#{seeker.id}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          color: white;
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
        }
        
        .profile-info h1 {
          margin: 0 0 8px 0;
          font-size: 2rem;
        }
        
        .profile-email {
          margin: 0 0 12px 0;
          opacity: 0.9;
        }
        
        .profile-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .seeker-badge {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        
        .detail-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        
        .detail-section h3 {
          margin: 0 0 20px 0;
          color: #1f2937;
          font-size: 1.3rem;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 12px;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .detail-item label {
          font-weight: 600;
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        .detail-item span {
          color: #1f2937;
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SeekerProfile;