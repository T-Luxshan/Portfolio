import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(QUERY).matches;

export const supportsFinePointer = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const useReducedMotion = () => {
    const [reduced, setReduced] = useState(prefersReducedMotion);

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;

        const mediaQuery = window.matchMedia(QUERY);
        const onChange = (event) => setReduced(event.matches);

        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

    return reduced;
};

export default useReducedMotion;
