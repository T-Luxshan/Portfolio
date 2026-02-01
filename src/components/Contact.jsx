import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <footer id="contact" className="contact-section">
            <div className="container contact-container">
                <div className="contact-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-text">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                        feel free to reach out!
                    </p>
                    <a href="mailto:luxshan.thuraisingam@gmail.com" className="btn btn-primary contact-btn">
                        Say Hello
                    </a>
                </div>

                <div className="contact-socials">
                    <a href="https://github.com/T-Luxshan" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/luxshan-thuraisingam-b47264194/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:luxshan.thuraisingam@gmail.com">
                        <FaEnvelope />
                    </a>
                    <a href="tel:+94764541834">
                        <FaPhone />
                    </a>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Luxshan Thuraisingam. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
