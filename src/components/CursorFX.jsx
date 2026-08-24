import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from '../hooks/useReducedMotion';
import './CursorFX.css';

const PROJECT_SELECTOR = '.project-card';
const BUTTON_SELECTOR = 'button, .btn, .nav-resume-btn';
const LINK_SELECTOR = 'a, .skill-tag, .tech-tag, .badge-item';

/**
 * Spider-sense cursor: a crimson core with a lagging sense ring that changes
 * state depending on what is underneath it.
 *
 *   idle      small dot, faint ring
 *   moving    ring stretches along the direction of travel
 *   link      ring tightens and brightens
 *   button    ring expands into a target reticle
 *   project   ring opens wide and the web attachment (drawn on the SpiderFX
 *             canvas) takes over
 *
 * A single rAF loop writes transforms straight to the DOM and parks itself once
 * the ring settles, so an idle pointer costs nothing.
 */
const CursorFX = () => {
    const coreRef = useRef(null);
    const ringRef = useRef(null);
    const enabled = supportsFinePointer() && !prefersReducedMotion();

    useEffect(() => {
        if (!enabled) return;

        const core = coreRef.current;
        const ring = ringRef.current;
        if (!core || !ring) return;

        const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ringPos = { ...pointer };
        let frame = 0;
        let visible = false;
        let state = '';

        const render = () => {
            const dx = pointer.x - ringPos.x;
            const dy = pointer.y - ringPos.y;
            ringPos.x += dx * 0.19;
            ringPos.y += dy * 0.19;

            const speed = Math.hypot(dx, dy);
            // Stretch the ring along its direction of travel, like a motion trail
            const stretch = Math.min(speed / 90, 0.5);
            const angle = speed > 0.6 ? (Math.atan2(dy, dx) * 180) / Math.PI : 0;

            core.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
            ring.style.transform =
                `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) ` +
                `rotate(${angle}deg) scale(${(1 + stretch).toFixed(3)}, ${(1 - stretch * 0.55).toFixed(3)})`;

            frame = speed > 0.4 ? requestAnimationFrame(render) : 0;
        };

        const setState = (next) => {
            if (next === state) return;
            if (state) ring.classList.remove(`is-${state}`);
            if (next) ring.classList.add(`is-${next}`);
            state = next;
        };

        const onMove = (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            if (!frame) frame = requestAnimationFrame(render);

            if (!visible) {
                visible = true;
                core.classList.add('is-active');
                ring.classList.add('is-active');
            }

            const target = event.target instanceof Element ? event.target : null;
            if (!target) return setState('');

            if (target.closest(PROJECT_SELECTOR)) setState('project');
            else if (target.closest(BUTTON_SELECTOR)) setState('button');
            else if (target.closest(LINK_SELECTOR)) setState('link');
            else setState('');
        };

        const onLeave = () => {
            visible = false;
            core.classList.remove('is-active');
            ring.classList.remove('is-active');
        };

        const onDown = () => ring.classList.add('is-pressed');
        const onUp = () => ring.classList.remove('is-pressed');

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });
        document.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointerleave', onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div ref={ringRef} className="cursor-ring" aria-hidden="true">
                <span className="cursor-tick cursor-tick--n" />
                <span className="cursor-tick cursor-tick--e" />
                <span className="cursor-tick cursor-tick--s" />
                <span className="cursor-tick cursor-tick--w" />
            </div>
            <div ref={coreRef} className="cursor-core" aria-hidden="true" />
        </>
    );
};

export default CursorFX;
