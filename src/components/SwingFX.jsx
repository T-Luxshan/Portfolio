import React, { useEffect, useState } from 'react';
import { subscribeSwing } from '../motion/swing';
import { prefersReducedMotion } from '../hooks/useReducedMotion';
import './SwingFX.css';

/**
 * Visual accompaniment for a web swing: directional speed lines plus a web line
 * shot from the navigation item to the section being travelled to.
 *
 * React state changes only at the start and end of a swing (twice per
 * navigation) — the motion itself is CSS, so no per-frame renders.
 */
const SwingFX = () => {
    const [swing, setSwing] = useState(null);

    useEffect(() => {
        return subscribeSwing((event) => {
            if (event.type === 'start') setSwing(event);
            else setSwing(null);
        });
    }, []);

    if (prefersReducedMotion()) return null;

    const shot = swing?.origin && swing?.anchor ? { from: swing.origin, to: swing.anchor } : null;

    return (
        <div className={`swing-fx ${swing ? 'is-active' : ''}`} aria-hidden="true">
            <div className="swing-speedlines" />
            {shot && (
                <svg className="swing-shot" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}>
                    <line
                        className="swing-shot-line"
                        x1={shot.from.x}
                        y1={shot.from.y}
                        x2={shot.to.x}
                        y2={shot.to.y}
                    />
                    <circle className="swing-shot-anchor" cx={shot.to.x} cy={shot.to.y} r="5" />
                </svg>
            )}
        </div>
    );
};

export default SwingFX;
