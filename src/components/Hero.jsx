import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMedium, FaHackerrank } from 'react-icons/fa';
import profileImg from '../assets/images/profile.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-name">Luxshan Thuraisingam</h1>
          <h2 className="hero-title">Software Engineer</h2>
          <p className="hero-description">
            Focused on building reliable backend systems and clean full-stack applications. Enjoy working close to the system level, understanding performance, scalability, and how systems behave in production.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>

          <div className="social-links">
            <a href="https://github.com/T-Luxshan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/luxshan-thuraisingam-b47264194/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://medium.com/@luxshan.thuraisingam" target="_blank" rel="noopener noreferrer" aria-label="Medium">
              <FaMedium />
            </a>
            <a href="https://www.hackerrank.com/profile/luckybraveboys" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
              <FaHackerrank />
            </a>
            <a href="mailto:luxshan.thuraisingam@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="tel:+94764541834" aria-label="Phone">
              <FaPhone />
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glass">
            <img src={profileImg} alt="Luxshan Thuraisingam" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
