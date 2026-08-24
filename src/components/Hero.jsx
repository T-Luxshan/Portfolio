import React from 'react';
import { FaGithub, FaLinkedin, FaPhone, FaMedium, FaHackerrank } from 'react-icons/fa';
import { SiLetterboxd } from 'react-icons/si';
import profileImg2 from '../assets/images/profile2.jpeg';
import { RESUME_URL } from '../constants';
import { usePointerParallax } from '../hooks/useParallax';
import MagneticButton from './motion/MagneticButton';
import './Hero.css';

const Hero = () => {
  const webRef = usePointerParallax();

  return (
    <section id="hero" className="hero-section">
      <div className="hero-web" ref={webRef} aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-name swing-in" style={{ '--i': 0 }}>Luxshan Thuraisingam</h1>
          <h2 className="hero-title swing-in" style={{ '--i': 1 }}>Software Engineer</h2>
          <p className="hero-description swing-in" style={{ '--i': 2 }}>
            Focused on building reliable backend systems and clean full stack applications. Enjoy working close to the system level, understanding performance, scalability, and how systems behave in production.
          </p>

          <div className="hero-actions swing-in" style={{ '--i': 3 }}>
            <MagneticButton href="#projects" className="btn btn-primary">View Projects</MagneticButton>
            <MagneticButton href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">View Resume</MagneticButton>
            <MagneticButton href="#contact" className="btn btn-outline">Contact Me</MagneticButton>
          </div>

          <div className="social-links swing-in" style={{ '--i': 4 }}>
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
            <a href="https://letterboxd.com/luxshan/" target="_blank" rel="noopener noreferrer" aria-label="Letterboxd">
              <SiLetterboxd />
            </a>
            <a href="tel:+94764541834" aria-label="Phone">
              <FaPhone />
            </a>
          </div>

          <div className="hero-contact-info swing-in" style={{ '--i': 5 }}>
            <div className="contact-info-item">
              <span className="info-label">Email</span>
              <a href="mailto:luxshan.thuraisingam@gmail.com" className="info-value">luxshan.thuraisingam@gmail.com</a>
            </div>
            <div className="contact-info-item">
              <span className="info-label">Mobile</span>
              <a href="tel:+94764541834" className="info-value">+94 76 454 1834</a>
            </div>
            <div className="contact-info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Jaffna, Sri Lanka</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper swing-in" style={{ '--i': 2 }}>
          <div className="hero-image-glass">
            <img src={profileImg2} alt="Luxshan Thuraisingam" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
