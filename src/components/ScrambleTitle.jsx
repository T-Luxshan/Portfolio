import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion';
import { onIntroDone } from '../motion/introState';
import './ScrambleTitle.css';

const START_TEXT  = 'I AM SPIDER-MAN';
const END_TEXT    = 'I AM A SOFTWARE ENGINEER';

// Uppercase-heavy pool so it reads like a digital decoding, not lorem ipsum
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*!?X';

// Timing (ms)
const HOLD_MS     = 1000;   // show "I AM SPIDER-MAN" before anything moves
const SCRAMBLE_MS = 700;   // intense scramble phase
const LOCK_MS     = 500;   // characters progressively lock left → right
const FRAME_MS    = 40;    // ~25 fps for the scramble — fast but still legible

const rand = (pool) => pool[Math.floor(Math.random() * pool.length)];

/**
 * Per-character lock thresholds (0 = locks first, 1 = locks last).
 * Spaces lock immediately; other chars follow a left-to-right wave with jitter.
 */
const buildLockThresholds = (text) =>
    text.split('').map((ch, i) => {
        if (ch === ' ') return 0;
        const base   = i / (text.length - 1);
        const jitter = (Math.random() - 0.5) * 0.12;
        return Math.max(0.02, Math.min(0.97, base + jitter));
    });

const ScrambleTitle = () => {
    const spanRef = useRef(null);

    useEffect(() => {
        const el = spanRef.current;
        if (!el) return;

        // Respect reduced-motion — skip straight to the final text.
        if (prefersReducedMotion()) {
            el.textContent = END_TEXT;
            el.classList.add('is-settled');
            return;
        }

        // Keep the start text visible while we wait for the intro overlay.
        el.textContent = START_TEXT;
        el.classList.remove('is-scrambling', 'is-settled');

        let raf = null;

        const startAnimation = () => {
            const lockThresholds = buildLockThresholds(END_TEXT);

            let startTime = null;
            let lastFrame = 0;

            const startLen = START_TEXT.length;
            const endLen   = END_TEXT.length;

            const render = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;

                // ── Phase 1: hold "I AM SPIDER-MAN" ──────────────────────────
                if (elapsed < HOLD_MS) {
                    raf = requestAnimationFrame(render);
                    return;
                }

                // Throttle DOM writes to FRAME_MS
                if (timestamp - lastFrame < FRAME_MS) {
                    raf = requestAnimationFrame(render);
                    return;
                }
                lastFrame = timestamp;

                const scrambleElapsed = elapsed - HOLD_MS;
                const total           = SCRAMBLE_MS + LOCK_MS;

                // ── Done ──────────────────────────────────────────────────────
                if (scrambleElapsed >= total) {
                    el.textContent = END_TEXT;
                    el.classList.remove('is-scrambling');
                    el.classList.add('is-settled');
                    return;
                }

                // ── Phase 2 + 3: scramble → progressive lock ──────────────────
                if (!el.classList.contains('is-scrambling')) {
                    el.classList.add('is-scrambling');
                }

                // Length grows from startLen → endLen in the first 60 % of scramble
                const growProgress = Math.min(1, scrambleElapsed / (SCRAMBLE_MS * 0.6));
                const currentLen   = Math.round(startLen + (endLen - startLen) * growProgress);

                // 0 before locking begins, 1 when fully locked
                const lockProgress = Math.max(0, (scrambleElapsed - SCRAMBLE_MS) / LOCK_MS);

                // Near end of scramble: chars occasionally flash their real value
                const realFlashP =
                    scrambleElapsed > SCRAMBLE_MS * 0.65
                        ? ((scrambleElapsed - SCRAMBLE_MS * 0.65) / (SCRAMBLE_MS * 0.35)) * 0.25
                        : 0;

                let result = '';
                for (let i = 0; i < endLen; i++) {
                    const ch = END_TEXT[i];

                    if (i >= currentLen) {
                        result += ' ';
                    } else if (ch === ' ') {
                        result += ' ';
                    } else if (lockProgress > 0 && lockProgress >= lockThresholds[i]) {
                        result += ch;
                    } else {
                        result += Math.random() < realFlashP ? ch : rand(CHARS);
                    }
                }

                el.textContent = result;
                raf = requestAnimationFrame(render);
            };

            raf = requestAnimationFrame(render);
        };

        // Wait for the intro overlay to finish, then start the scramble.
        const unsub = onIntroDone(startAnimation);

        return () => {
            unsub();
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <span ref={spanRef} className="scramble-title">
            {START_TEXT}
        </span>
    );
};

export default ScrambleTitle;
