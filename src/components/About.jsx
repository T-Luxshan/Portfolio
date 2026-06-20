import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="glass-panel about-content">
                    <p>
                        Software Engineer with internship experience at <strong>PickMe</strong>. Proven expertise in designing
                        complex systems including a three-layer image forensics system and benchmarked distributed message brokers
                        for peak-load passenger handling. Built ML-driven auto-scaling framework for VMs in cloud reducing energy
                        consumption while meeting SLOs.
                    </p>
                    <p>
                        Proficient in <strong>Java</strong>, <strong>Go</strong>, Docker, and containerized backend development.
                    </p>
                    <div className="about-stats">
                        <div className="stat-item">
                            <span className="stat-number">3+</span>
                            <span className="stat-label">Years Coding</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
