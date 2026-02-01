import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="glass-panel about-content">
                    <p>
                        Software Engineer with R&D experience at PickMe. Proven expertise in designing complex systems,
                        including a three-layer image forensics system and benchmarking distributed queue technologies
                        for peak-demand scalability.
                    </p>
                    <p>
                        Proficient in Go, Java (Spring Boot) and React, with a strong foundation in CI/CD pipelines,
                        JWT authentication, and Serenity BDD to deliver secure, automated, and containerized solutions.
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
