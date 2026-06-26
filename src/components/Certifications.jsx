import React from 'react';
import { FaCertificate } from 'react-icons/fa';
import './Certifications.css';

const Certifications = () => {
    const certifications = [
        { course: 'Learning Kubernetes', provider: 'LinkedIn Learning', date: 'June 2025' },
        { course: 'Java 17: First', provider: 'LinkedIn Learning', date: 'Nov 2021' },
        { course: 'Programming Foundations: Databases', provider: 'LinkedIn Learning', date: 'Oct 2021' },
        { course: 'Learning SQL Programming', provider: 'LinkedIn Learning', date: 'Oct 2021' },
        { course: 'Meta - Version Control', provider: 'Coursera', date: 'Apr 2023' },
        { course: 'Meta - Programming with JavaScript', provider: 'Coursera', date: 'Apr 2023' },
        { course: 'Meta - Introduction to Front-End Development', provider: 'Coursera', date: 'Apr 2023' },
        { course: 'Python & Data Visualization', provider: 'DevTown', date: 'Oct 2021' },
        { course: 'Introduction to UI-UX', provider: 'Great Learning', date: 'Aug 2021' },
        { course: 'CYBERHAT 1.0', provider: 'IEEE Computer Society of SLTC', date: 'Jan 2021' },
    ];

    return (
        <section id="certifications" className="certifications-section content-section">
            <div className="container">
                <h2 className="section-title">Certifications</h2>
                <div className="glass-panel certifications-list">
                    {certifications.map((cert, index) => (
                        <div key={index} className="certification-item">
                            <div className="certification-icon-wrapper">
                                <FaCertificate className="certification-icon" />
                            </div>
                            <div className="certification-details">
                                <h3 className="certification-course">{cert.course}</h3>
                                <p className="certification-meta">
                                    <span className="certification-provider">{cert.provider}</span>
                                    <span className="certification-separator">·</span>
                                    <span className="certification-date">{cert.date}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
