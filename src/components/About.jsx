import React from 'react';
import Reveal from './motion/Reveal';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section content-section">
            <div className="container">
                <Reveal as="h2" className="section-title">About Me</Reveal>

                {/* Swings in from the anchor point above, then settles */}
                <Reveal className="about-shell" variant="swing">
                    <svg className="about-tether" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
                        <path className="web-draw" style={{ '--len': 210 }} d="M 100 0 Q 100 34 100 58" />
                        <path className="web-draw" style={{ '--len': 210, '--i': 1 }} d="M 100 8 Q 62 30 24 58" />
                        <path className="web-draw" style={{ '--len': 210, '--i': 1 }} d="M 100 8 Q 138 30 176 58" />
                    </svg>

                    <div className="glass-panel about-content">
                        <p>
                            Software Engineer with internship experience at <strong>PickMe</strong>. Proven expertise in designing
                            complex systems including a three-layer image forensics system and benchmarked distributed message brokers
                            for peak load passenger handling. Built ML-driven auto-scaling framework for VMs in cloud reducing energy
                            consumption while meeting SLOs.
                        </p>
                        <p>
                            Proficient in <strong>Java</strong>, <strong>Go</strong>, Docker, and containerized backend development.
                        </p>
                        <div className="about-stats">
                            <div className="stat-item" style={{ '--i': 0 }}>
                                <span className="stat-number">4+</span>
                                <span className="stat-label">Years Coding</span>
                            </div>
                            <div className="stat-item" style={{ '--i': 1 }}>
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default About;
