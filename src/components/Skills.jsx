import React from 'react';
import './Skills.css';

const Skills = () => {
    const skillsData = [
        {
            category: "Languages & Frameworks",
            items: ["Go", "Java (Spring Boot)", "Python", "React.js", "React Native"]
        },
        {
            category: "Backend & Distributed Systems",
            items: ["Redis", "RabbitMQ", "ETCD", "MySQL", "Firebase", "RESTful APIs"]
        },
        {
            category: "DevOps & Infrastructure",
            items: ["Docker", "Kubernetes (GKE)", "Linux", "GitHub Actions", "GitLab"]
        },
        {
            category: "Testing & Analysis",
            items: ["Serenity BDD", "Kibana"]
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
