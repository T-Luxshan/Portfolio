import React from 'react';
import { FaGithub, FaLinkedin, FaPhone, FaMedium, FaHackerrank } from 'react-icons/fa';
import { SiLetterboxd } from 'react-icons/si';
import profileImg2 from '../assets/images/profile2.jpeg';
import { RESUME_URL } from '../constants';
import { usePointerParallax } from '../hooks/useParallax';
import usePointerTilt from '../hooks/usePointerTilt';
import useMagnetic from '../hooks/useMagnetic';
import MagneticButton from './motion/MagneticButton';
import './Hero.css';

const SOCIALS = [
  { href: 'https://github.com/T-Luxshan', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/luxshan-thuraisingam-b47264194/', label: 'LinkedIn', Icon: FaLinkedin },
  { href: 'https://medium.com/@luxshan.thuraisingam', label: 'Medium', Icon: FaMedium },
  { href: 'https://www.hackerrank.com/profile/luckybraveboys', label: 'HackerRank', Icon: FaHackerrank },
  { href: 'https://letterboxd.com/luxshan/', label: 'Letterboxd', Icon: SiLetterboxd },
  { href: 'tel:+94764541834', label: 'Phone', Icon: FaPhone },
];

const SocialIcon = ({ href, label, Icon, index }) => {
  const ref = useMagnetic({ strength: 6, radius: 60 });
  const isTel = href.startsWith('tel:');

  return (
    <a
      ref={ref}
      href={href}
      target={isTel ? undefined : '_blank'}
      rel={isTel ? undefined : 'noopener noreferrer'}
      aria-label={label}
      className="social-icon"
      style={{ '--i': index }}
    >
      <Icon />
    </a>
  );
};

const Hero = () => {
  const webRef = usePointerParallax();
  // The frame counter-tilts against the cursor, and its inner layers shift with it
  const frameRef = usePointerTilt({ maxTiltX: 5, maxTiltY: 7, maxShift: 10 });

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
            {SOCIALS.map((social, index) => (
              <SocialIcon key={social.label} index={index} {...social} />
            ))}
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
          <div className="hero-image-glass" ref={frameRef}>
            <img src={profileImg2} alt="Luxshan Thuraisingam" className="hero-image" />
            <span className="hero-image-halftone" aria-hidden="true" />
            <span className="hero-image-sweep" aria-hidden="true" />
            <span className="hero-image-web" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
