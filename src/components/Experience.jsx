import React from 'react';
import { useScrollProgress } from '../hooks/useParallax';
import Reveal from './motion/Reveal';
import './Experience.css';

const Experience = () => {
    const timelineRef = useScrollProgress();

    return (
        <section id="experience" className="experience-section content-section">
            <div className="container">
                <Reveal as="h2" className="section-title">Experience</Reveal>
                <div className="experience-timeline" ref={timelineRef}>
                    {/*
                     * The rail is a web structure rather than a plain line: a spine
                     * with anchor struts, revealed by the section's scroll progress.
                     */}
                    <svg className="timeline-web" viewBox="0 0 60 400" preserveAspectRatio="none" aria-hidden="true">
                        <path className="timeline-spine" d="M 30 0 L 30 400" />
                        <path className="timeline-strut" d="M 30 46 Q 8 62 2 96" />
                        <path className="timeline-strut" d="M 30 46 Q 52 62 58 96" />
                        <path className="timeline-strut" d="M 30 190 Q 8 206 2 240" />
                        <path className="timeline-strut" d="M 30 190 Q 52 206 58 240" />
                        <path className="timeline-strut" d="M 30 330 Q 8 346 2 380" />
                        <path className="timeline-strut" d="M 30 330 Q 52 346 58 380" />
                    </svg>

                    <Reveal className="timeline-item" variant="right">
                        <div className="timeline-dot"></div>
                        <div className="glass-panel timeline-content card-accent-left">
                            <div className="timeline-header">
                                <h3>Software Engineer Intern</h3>
                                <span className="company">PickMe (Digital Mobility Solutions Lanka PLC)</span>
                                <span className="duration">Mar 2025 - Sep 2025</span>
                            </div>
                            <ul className="timeline-details">
                                <li style={{ '--i': 0 }}>Developed <strong>RESTful API</strong> endpoints for QR payment workflow and built React Native components for operational demo application.</li>
                                <li style={{ '--i': 1 }}>Containerized a frontend application using <strong>Docker</strong>, pushed the image to <strong>Artifact Registry</strong>, and deployed it to a <strong>Kubernetes</strong> cluster, enabling scalable and production-ready frontend delivery.</li>
                                <li style={{ '--i': 2 }}>Designed and implemented a three-layer image forensics system to detect tampered driver documents using Error Level Analysis (ELA), JPEG structure decoding, and EXIF metadata analysis; integrated with React frontend, Golang backend, and containerized with Docker.</li>
                                <li style={{ '--i': 3 }}>Evaluated and benchmarked Golang-based distributed queue technologies across workloads ranging from 10 to 100,000 requests, analyzing throughput and latency to optimize passenger request handling during peak demand.</li>
                            </ul>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    );
};

export default Experience;
