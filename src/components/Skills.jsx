import React, { useState, useRef, useEffect } from 'react';
import useReveal from '../hooks/useReveal';
import useWebGraph from '../hooks/useWebGraph';
import usePointerTilt from '../hooks/usePointerTilt';
import mergeRefs from '../hooks/mergeRefs';
import Reveal from './motion/Reveal';
import './Skills.css';

/*
 * The skill groups form a network rather than a list. `related` names the
 * groups each one actually works with, so hovering a card lights up the real
 * dependencies instead of a decorative pattern.
 */
const SKILL_GROUPS = [
    {
        id: 'lang',
        category: 'Languages & Frameworks',
        related: ['backend', 'ai', 'concepts'],
        items: ['Java (Spring Boot)', 'Go', 'Python', 'React.js', 'React Native'],
    },
    {
        id: 'backend',
        category: 'Backend & Distributed Systems',
        related: ['lang', 'devops', 'concepts'],
        items: ['Kafka', 'Redis', 'RabbitMQ', 'ETCD', 'MySQL', 'REST API'],
    },
    {
        id: 'devops',
        category: 'DevOps & Infrastructure',
        related: ['backend', 'testing'],
        items: ['Docker', 'Kubernetes (GKE, Minikube)', 'Git', 'GitHub Actions (CI/CD)'],
    },
    {
        id: 'ai',
        category: 'AI & ML',
        related: ['lang', 'concepts'],
        items: ['Agentic coding', 'MPC', 'LLM Integration', 'PyTorch', 'Scikit-learn', 'Pandas', 'Dask', 'SciPy'],
    },
    {
        id: 'testing',
        category: 'Testing & Analysis',
        related: ['devops', 'backend'],
        items: ['Serenity BDD', 'Kibana', 'SonarQube'],
    },
    {
        id: 'concepts',
        category: 'Concepts',
        related: ['lang', 'backend', 'ai'],
        items: ['Data Structures & Algorithms', 'OOP', 'SOLID Principles', 'Design Patterns', 'Microservices Architecture'],
    },
];

const INDEX_BY_ID = new Map(SKILL_GROUPS.map((group, index) => [group.id, index]));

// Every unique pair of related groups, so no strand is drawn twice.
const EDGES = [];
SKILL_GROUPS.forEach((group, from) => {
    group.related.forEach((id) => {
        const to = INDEX_BY_ID.get(id);
        if (to !== undefined && to > from) EDGES.push({ from, to, ids: [group.id, id] });
    });
});

const SkillCard = ({ group, index, nodeRef, active, dimmed, onActivate, onRelease }) => {
    const revealRef = useReveal();
    const glowRef = usePointerTilt({ maxTiltX: 0, maxTiltY: 0 });
    // Use a separate ref so we can toggle is-active / is-dimmed via classList
    // without React replacing the whole className (which would wipe is-visible).
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        el.classList.toggle('is-active', active);
        el.classList.toggle('is-dimmed', dimmed);
    }, [active, dimmed]);

    return (
        <div
            ref={mergeRefs(revealRef, glowRef, nodeRef, cardRef)}
            className="glass-panel skill-card glow-follow reveal"
            style={{ '--i': index % 3 }}
            onMouseEnter={() => onActivate(group.id)}
            onMouseLeave={onRelease}
            onFocus={() => onActivate(group.id)}
            onBlur={onRelease}
        >
            <span className="skill-node" aria-hidden="true" />
            <h3 className="skill-category">{group.category}</h3>
            <div className="skill-tags">
                {group.items.map((skill, idx) => (
                    <span key={skill} className="skill-tag" style={{ '--i': idx }}>{skill}</span>
                ))}
            </div>
        </div>
    );
};

const Skills = () => {
    const [active, setActive] = useState(null);
    const { containerRef, setNodeRef, graph } = useWebGraph(SKILL_GROUPS.length);
    const webRef = useReveal();

    const activeGroup = active ? SKILL_GROUPS[INDEX_BY_ID.get(active)] : null;
    const isRelated = (id) => id === active || activeGroup?.related.includes(id);

    return (
        <section id="skills" className="skills-section content-section">
            <div className="container">
                <Reveal as="h2" className="section-title">Technical Skills</Reveal>

                <div
                    ref={containerRef}
                    className={`skills-network ${active ? 'has-active' : ''}`}
                >
                    {/*
                      * Connective strands between groups that genuinely work together.
                      * Rendered from the first paint (empty until measured) so the
                      * reveal observer has an element to attach to.
                      */}
                    <svg
                        ref={webRef}
                        className="skills-web"
                        viewBox={`0 0 ${graph.width || 1} ${graph.height || 1}`}
                        aria-hidden="true"
                    >
                        {EDGES.map((edge, i) => {
                            const a = graph.points[edge.from];
                            const b = graph.points[edge.to];
                            if (!a || !b) return null;

                            // Bow each strand slightly so the mesh reads as web
                            const span = Math.hypot(b.x - a.x, b.y - a.y);
                            const midX = (a.x + b.x) / 2;
                            const midY = (a.y + b.y) / 2;
                            const bow = (edge.from % 2 ? 1 : -1) * Math.min(46, span * 0.12);
                            const lit = active && edge.ids.includes(active);

                            return (
                                <path
                                    key={`${edge.ids[0]}-${edge.ids[1]}`}
                                    className={`skills-strand web-draw ${lit ? 'is-lit' : ''}`}
                                    // Dash length tracks the real span so every strand draws at the same rate
                                    style={{ '--len': Math.round(span * 1.15), '--i': i % 4 }}
                                    d={`M ${a.x} ${a.y} Q ${midX + bow} ${midY + bow} ${b.x} ${b.y}`}
                                />
                            );
                        })}
                    </svg>

                    <div className="skills-grid">
                        {SKILL_GROUPS.map((group, index) => (
                            <SkillCard
                                key={group.id}
                                group={group}
                                index={index}
                                nodeRef={setNodeRef(index)}
                                active={active === group.id}
                                dimmed={Boolean(active) && !isRelated(group.id)}
                                onActivate={setActive}
                                onRelease={() => setActive(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
