import { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from './useReducedMotion';

/**
 * Proximity magnetism shared by every magnetic element on the page.
 *
 * One pointermove listener and one rAF frame serve all registered elements.
 * Rectangles are stored in document space and refreshed at most a few times a
 * second, and each frame does all its layout reads before any style writes, so
 * moving the cursor never thrashes layout.
 */

const REGISTRY = new Map();
const MEASURE_INTERVAL = 500;

const pointer = { x: 0, y: 0, active: false };
const scroll = { x: 0, y: 0 };
let frame = 0;
let listening = false;
let lastMeasured = 0;

const measure = (entry) => {
    const rect = entry.el.getBoundingClientRect();
    entry.docX = rect.left + window.scrollX + rect.width / 2;
    entry.docY = rect.top + window.scrollY + rect.height / 2;
    entry.reach = Math.max(rect.width, rect.height) / 2 + entry.radius;
};

const run = () => {
    frame = 0;

    const now = performance.now();
    const stale = now - lastMeasured > MEASURE_INTERVAL;
    if (stale) {
        lastMeasured = now;
        REGISTRY.forEach(measure);
    }

    REGISTRY.forEach((entry) => {
        const dx = pointer.x + scroll.x - entry.docX;
        const dy = pointer.y + scroll.y - entry.docY;
        const distance = Math.hypot(dx, dy);

        if (!pointer.active || distance > entry.reach) {
            if (entry.engaged) {
                entry.engaged = false;
                entry.el.style.setProperty('--magnet-x', '0px');
                entry.el.style.setProperty('--magnet-y', '0px');
                entry.el.style.setProperty('--proximity', '0');
            }
            return;
        }

        // Attraction ramps up as the cursor closes in.
        const pull = 1 - distance / entry.reach;
        const eased = pull * pull;
        const strength = entry.strength * eased;

        entry.engaged = true;
        entry.el.style.setProperty('--magnet-x', `${((dx / distance) * strength).toFixed(2)}px`);
        entry.el.style.setProperty('--magnet-y', `${((dy / distance) * strength).toFixed(2)}px`);
        entry.el.style.setProperty('--proximity', eased.toFixed(3));
    });
};

const requestRun = () => {
    if (!frame) frame = requestAnimationFrame(run);
};

const onPointerMove = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    requestRun();
};

const onPointerLeave = () => {
    pointer.active = false;
    requestRun();
};

const onScroll = () => {
    scroll.x = window.scrollX;
    scroll.y = window.scrollY;
    requestRun();
};

const onResize = () => {
    lastMeasured = 0;
    onScroll();
};

const startListening = () => {
    if (listening) return;
    listening = true;
    onScroll();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
};

const stopListening = () => {
    if (!listening) return;
    listening = false;
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
};

/**
 * @param strength maximum translation in px at the closest approach
 * @param radius   how far beyond the element's own box the pull reaches
 */
const useMagnetic = ({ strength = 6, radius = 90, enabled = true } = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !enabled) return;
        if (prefersReducedMotion() || !supportsFinePointer()) return;

        const entry = { el, strength, radius, docX: 0, docY: 0, reach: radius, engaged: false };
        measure(entry);
        REGISTRY.set(el, entry);
        lastMeasured = 0;
        startListening();

        return () => {
            REGISTRY.delete(el);
            el.style.removeProperty('--magnet-x');
            el.style.removeProperty('--magnet-y');
            el.style.removeProperty('--proximity');
            if (!REGISTRY.size) stopListening();
        };
    }, [strength, radius, enabled]);

    return ref;
};

export default useMagnetic;
