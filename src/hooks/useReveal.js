import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

let sharedObserver = null;

const getObserver = () => {
    if (sharedObserver) return sharedObserver;

    sharedObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                sharedObserver.unobserve(entry.target);
            });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    return sharedObserver;
};

/**
 * Adds `is-visible` once the element scrolls into view, then stops observing it.
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
