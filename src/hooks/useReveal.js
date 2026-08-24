import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

let sharedObserver = null;

const getObserver = () => {
    if (sharedObserver) return sharedObserver;

    sharedObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // Toggle is-visible on every intersection change so animations
                // replay each time the element scrolls back into view.
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    return sharedObserver;
};

/**
 * Toggles `is-visible` every time the element enters / leaves the viewport,
 * so reveal animations replay on each scroll past.
 * All consumers share a single IntersectionObserver instance.
 */
const useReveal = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
            el.classList.add('is-visible');
            return;
        }

        const observer = getObserver();
        observer.observe(el);
        return () => observer.unobserve(el);
    }, []);

    return ref;
};

export default useReveal;
