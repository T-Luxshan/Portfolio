import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion';
import './Intro.css';

const SESSION_KEY = 'intro-played';
const DURATION = 1200;

const shouldPlay = () => {
    if (prefersReducedMotion()) return false;
    try {
        return window.sessionStorage.getItem(SESSION_KEY) !== 'true';
    } catch {
        return false;
    }
};

const Intro = () => {
    const [playing, setPlaying] = useState(shouldPlay);

    useEffect(() => {
        if (!playing) return;

        try {
            window.sessionStorage.setItem(SESSION_KEY, 'true');
        } catch {
            // Private browsing can reject storage writes; the intro still plays once.
        }

        document.body.classList.add('intro-locked');
        const timer = window.setTimeout(() => setPlaying(false), DURATION);

        return () => {
            window.clearTimeout(timer);
            document.body.classList.remove('intro-locked');
        };
    }, [playing]);

    if (!playing) return null;

    return (
        <div className="intro" aria-hidden="true">
            <svg className="intro-web" viewBox="0 0 200 200" role="presentation">
                <g className="intro-web-spokes">
                    {Array.from({ length: 12 }, (_, i) => {
                        const angle = (i * Math.PI * 2) / 12;
                        return (
                            <line
                                key={i}
                                x1="100"
                                y1="100"
                                x2={100 + Math.cos(angle) * 95}
                                y2={100 + Math.sin(angle) * 95}
                            />
                        );
                    })}
                </g>
                <g className="intro-web-rings">
                    {[28, 52, 76, 95].map((r, i) => (
                        <circle key={r} cx="100" cy="100" r={r} style={{ '--i': i }} />
                    ))}
                </g>
            </svg>
            <span className="intro-mark">
                <span className="intro-mark-bracket">&lt;</span>
                Luxshan
                <span className="intro-mark-bracket">/&gt;</span>
            </span>
        </div>
    );
};

export default Intro;
