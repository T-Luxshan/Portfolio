import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMedium, FaHackerrank } from 'react-icons/fa';
import Reveal from './motion/Reveal';
import MagneticButton from './motion/MagneticButton';
import './Contact.css';

const socials = [
    { href: 'https://github.com/T-Luxshan', label: 'GitHub', Icon: FaGithub },
    { href: 'https://www.linkedin.com/in/luxshan-thuraisingam-b47264194/', label: 'LinkedIn', Icon: FaLinkedin },
    { href: 'https://medium.com/@luxshan.thuraisingam', label: 'Medium', Icon: FaMedium },
    { href: 'https://www.hackerrank.com/profile/luckybraveboys', label: 'HackerRank', Icon: FaHackerrank },
    { href: 'tel:+94764541834', label: 'Phone', Icon: FaPhone },
];

const Contact = () => {
    return (
        <footer id="contact" className="contact-section content-section">
            <div className="contact-atmosphere" aria-hidden="true" />
            <div className="container contact-container">
                <Reveal className="contact-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-text">
                        If you feel, I am your guy. Whether you have a question or just want to say Hi,
                        feel free to reach out!
                    </p>
                    <MagneticButton
                        href="mailto:luxshan.thuraisingam@gmail.com"
                        className="btn btn-primary contact-email-btn"
                    >
                        <FaEnvelope /> luxshan.thuraisingam@gmail.com
                    </MagneticButton>
                </Reveal>

                <Reveal className="contact-socials" index={1}>
                    {socials.map(({ href, label, Icon }, index) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('tel:') ? undefined : '_blank'}
                            rel={href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                            aria-label={label}
                            title={label}
                            style={{ '--i': index }}
                        >
                            <Icon />
                            <span className="social-tooltip">{label}</span>
                        </a>
                    ))}
                </Reveal>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Luxshan Thuraisingam · Built with Hope : )</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
