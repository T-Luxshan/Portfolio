import { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from './useReducedMotion';

/**
 * Writes `--parallax-y` (px) on the element as it moves through the viewport,
 * throttled to one rAF frame per scroll burst. Desktop pointers only.
 */
export const useScrollParallax = (factor = 0.12) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (prefersReducedMotion() || !supportsFinePointer()) return;

        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.setProperty('--parallax-y', `${(-fromCenter * factor).toFixed(2)}px`);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [factor]);

    return ref;
};

/**
 * Writes `--mx` / `--my` (-1..1) on the element based on cursor position within
 * the viewport, so decorative layers can drift with the mouse.
 */
export const usePointerParallax = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (prefersReducedMotion() || !supportsFinePointer()) return;

        let frame = 0;
        let pending = null;

        const update = () => {
            frame = 0;
            if (!pending) return;
            const mx = pending.x / window.innerWidth - 0.5;
            const my = pending.y / window.innerHeight - 0.5;
            el.style.setProperty('--mx', mx.toFixed(3));
            el.style.setProperty('--my', my.toFixed(3));
        };

        const onMove = (event) => {
            pending = { x: event.clientX, y: event.clientY };
            if (!frame) frame = requestAnimationFrame(update);
        };

        window.addEventListener('pointermove', onMove, { passive: true });

        return () => {
            window.removeEventListener('pointermove', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return ref;
};

/**
 * Writes `--progress` (0..1) on the element describing how far it has travelled
 * through the viewport. Used to draw the experience timeline rail on scroll.
 */
export const useScrollProgress = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion()) {
            el.style.setProperty('--progress', '1');
            return;
        }

        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const start = window.innerHeight * 0.85;
            const distance = rect.height + start - window.innerHeight * 0.2;
            const travelled = start - rect.top;
            const progress = distance > 0 ? Math.min(Math.max(travelled / distance, 0), 1) : 1;
            el.style.setProperty('--progress', progress.toFixed(4));
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return ref;
};

export default useScrollParallax;
