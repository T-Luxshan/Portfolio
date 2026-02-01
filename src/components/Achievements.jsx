import React from 'react';
import './Achievements.css';

const Achievements = () => {
    return (
        <section id="achievements" className="achievements-section">
            <div className="container">
                <h2 className="section-title">Achievements & Activities</h2>

                <div className="achievements-grid">
                    <div className="glass-panel achievements-column">
                        <h3 className="column-title">Achievements</h3>
                        <ul className="achievements-list">
                            <li>President Awarded Scout (2018)</li>
                            <li>Hackathon - XTREME 2023</li>
                            <li>Code Rush 2023 - INTECS UoM (15th/120)</li>
                            <li>MoraXtreme 8.0 - IEEESB UoM</li>
                        </ul>
                    </div>

                    <div className="glass-panel achievements-column">
                        <h3 className="column-title">Extra-Curricular</h3>
                        <div className="activity-item">
                            <h4>AIESEC in Sri Lanka (2022 -- 2024)</h4>
                            <ul className="activity-details">
                                <li>Digital Experience Team Member - Graphic Designer</li>
                                <li>Organizing Committee Member - Lead CS 9.0</li>
                                <li>OC Vice President - Beauty Beyond Ceylon</li>
                                <li>Information Management Team Member - Data Analyst</li>
                            </ul>
                        </div>
                        <div className="activity-item">
                            <h4>Scout Organization - J/Mahajana College</h4>
                        </div>
                        <div className="activity-item">
                            <h4>Chess - J/Mahajana College</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
