import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Measures the live position of a set of child nodes inside a container and
 * returns coordinates in the container's own space, so an SVG overlay can draw
 * real connective strands between them.
 *
 * Positions are re-measured on resize and whenever the container's box changes
 * (a grid reflowing from three columns to one, for example), never per frame.
 */
const useWebGraph = (count) => {
    const containerRef = useRef(null);
    const nodeRefs = useRef([]);
    const [graph, setGraph] = useState({ width: 0, height: 0, points: [] });

    const setNodeRef = useCallback((index) => (node) => {
        nodeRefs.current[index] = node;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let frame = 0;

        const measure = () => {
            frame = 0;
            const base = container.getBoundingClientRect();
            if (!base.width) return;

            const points = nodeRefs.current.slice(0, count).map((node) => {
                if (!node) return null;
                const rect = node.getBoundingClientRect();
                return {
                    x: rect.left - base.left + rect.width / 2,
                    y: rect.top - base.top + rect.height / 2,
                };
            });

            setGraph({ width: base.width, height: base.height, points });
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };

        schedule();

        const observer = new ResizeObserver(schedule);
        observer.observe(container);
        window.addEventListener('resize', schedule, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [count]);

    return { containerRef, setNodeRef, graph };
};

export default useWebGraph;
