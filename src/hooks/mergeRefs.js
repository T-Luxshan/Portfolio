/**
 * Returns a callback ref that assigns the node to every provided ref.
 * Lets one element receive both a reveal ref and a pointer-tilt ref.
 */
const mergeRefs =
    (...refs) =>
        (node) => {
            refs.forEach((ref) => {
                if (!ref) return;
                if (typeof ref === 'function') ref(node);
                else ref.current = node;
            });
        };

export default mergeRefs;
