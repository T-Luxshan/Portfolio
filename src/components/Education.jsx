import React from 'react';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Education.css';

const Education = () => {
    return (
        <section id="education" className="education-section">
            <div className="container education-container">
                <h2 className="section-title">Education</h2>

                <div className="education-grid">
                    <div className="education-card">
                        <div className="education-header">
                            <div className="edu-icon-wrapper">
                                <FaGraduationCap className="edu-icon" />
                            </div>
                            <div className="edu-content">
                                <h3 className="institution-name">University of Moratuwa</h3>
                                <h4 className="degree-title">B.Sc. (Hons) in Information Technology</h4>
                                <div className="edu-meta">
                                    <div className="meta-item">
                                        <FaCalendarAlt /> <span>2022 -- 2026</span>
                                    </div>
                                    <div className="meta-item">
                                        <FaMapMarkerAlt /> <span>Colombo, Sri Lanka</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education-card">
                        <div className="education-header">
                            <div className="edu-icon-wrapper">
                                <FaGraduationCap className="edu-icon" />
                            </div>
                            <div className="edu-content">
                                <h3 className="institution-name">J/Mahajana College</h3>
                                <h4 className="degree-title">G.C.E. Advanced Level</h4>
                                <div className="edu-meta">
                                    <div className="meta-item">
                                        <FaCalendarAlt /> <span>2019</span>
                                    </div>
                                    <div className="meta-item">
                                        <FaMapMarkerAlt /> <span>Tellippalai, Sri Lanka</span>
                                    </div>
                                </div>
                                <div className="edu-details">
                                    <p>Physical Science Stream</p>
                                    <p className="edu-result">Results: 2As 1C <span className="separator">|</span> Z-Score: <span className="highlight">2.0104</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
