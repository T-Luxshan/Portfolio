import React from 'react';
import Reveal from './motion/Reveal';
import './Achievements.css';
import problemSolvingBadge from '../assets/images/badges/problem-solving-gold.png';
import javaBadge from '../assets/images/badges/java-gold.png';
import pythonBadge from '../assets/images/badges/python-gold.png';
import cBadge from '../assets/images/badges/c-silver.png';

const Achievements = () => {
    const badges = [
        { src: problemSolvingBadge, alt: 'Problem Solving Gold Badge' },
        { src: javaBadge, alt: 'Java Gold Badge' },
        { src: pythonBadge, alt: 'Python Gold Badge' },
        { src: cBadge, alt: 'C Silver Badge' },
    ];

    const achievements = [
        'President Awarded Scout (2018)',
        'Hackathon - XTREME 2023',
        'Code Rush 2023 - INTECS UoM (15th/120)',
        'MoraXtreme 8.0 - IEEESB UoM',
    ];

    return (
        <section id="achievements" className="achievements-section content-section">
            <div className="container">
                <Reveal as="h2" className="section-title" mask>Achievements &amp; Activities</Reveal>

                <div className="achievements-grid">
                    <Reveal className="glass-panel achievements-column" variant="left">
                        <h3 className="column-title">Achievements</h3>
                        <ul className="achievements-list">
                            {achievements.map((item, index) => (
                                <li key={index} style={{ '--i': index }}>{item}</li>
                            ))}
                        </ul>

                        <div className="badges-container">
                            <h4 className="badges-title">HackerRank Badges</h4>
                            <div className="badges-grid">
                                {badges.map((badge, index) => (
                                    <div key={badge.alt} className="badge-item" style={{ '--i': index }}>
                                        <img src={badge.src} alt={badge.alt} className="badge-img" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="glass-panel achievements-column" variant="right" index={1}>
                        <h3 className="column-title">Extra-Curricular</h3>
                        <div className="activity-item">
                            <h4>AIESEC in Sri Lanka (2022 - 2024)</h4>
                            <ul className="activity-details">
                                <li>Digital Experience Team Member- Graphic designer <br />(Mar 2023 - Sep 2023)</li>
                                <li>Organizing Committee Member - External Relations, Lead CS 9.0 <br />(Nov 2022 - Feb 2023)</li>
                                <li>OC Vice President - External Relations, Beauty Beyond Ceylon <br />(May 2022 - Aug 2022)</li>
                                <li>Information Management Team Member- Data Analyst <br />(Mar 2022 - Sep 2022)</li>
                            </ul>
                        </div>
                        <div className="activity-item">
                            <h4>Scout Organization - J/Mahajana College</h4>
                        </div>
                        <div className="activity-item">
                            <h4>Chess - J/Mahajana College</h4>
                        </div>
                        <div className="activity-item">
                            <h4>Floor Coordinator- Rootcode (Career Fair 2024)</h4>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
