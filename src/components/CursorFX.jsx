import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from '../hooks/useReducedMotion';
import './CursorFX.css';

const INTERACTIVE = 'a, button, .project-card, .skill-tag, .certification-card, .badge-item';

/**
 * Crimson dot plus a lagging ring, both driven by a single rAF loop that writes
 * transforms directly to the DOM. Desktop pointers only.
 */
const CursorFX = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const enabled = supportsFinePointer() && !prefersReducedMotion();

    useEffect(() => {
        if (!enabled) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ringPos = { ...pointer };
        let frame = 0;
        let visible = false;

        // The loop parks itself once the ring catches up, so an idle pointer costs nothing.
        const render = () => {
            const dx = pointer.x - ringPos.x;
            const dy = pointer.y - ringPos.y;
            ringPos.x += dx * 0.18;
            ringPos.y += dy * 0.18;

            dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;

            frame = Math.abs(dx) + Math.abs(dy) > 0.4 ? requestAnimationFrame(render) : 0;
        };

        const onMove = (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            if (!frame) frame = requestAnimationFrame(render);

            if (!visible) {
                visible = true;
                dot.classList.add('is-active');
                ring.classList.add('is-active');
            }

            const hovering = event.target instanceof Element && event.target.closest(INTERACTIVE);
            ring.classList.toggle('is-hovering', Boolean(hovering));
        };

        const onLeave = () => {
            visible = false;
            dot.classList.remove('is-active');
            ring.classList.remove('is-active');
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
    );
};

export default CursorFX;
