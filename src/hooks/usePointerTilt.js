import { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from './useReducedMotion';

/**
 * Writes pointer-driven CSS custom properties on the element inside a rAF frame.
 * Never triggers a React re-render.
 *
 * Custom properties written:
 *  --tilt-x / --tilt-y     rotation in degrees, capped separately per axis
 *  --glow-x / --glow-y     cursor position as a percentage, for radial lighting
 *  --cursor-x / --cursor-y cursor position in px within the element
 *  --shift-x / --shift-y   small parallax offset for layers inside the element
 */
const usePointerTilt = ({ maxTiltX = 4, maxTiltY = 6, maxShift = 0, enabled = true } = {}) => {
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

            const localX = x - rect.left;
            const localY = y - rect.top;
            const px = localX / rect.width;
            const py = localY / rect.height;
            const offsetX = px - 0.5;
            const offsetY = py - 0.5;

            el.style.setProperty('--glow-x', `${(px * 100).toFixed(2)}%`);
            el.style.setProperty('--glow-y', `${(py * 100).toFixed(2)}%`);
            el.style.setProperty('--cursor-x', `${localX.toFixed(1)}px`);
            el.style.setProperty('--cursor-y', `${localY.toFixed(1)}px`);
            el.style.setProperty('--tilt-y', `${(offsetX * maxTiltY * 2).toFixed(3)}deg`);
            el.style.setProperty('--tilt-x', `${(-offsetY * maxTiltX * 2).toFixed(3)}deg`);

            if (maxShift) {
                el.style.setProperty('--shift-x', `${(-offsetX * maxShift * 2).toFixed(2)}px`);
                el.style.setProperty('--shift-y', `${(-offsetY * maxShift * 2).toFixed(2)}px`);
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
            el.style.setProperty('--shift-x', '0px');
            el.style.setProperty('--shift-y', '0px');
        };

        el.addEventListener('pointermove', onPointerMove, { passive: true });
        el.addEventListener('pointerleave', reset);

        return () => {
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerleave', reset);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [maxTiltX, maxTiltY, maxShift, enabled]);

    return ref;
};

export default usePointerTilt;
