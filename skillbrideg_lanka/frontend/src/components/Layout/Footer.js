import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <h3>SkillBridge Lanka</h3>
          <p>Connecting talent with opportunities across Sri Lanka</p>
          <p>&copy; 2024 SkillBridge Lanka. All rights reserved.</p>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: #1f2937;
          color: white;
          padding: 40px 0;
          margin-top: auto;
        }

        .footer-content {
          text-align: center;
        }

        .footer-content h3 {
          margin-bottom: 16px;
          font-size: 1.5rem;
        }

        .footer-content p {
          margin-bottom: 8px;
          opacity: 0.8;
        }
      `}</style>
    </footer>
  );
};

export default Footer;