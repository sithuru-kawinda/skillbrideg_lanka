import React from 'react';
import './HomePage.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import heroImage from '../images/hero.png';

const HomePage = () => {
  return (
    <div className="homepage">
     
     
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Bridge the Gap Between<br />
              <span className="text-blue">School</span ><span className='test-violate'> &</span>  <span className="text-teal">Career</span>
            </h1>
            <p className="hero-subtitle">
              Find meaningful job opportunities while waiting for O/L and A/L results.<br />
              Start building your career today with Lanka Career Launchpad.
            </p>
            
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <span>Connect with Employers</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💰</span>
                <span>Find Part-time Jobs</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Build Experience</span>
              </div>
            </div>

            <div className="hero-buttons">
              <Link to="/studentregistration">
                <button className="btn-primary">Get Started Now →</button>
              </Link>

              <Link to="/login">
                <button className="btn-secondary">Already a Member? Login</button>
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImage} alt="Hero" className="hero-img" />
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-content">
          <h3 className="stats-title">Success Stories</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number blue">2,500+</div>
              <div className="stat-label">Students Registered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number green">350+</div>
              <div className="stat-label">Jobs Posted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number orange">92%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number red">6 Months</div>
              <div className="stat-label">Months Average Job Search</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <h2 className="features-title">Maximize Your Free Time After O/L or A/L</h2>
          <p className="features-subtitle">
            Get gainful employment, develop practical experience – and<br />
            just be students in Sri Lanka.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon blue-bg">
                  <span>🔍</span>
                </div>
              </div>
              <h3 className="feature-title">Verified Job Matching</h3>
              <p className="feature-description">
                We verify and match you with<br />
                employers based on your skills<br />
                and interests.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon green-bg">
                  <span>💼</span>
                </div>
              </div>
              <h3 className="feature-title">Skill Development</h3>
              <p className="feature-description">
                Get training and skill building<br />
                opportunities and learn new<br />
                marketable skills.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon blue-bg">
                  <span>🎓</span>
                </div>
              </div>
              <h3 className="feature-title">Personalized Career Tools</h3>
              <p className="feature-description">
                Access tools and resources to<br />
                build your professional profile<br />
                and advance your career.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon green-bg">
                  <span>🎯</span>
                </div>
              </div>
              <h3 className="feature-title">Group-Based Filtering</h3>
              <p className="feature-description">
                Filter opportunities based on<br />
                your level: O/L, A/L or drop<br />
                outs.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon blue-bg">
                  <span>📝</span>
                </div>
              </div>
              <h3 className="feature-title">Apply in One Click</h3>
              <p className="feature-description">
                Simple application process –<br />
                upload resume while applying<br />
                fast.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon green-bg">
                  <span>📊</span>
                </div>
              </div>
              <h3 className="feature-title">Track & Connect</h3>
              <p className="feature-description">
                Keep track of your applications<br />
                and executive directly to<br />
                hiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Career?</h2>
          <p className="cta-subtitle">
            Join thousands of Sri Lankan students who have already taken the first step<br />
            towards their dream career with Lanka Career Launchpad.
          </p>
          <button className="cta-button">Start Your Journey Now</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default HomePage;