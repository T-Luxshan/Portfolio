import React from 'react';
import './Experience.css';

const Experience = () => {
    return (
        <section id="experience" className="experience-section content-section">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="experience-timeline">

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="glass-panel timeline-content card-accent-left">
                            <div className="timeline-header">
                                <h3>Software Engineer Intern</h3>
                                <span className="company">PickMe (Digital Mobility Solutions Lanka PLC)</span>
                                <span className="duration">Mar 2025 -- Sep 2025</span>
                            </div>
                            <ul className="timeline-details">
                                <li>Developed <strong>RESTful API</strong> endpoints for QR payment workflow and built React Native components for operational demo application.</li>
                                <li>Containerized a frontend application using <strong>Docker</strong>, pushed the image to <strong>Artifact Registry</strong>, and deployed it to a <strong>Kubernetes</strong> cluster, enabling scalable and production-ready frontend delivery.</li>
                                <li>Designed and implemented a three-layer image forensics system to detect tampered driver documents using Error Level Analysis (ELA), JPEG structure decoding, and EXIF metadata analysis; integrated with React frontend, Golang backend, and containerized with Docker.</li>
                                <li>Evaluated and benchmarked Golang-based distributed queue technologies across workloads ranging from 10 to 100,000 requests, analyzing throughput and latency to optimize passenger request handling during peak demand.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
