import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion';
import './Intro.css';

const SESSION_KEY = 'intro-played';
const DURATION = 1750;

const RING_RADII = [16, 30, 44, 58, 72];
const SPOKES = 16;

const shouldPlay = () => {
    if (prefersReducedMotion()) return false;
    try {
        return window.sessionStorage.getItem(SESSION_KEY) !== 'true';
    } catch {
        return false;
    }
};

/**
 * Cinematic entrance, once per browser session.
 *
 * city grid fades up -> web spreads from the centre -> a red light sweeps
 * across -> the wordmark lands -> the whole web retracts to the edges.
 *
 * The page renders underneath the entire time, so first paint and SEO are
 * unaffected, and the overlay is inert to pointer events.
 */
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
            <div className="intro-grid" />

            <svg className="intro-web" viewBox="0 0 200 200" role="presentation">
                <g className="intro-web-spokes">
                    {Array.from({ length: SPOKES }, (_, i) => {
                        const angle = (i * Math.PI * 2) / SPOKES;
                        return (
                            <line
                                key={`spoke-${i}`}
                                x1={100 + Math.cos(angle) * 12}
                                y1={100 + Math.sin(angle) * 12}
                                x2={100 + Math.cos(angle) * 96}
                                y2={100 + Math.sin(angle) * 96}
                                style={{ '--i': i % 4 }}
                            />
                        );
                    })}
                </g>

                <g className="intro-web-rings">
                    {RING_RADII.map((r, i) => (
                        <circle key={r} cx="100" cy="100" r={r} style={{ '--i': i }} />
                    ))}
                </g>

                {/* Sagging cross strands make the geometry read as web, not radar */}
                <g className="intro-web-strands">
                    {Array.from({ length: SPOKES }, (_, i) => {
                        const a1 = (i * Math.PI * 2) / SPOKES;
                        const a2 = ((i + 1) * Math.PI * 2) / SPOKES;
                        return RING_RADII.slice(1).map((r) => {
                            const x1 = 100 + Math.cos(a1) * r;
                            const y1 = 100 + Math.sin(a1) * r;
                            const x2 = 100 + Math.cos(a2) * r;
                            const y2 = 100 + Math.sin(a2) * r;
                            const mid = (a1 + a2) / 2;
                            const cx = 100 + Math.cos(mid) * r * 0.82;
                            const cy = 100 + Math.sin(mid) * r * 0.82;
                            return (
                                <path
                                    key={`strand-${i}-${r}`}
                                    d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                                    style={{ '--i': i % 5 }}
                                />
                            );
                        });
                    })}
                </g>
            </svg>

            <div className="intro-sweep" />

            <div className="intro-mark">
                <span className="intro-mark-bracket">&lt;</span>
                Luxshan
                <span className="intro-mark-bracket">/&gt;</span>
                <span className="intro-role">Software Engineer</span>
            </div>
        </div>
    );
};

export default Intro;
