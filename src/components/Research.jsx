import React from 'react';
import { FaFlask, FaExternalLinkAlt } from 'react-icons/fa';
import './Research.css';

const Research = () => {
    const research = [
        {
            title: "A VM-Aware Energy-Optimal Model Predictive Control Framework for Proactive Horizontal Autoscaling of Virtual Machines",
            status: "Ongoing",
            type: "Final Year Research Project (Individual)",
            technologies: ["Python", "PyTorch", "Scikit-learn", "Pandas", "Dask", "SciPy", "Jupyter Notebooks"],
            highlights: [
                "Designed a VM-Aware Multi-Step MPC controller that proactively auto-scales cloud VMs by integrating ML-forecasted workloads (90–120s ahead) into a receding-horizon optimizer, saving 27.8% energy vs a fixed baseline.",
                "Built a Multi-layer neural network surrogate model to forecast cloud energy consumption and latency based on underlying VM workload.",
                "Developed an ML workload forecaster (HistGradientBoosting, 32 temporal features) predicting workload at t+90s/105s/120s with 97.9% correlation."
            ],
            link: null
        }
    ];

    return (
        <section id="research" className="research-section">
            <div className="container">
                <h2 className="section-title">Research</h2>
                <div className="research-list">
                    {research.map((item, index) => (
                        <div key={index} className="glass-panel research-card">
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
                                    <span key={idx} className="research-tech-tag">{tech}</span>
                                ))}
                            </div>

                            <ul className="research-highlights">
                                {item.highlights.map((highlight, idx) => (
                                    <li key={idx}>{highlight}</li>
                                ))}
                            </ul>

                            {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="research-link">
                                    <FaExternalLinkAlt /> View Paper
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
