import React from 'react';
import './Achievements.css';
import problemSolvingBadge from '../assets/images/badges/problem-solving-gold.png';
import javaBadge from '../assets/images/badges/java-gold.png';
import pythonBadge from '../assets/images/badges/python-gold.png';
import cBadge from '../assets/images/badges/c-silver.png';

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

                        <div className="badges-container">
                            <h4 className="badges-title">HackerRank Badges</h4>
                            <div className="badges-grid">

                                <div className="badge-item">
                                    <img src={problemSolvingBadge} alt="Problem Solving Gold Badge" className="badge-img" />
                                </div>

                                <div className="badge-item">
                                    <img src={javaBadge} alt="Java Gold Badge" className="badge-img" />
                                </div>

                                <div className="badge-item">
                                    <img src={pythonBadge} alt="Python Gold Badge" className="badge-img" />
                                </div>

                                <div className="badge-item">
                                    <img src={cBadge} alt="C Silver Badge" className="badge-img" />
                                </div>

                            </div>
                        </div>
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
