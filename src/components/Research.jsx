import React from 'react';
import { FaFlask, FaExternalLinkAlt } from 'react-icons/fa';
import Reveal from './motion/Reveal';
import './Research.css';

const Research = () => {
    const research = [
        {
            title: "A VM-Aware Energy-Optimal Model Predictive Control Framework for Proactive Horizontal Autoscaling of Virtual Machines",
            status: "Ongoing",
            type: "Final Year Research Project (Individual)",
            technologies: ["Python", "NumPy", "Scikit-learn", "Pandas", "Dask", "SciPy", "Jupyter", "FastAPI", "React"],
            highlights: [
                "Designed a VM-aware MPC controller that aligns ML workload forecasts (90/105/120 s) with 90s VM boot delay,improving SLA compliance from 60.7% to 77.3% while reducing energy 0.8% vs Vanilla MPC.",
                "Built a multi-layer neural network surrogate model mapping (VMs, workload) to latency & energy (test R² = 0.9767),enabling fast receding-horizon optimisation.",
                "Trained HistGradientBoosting workload forecasters (39 features) for boot-shifted and near-term horizons achieved 0.95 correlation."
            ],
            link: null
        }
    ];

    return (
        <section id="research" className="research-section content-section">
            <div className="research-grid-bg" aria-hidden="true" />
            <div className="container">
                <Reveal as="h2" className="section-title">Research</Reveal>
                <div className="research-list">
                    {research.map((item, index) => (
                        <Reveal key={index} className="glass-panel research-card" index={index}>
                            <div className="research-card-header">
                                <div className="research-icon-wrapper">
                                    <FaFlask className="research-icon" />
                                </div>
                                <div className="research-meta">
                                    {/* <span className="research-status">{item.status}</span> */}
                                    <span className="research-type">{item.type}</span>
                                </div>
                            </div>

                            <h3 className="research-title">{item.title}</h3>

                            <div className="research-tech-tags">
                                {item.technologies.map((tech, idx) => (
                                    <span key={idx} className="research-tech-tag" style={{ '--i': idx }}>{tech}</span>
                                ))}
                            </div>

                            <ul className="research-highlights">
                                {item.highlights.map((highlight, idx) => (
                                    <li key={idx} style={{ '--i': idx }}>{highlight}</li>
                                ))}
                            </ul>

                            {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="research-link">
                                    <FaExternalLinkAlt /> View Paper
                                </a>
                            )}
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
