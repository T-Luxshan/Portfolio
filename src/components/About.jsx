import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="glass-panel about-content">
                    <p>
                        Software Engineer with R&D internship experience at PickMe. Proven expertise in designing complex systems,
                        including a three-layer image forensics system, benchmarking distributed message brokers (Kafka, Redis, RabbitMQ)
                        under high-concurrency workloads, and building an ML-driven autoscaling framework for VMs in cloud environments.
                    </p>
                    <p>
                        Proficient in Go, CI/CD pipelines, and event-driven distributed systems to deliver secure, automated,
                        and scalable solutions while meeting strict latency SLOs.
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
