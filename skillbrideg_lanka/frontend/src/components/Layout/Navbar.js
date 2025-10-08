import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeAllMenus}>
            <div className="logo-wrapper">
              <span className="logo-icon">💼</span>
              <span className="logo-text">SkillBridge Lanka</span>
            </div>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          </button>

          <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link 
              to="/" 
              className="nav-link"
              onClick={closeAllMenus}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="nav-link"
              onClick={closeAllMenus}
            >
              <span className="nav-icon">🔍</span>
              Find Jobs
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'RECRUITER' && (
                  <Link 
                    to="/post-job" 
                    className="nav-link highlight"
                    onClick={closeAllMenus}
                  >
                    <span className="nav-icon">📝</span>
                    Post Job
                  </Link>
                )}
                
                <div className="nav-dropdown">
                  <button 
                    className="user-menu-btn"
                    onClick={toggleDropdown}
                  >
                    <div className="user-avatar">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-name">
                      {user?.email?.split('@')[0]}
                    </span>
                    <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={closeAllMenus}
                      >
                        <span className="dropdown-icon">👤</span>
                        My Profile
                      </Link>
                      {user?.role === 'RECRUITER' && (
                        <Link 
                          to="/my-jobs" 
                          className="dropdown-item"
                          onClick={closeAllMenus}
                        >
                          <span className="dropdown-icon">📋</span>
                          My Jobs
                        </Link>
                      )}
                      {user?.role === 'SEEKER' && (
                        <Link 
                          to="/my-applications" 
                          className="dropdown-item"
                          onClick={closeAllMenus}
                        >
                          <span className="dropdown-icon">📄</span>
                          My Applications
                        </Link>
                      )}
                      <div className="dropdown-divider"></div>
                      <button 
                        onClick={handleLogout}
                        className="dropdown-item logout-btn"
                      >
                        <span className="dropdown-icon">🚪</span>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="nav-link login-btn"
                  onClick={closeAllMenus}
                >
                  <span className="nav-icon">🔑</span>
                  Login
                </Link>

                <div className="nav-dropdown">
                  <button 
                    className="signup-dropdown-btn"
                    onClick={toggleDropdown}
                  >
                    <span className="nav-icon">✨</span>
                    Sign Up
                    <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <Link 
                        to="/signup/recruiter" 
                        className="dropdown-item recruiter-option"
                        onClick={closeAllMenus}
                      >
                        <div className="option-header">
                          <span className="option-icon">🏢</span>
                          <div className="option-text">
                            <div className="option-title">As Recruiter</div>
                            <div className="option-subtitle">Hire talent</div>
                          </div>
                        </div>
                      </Link>
                      <Link 
                        to="/signup/seeker" 
                        className="dropdown-item seeker-option"
                        onClick={closeAllMenus}
                      >
                        <div className="option-header">
                          <span className="option-icon">👨‍💼</span>
                          <div className="option-text">
                            <div className="option-title">As Job Seeker</div>
                            <div className="option-subtitle">Find jobs</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {isMobileMenuOpen && (
            <div 
              className="mobile-overlay"
              onClick={closeAllMenus}
            ></div>
          )}
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          backdrop-filter: blur(10px);
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .navbar-logo {
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          font-size: 1.8rem;
        }

        .logo-text {
          background: linear-gradient(45deg, #fff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .hamburger-line {
          width: 25px;
          height: 3px;
          background: white;
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        .hamburger-line.active:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger-line.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.active:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 20px;
          list-style: none;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          position: relative;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.highlight {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .nav-link.highlight:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .nav-icon {
          font-size: 1.1rem;
        }

        .nav-dropdown {
          position: relative;
        }

        .user-menu-btn, .signup-dropdown-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .user-menu-btn:hover, .signup-dropdown-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .user-name {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-arrow {
          transition: transform 0.3s ease;
          font-size: 0.8rem;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-content {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          min-width: 200px;
          z-index: 1001;
          margin-top: 8px;
          border: 1px solid #e5e7eb;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          text-decoration: none;
          color: #374151;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .dropdown-item:hover {
          background: #f3f4f6;
          transform: translateX(4px);
        }

        .dropdown-icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        .dropdown-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 8px 0;
        }

        .logout-btn {
          color: #ef4444;
        }

        .logout-btn:hover {
          background: #fef2f2;
        }

        .option-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .option-icon {
          font-size: 1.5rem;
        }

        .option-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .option-title {
          font-weight: 600;
          color: #1f2937;
        }

        .option-subtitle {
          font-size: 0.8rem;
          color: #6b7280;
          margin-top: 2px;
        }

        .recruiter-option:hover .option-title {
          color: #2563eb;
        }

        .seeker-option:hover .option-title {
          color: #059669;
        }

        .mobile-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }

          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 80%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
            transition: left 0.3s ease;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            gap: 10px;
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-link {
            color: #374151;
            width: 100%;
            justify-content: flex-start;
            padding: 15px 20px;
            border-radius: 8px;
          }

          .nav-link.highlight {
            background: #3b82f6;
            color: white;
          }

          .user-menu-btn, .signup-dropdown-btn {
            width: 100%;
            justify-content: space-between;
            background: #f8fafc;
            color: #374151;
            border: 1px solid #e5e7eb;
          }

          .dropdown-content {
            position: static;
            box-shadow: none;
            border: 1px solid #e5e7eb;
            margin-top: 10px;
          }

          .navbar-container {
            padding: 0 15px;
          }

          .logo-text {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            display: none;
          }

          .navbar-container {
            padding: 0 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;