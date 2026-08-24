import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMedium, FaHackerrank } from 'react-icons/fa';
import useMagnetic from '../hooks/useMagnetic';
import Reveal from './motion/Reveal';
import MagneticButton from './motion/MagneticButton';
import spiderWeb from '../assets/images/spider-web.png';
import './Contact.css';

const SOCIALS = [
    { href: 'https://github.com/T-Luxshan', label: 'GitHub', Icon: FaGithub },
    { href: 'https://www.linkedin.com/in/luxshan-thuraisingam-b47264194/', label: 'LinkedIn', Icon: FaLinkedin },
    { href: 'https://medium.com/@luxshan.thuraisingam', label: 'Medium', Icon: FaMedium },
    { href: 'https://www.hackerrank.com/profile/luckybraveboys', label: 'HackerRank', Icon: FaHackerrank },
    { href: 'tel:+94764541834', label: 'Phone', Icon: FaPhone },
];

const ContactSocial = ({ href, label, Icon, index }) => {
    const ref = useMagnetic({ strength: 8, radius: 70 });
    const isTel = href.startsWith('tel:');

    return (
        <a
            ref={ref}
            href={href}
            target={isTel ? undefined : '_blank'}
            rel={isTel ? undefined : 'noopener noreferrer'}
            aria-label={label}
            title={label}
            style={{ '--i': index }}
        >
            <Icon />
            <span className="social-tooltip">{label}</span>
        </a>
    );
};

const Contact = () => {
    return (
        <footer id="contact" className="contact-section content-section">
            <div className="contact-atmosphere" aria-hidden="true">
                <img src={spiderWeb} className="contact-web-img" alt="" />
            </div>

            <div className="container contact-container">
                {/* Arrives like a landing: fast drop, hard stop, small settle */}
                <Reveal className="contact-header" variant="land">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-text">
                        If you feel, I am your guy. Whether you have a question or just want to say Hi,
                        feel free to reach out!
                    </p>
                    <MagneticButton
                        href="mailto:luxshan.thuraisingam@gmail.com"
                        className="btn btn-primary contact-email-btn"
                        strength={10}
                        radius={150}
                    >
                        <FaEnvelope /> luxshan.thuraisingam@gmail.com
                    </MagneticButton>
                </Reveal>

                <Reveal className="contact-socials" index={1}>
                    {SOCIALS.map((social, index) => (
                        <ContactSocial key={social.label} index={index} {...social} />
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
