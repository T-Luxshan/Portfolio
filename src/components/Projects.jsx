import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: "VM-Aware Energy-Optimal MPC Framework for Proactive Horizontal Autoscaling",
            description: "Final Year Research Project (Individual). Designed a VM-Aware Multi-Step MPC controller that proactively auto-scales cloud VMs by integrating ML-forecasted workloads (90–120s ahead) into a receding-horizon optimizer, saving 27.8% energy vs a fixed baseline. Built an ML surrogate model to forecast cloud energy consumption and latency based on underlying VM workload.",
            technologies: ["Python", "PyTorch", "Scikit-learn", "Pandas", "Dask", "SciPy", "Jupyter Notebooks"],
            link: "#"
        },
        {
            title: "Message Broker Benchmarking System",
            description: "Personal R&D Project (Ongoing). Developing a Go-based benchmarking framework to evaluate distributed message brokers under high-concurrency workloads. Implementing multi-producer/multi-consumer simulations to measure throughput, latency, and reliability across Kafka, RabbitMQ, and Redis-based queues.",
            technologies: ["Golang", "Kafka", "RabbitMQ", "Redis", "Docker"],
            link: "https://github.com/T-Luxshan/message-broker-benchmark.git"
        },
        {
            title: "LabourLINK (Labour Hiring System)",
            description: "2nd Year Group Project — Client: AlphaCodes (Pvt) Ltd. Developed map-integrated on-demand labor hiring web and mobile apps with real-time communication. Team Leader & Full-Stack Developer: implemented authentication & session management (Spring Security + JWT), OTP-based password reset, profile, bookings, review, rating, and reporting functionalities.",
            technologies: ["React.js", "React Native", "Spring Boot", "MySQL"],
            link: "https://github.com/T-Luxshan?tab=repositories&q=LabourLink"
        },
        {
            title: "LinkNestSocialMedia",
            description: "Full-stack social media application built on a microservices architecture, supporting posts, likes, and profile management. Implemented JWT-based authentication and secure password reset. Set up CI/CD pipelines with GitHub Actions, including automated JUnit testing and Dockerized deployment.",
            technologies: ["React.js", "Spring Boot", "MySQL", "Docker", "GitHub Actions"],
            link: "https://github.com/T-Luxshan/SurgeGlobalSocialMedia.git"
        },
        {
            title: "Distributed Queue Evaluation",
            description: "Personal R&D Project. Implemented and benchmarked multiple distributed queue technologies to evaluate and compare their performance characteristics. Simulated high-concurrency scenarios with workloads ranging from 10 to 100,000 requests, analyzing throughput and latency metrics across repeated benchmark runs.",
            technologies: ["Golang", "Redis", "RabbitMQ", "Docker"],
            link: "https://github.com/T-Luxshan/distributed-queue-evaluation.git"
        }
    ];

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="glass-panel project-card">
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="project-footer">
                                {project.link !== "#" && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <FaGithub /> View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
