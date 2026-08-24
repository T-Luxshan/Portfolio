/**
 * Minimal observer that lets ScrambleTitle (and anything else) know when
 * the Intro overlay has finished — even if the intro already completed before
 * the listener was registered.
 */

const listeners = new Set();
let resolved = false;

/** Call once from Intro when the overlay finishes (or immediately if skipped). */
export const markIntroDone = () => {
    if (resolved) return;
    resolved = true;
    listeners.forEach((cb) => cb());
    listeners.clear();
};

/**
 * Register a callback to run when the intro is done.
 * If already done, the callback fires on the next microtask.
 * Returns an unsubscribe function.
 */
export const onIntroDone = (callback) => {
    if (resolved) {
        Promise.resolve().then(callback);
        return () => {};
    }
    listeners.add(callback);
    return () => listeners.delete(callback);
};

/** Reset for testing / HMR — not needed in production. */
export const resetIntroState = () => {
    resolved = false;
    listeners.clear();
};
