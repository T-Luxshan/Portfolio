import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMedium, FaHackerrank } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <footer id="contact" className="contact-section content-section">
            <div className="container contact-container">
                <div className="contact-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-text">
                        If you feel, I am your guy. Whether you have a question or just want to say hi,
                        feel free to reach out!
                    </p>
                    <a href="mailto:luxshan.thuraisingam@gmail.com" className="btn btn-primary contact-email-btn">
                        <FaEnvelope /> luxshan.thuraisingam@gmail.com
                    </a>
                </div>

                <div className="contact-socials">
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
                    <a href="tel:+94764541834" aria-label="Phone">
                        <FaPhone />
                    </a>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Luxshan Thuraisingam · Built with React</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
