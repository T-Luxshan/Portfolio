import { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from './useReducedMotion';

/**
 * Writes pointer-driven CSS custom properties on the element inside a rAF frame.
 * Never triggers a React re-render.
 *
 * Custom properties written:
 *  --tilt-x / --tilt-y   rotation in degrees (capped by `maxTilt`)
 *  --glow-x / --glow-y   cursor position as a percentage, for radial highlights
 *  --magnet-x / --magnet-y  translation in px (capped by `maxMagnet`)
 */
const usePointerTilt = ({ maxTilt = 4, maxMagnet = 0, enabled = true } = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !enabled) return;
        if (prefersReducedMotion() || !supportsFinePointer()) return;

        let frame = 0;
        let pending = null;

        const apply = () => {
            frame = 0;
            if (!pending) return;

            const { x, y } = pending;
            const rect = el.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            const px = (x - rect.left) / rect.width;
            const py = (y - rect.top) / rect.height;
            const offsetX = px - 0.5;
            const offsetY = py - 0.5;

            el.style.setProperty('--glow-x', `${(px * 100).toFixed(2)}%`);
            el.style.setProperty('--glow-y', `${(py * 100).toFixed(2)}%`);
            el.style.setProperty('--tilt-y', `${(offsetX * maxTilt * 2).toFixed(3)}deg`);
            el.style.setProperty('--tilt-x', `${(-offsetY * maxTilt * 2).toFixed(3)}deg`);

            if (maxMagnet) {
                el.style.setProperty('--magnet-x', `${(offsetX * maxMagnet * 2).toFixed(2)}px`);
                el.style.setProperty('--magnet-y', `${(offsetY * maxMagnet * 2).toFixed(2)}px`);
            }
        };

        const onPointerMove = (event) => {
            pending = { x: event.clientX, y: event.clientY };
            if (!frame) frame = requestAnimationFrame(apply);
        };

        const reset = () => {
            if (frame) {
                cancelAnimationFrame(frame);
                frame = 0;
            }
            pending = null;
            el.style.setProperty('--tilt-x', '0deg');
            el.style.setProperty('--tilt-y', '0deg');
            el.style.setProperty('--glow-x', '50%');
            el.style.setProperty('--glow-y', '50%');
            el.style.setProperty('--magnet-x', '0px');
            el.style.setProperty('--magnet-y', '0px');
        };

        el.addEventListener('pointermove', onPointerMove, { passive: true });
        el.addEventListener('pointerleave', reset);

        return () => {
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerleave', reset);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [maxTilt, maxMagnet, enabled]);

    return ref;
};

export default usePointerTilt;
