// StudentRegistration.jsx
import React, { useState } from 'react';
import './StudentRegistration.css';
import { Link } from 'react-router-dom';


const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    email: '',
    contactNumber: '',
    educationLevel: '',
    password: '',
    documents: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      documents: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Registration submitted successfully!');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: files[0]
      }));
    }
  };

  const handleBackClick = () => {
    // Add navigation logic here
    console.log('Back button clicked');
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <Link to='/'><button className="back-button" onClick={handleBackClick}>
            ←
          </button>
          </Link>
          <div className="logo-container">
            <div className="logo">
              <div className="logo-inner">
                <div className="logo-inner-dot"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="registration-content">
          <h1 className="registration-title">Student Registration</h1>
          <p className="registration-subtitle">Create your profile to find opportunities</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="nic">
                  NIC
                </label>
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  className="form-input"
                  placeholder="Your NIC number"
                  value={formData.nic}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                className="form-input"
                placeholder="Your phone number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="educationLevel">
                Education Level
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                className="form-select"
                value={formData.educationLevel}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your education level</option>
                <option value="high-school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Documents</label>
              <div 
                className="upload-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <span className="upload-icon">📄</span>
                <div className="upload-text">Drop files here or click to browse</div>
                <div className="upload-subtext">Upload NIC and Certificates (PDF, JPG, PNG)</div>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              {formData.documents && (
                <p className="file-selected">
                  Selected: {formData.documents.name}
                </p>
              )}
            </div>

            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;