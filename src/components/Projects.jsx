import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            type: "Group Project",
            title: "LabourLINK (Labour Hiring System)",
            description: "2nd Year Group Project — Client: AlphaCodes (Pvt) Ltd. Led a team of 4 to deliver map-integrated on-demand labor hiring web and mobile apps with real-time communication. Implemented authentication using Spring Security and JWT, OTP-based password reset with JavaMailSender, and RESTful APIs for profile management, bookings, reviews, ratings, and reporting.",
            technologies: ["React.js", "React Native", "Java (Spring Boot)", "MySQL"],
            link: "https://github.com/T-Luxshan?tab=repositories&q=LabourLink"
        },
        {
            type: "Personal Project",
            title: "ai-native-website-audit",
            description: "AI Native development. Scraped webpage metrics (headings, CTAs, links, alt text, meta tags) and integrated Google Gemini LLM to generate grounded, data-driven SEO and UX insights. Engineered structured prompts with JSON schema output and maintained prompt logs. Utilized agentic coding tools (Cursor) to accelerate development and focus effort on AI prompt design.",
            technologies: ["Python", "FastAPI", "BeautifulSoup4", "React", "Google Gemini API"],
            link: "https://github.com/T-Luxshan/ai-native-website-audit.git",
            liveLink: "https://ai-native-website-audit.vercel.app/"
        },
        {
            type: "Personal Project",
            title: "Message Broker Benchmarking System",
            description: "Ongoing. Developing a Go-based benchmarking framework to evaluate distributed message brokers under high-concurrency workloads. Implementing multi-producer/multi-consumer simulations to measure throughput, latency, and reliability across Kafka, RabbitMQ, and Redis-based queues.",
            technologies: ["Golang", "Apache Kafka", "Redis", "RabbitMQ", "Docker"],
            link: "https://github.com/T-Luxshan/message-broker-benchmark.git"
        },
        {
            type: "Individual Project",
            title: "LinkNestSocialMedia",
            description: "Built a full-stack social media application on a microservices architecture, supporting posts, likes, and profile management. Implemented JWT-based authentication and secure password reset using JavaMailSender. Set up CI/CD pipelines with GitHub Actions, including automated JUnit testing and Dockerized deployment.",
            technologies: ["React.js", "Spring Boot", "MySQL", "Docker", "GitHub Actions"],
            link: "https://github.com/T-Luxshan/SurgeGlobalSocialMedia.git"
        },
        {
            type: "Research",
            title: "VM-Aware Energy-Optimal MPC Framework for Proactive Horizontal Autoscaling",
            description: "Final Year Research Project (Individual). Designed a VM-Aware Multi-Step MPC controller that proactively auto-scales cloud VMs by integrating ML-forecasted workloads (90–120s ahead) into a receding-horizon optimizer, saving 27.8% energy vs a fixed baseline. Built a multi-layer neural network surrogate model to forecast cloud energy consumption and latency based on underlying VM workload.",
            technologies: ["Python", "PyTorch", "Scikit-learn", "Pandas", "Dask", "SciPy", "Jupyter Notebooks"],
            link: "#"
        },
        {
            type: "Personal R&D",
            title: "Distributed Queue Evaluation",
            description: "Implemented and benchmarked multiple distributed queue technologies to evaluate and compare their performance characteristics. Simulated high-concurrency scenarios with workloads ranging from 10 to 100,000 requests, analyzing throughput and latency metrics across repeated benchmark runs.",
            technologies: ["Golang", "Redis", "RabbitMQ", "Docker"],
            link: "https://github.com/T-Luxshan/distributed-queue-evaluation.git"
        }
    ];

    return (
        <section id="projects" className="projects-section content-section">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="glass-panel project-card card-accent-left">
                            <div className="project-content">
                                <span className="project-type">{project.type}</span>
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
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link project-link-secondary">
                                        <FaExternalLinkAlt /> Live Demo
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
