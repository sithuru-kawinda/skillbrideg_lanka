import React from 'react';
import { useAuth } from '../context/AuthContext';
import SeekerProfile from '../components/Profile/SeekerProfile';
import RecruiterProfile from '../components/Profile/RecruiterProfile';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <LoadingSpinner text="Loading user information..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <h2>User not found</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      {user.role === 'SEEKER' && <SeekerProfile />}
      {user.role === 'RECRUITER' && <RecruiterProfile />}
      {!['SEEKER', 'RECRUITER'].includes(user.role) && (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Unknown User Type</h2>
          <p>Please contact support.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;