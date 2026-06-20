import React from 'react';
import './Skills.css';

const Skills = () => {
    const skillsData = [
        {
            category: "Languages & Frameworks",
            items: ["Java (Spring Boot)", "Go", "Python", "React.js", "React Native"]
        },
        {
            category: "Backend & Distributed Systems",
            items: ["Kafka", "Redis", "RabbitMQ", "MCP", "ETCD", "MySQL", "REST API"]
        },
        {
            category: "DevOps & Infrastructure",
            items: ["Docker", "Kubernetes (GKE, Minikube)", "Git", "GitHub Actions (CI/CD)"]
        },
        {
            category: "Testing & Analysis",
            items: ["Serenity BDD", "Kibana", "SonarQube"]
        },
        {
            category: "ML & Data",
            items: ["PyTorch", "Scikit-learn", "Pandas", "Dask", "SciPy", "Jupyter Notebooks"]
        },
        {
            category: "Concepts",
            items: ["Data Structures & Algorithms", "OOP", "SOLID", "Design Patterns", "Microservices Architecture"]
        }
    ];

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title">Technical Skills</h2>
                <div className="skills-grid">
                    {skillsData.map((group, index) => (
                        <div key={index} className="glass-panel skill-card">
                            <h3 className="skill-category">{group.category}</h3>
                            <div className="skill-tags">
                                {group.items.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
