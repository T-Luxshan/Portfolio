import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: "Distributed Queue Evaluation",
            description: "Implemented and benchmarked multiple distributed queue technologies to evaluate performance characteristics. Simulated high-concurrency scenarios to analyze throughput and latency.",
            technologies: ["Golang", "Redis", "RabbitMQ", "Docker"],
            link: "https://github.com/T-Luxshan/distributed-queue-evaluation.git"
        },
        {
            title: "LabourLINK",
            description: "Map-integrated on-demand labor hiring system. Implemented AUTH (JWT/OTP), profile management, reviews, and reporting functionalities.",
            technologies: ["React", "Spring Boot", "MySQL", "React Native"],
            link: "https://github.com/T-Luxshan?tab=repositories&q=LabourLink"
        },
        {
            title: "Mini Social Media Application",
            description: "Social platform with posts, likes, and profiles. Features JWT auth, password reset, and CI/CD pipeline establishment.",
            technologies: ["React", "Spring Boot", "MySQL", "Docker"],
            link: "https://github.com/T-Luxshan/SurgeGlobalSocialMedia.git"
        },
        {
            title: "Intern Tracking System",
            description: "Frontend development for internship application tracking system.",
            technologies: ["React", "TypeScript", "Vite", "Node.js"],
            link: "#"
        },
        {
            title: "Candle Making Machine Automation",
            description: "Automated hardware system for candle manufacturing. Designed PCB and integrated IR sensors.",
            technologies: ["C", "Arduino", "PCB Design"],
            link: "#"
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
