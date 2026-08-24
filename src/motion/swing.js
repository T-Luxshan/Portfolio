import { prefersReducedMotion } from '../hooks/useReducedMotion';

/**
 * Web-swing navigation.
 *
 * Instead of handing the jump to native smooth scrolling, this drives the
 * scroll position itself so the movement can have a character: a fast launch,
 * a hard deceleration, and a slight overshoot that settles, like landing after
 * a swing. While it runs, `body.is-swinging` lets CSS add speed lines and a
 * touch of motion blur, and subscribers get the origin/target points so a web
 * line can be drawn between them.
 */

const listeners = new Set();

let animation = 0;
let abortSwing = null;

export const subscribeSwing = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const emit = (event) => listeners.forEach((listener) => listener(event));

// Fast launch, strong stop, small overshoot that settles back.
const easeOutBack = (t) => {
    const c = 1.05;
    return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
};

const navbarOffset = () => {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.offsetHeight : 80;
};

export const cancelSwing = () => {
    if (animation) {
        cancelAnimationFrame(animation);
        animation = 0;
    }
    if (abortSwing) {
        abortSwing();
        abortSwing = null;
    }
};

/**
 * @param targetId id of the section to travel to
 * @param origin   {x, y} viewport point the web shoots from, usually the nav item
 */
export const swingTo = (targetId, origin) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    cancelSwing();

    const startY = window.scrollY;
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const destination = Math.max(
        0,
        Math.min(target.getBoundingClientRect().top + window.scrollY - navbarOffset(), maxY)
    );
    const distance = destination - startY;

    if (prefersReducedMotion() || Math.abs(distance) < 4) {
        window.scrollTo({ top: destination, behavior: 'auto' });
        return;
    }

    // Longer trips take longer, but never long enough to feel slow.
    const duration = Math.min(980, Math.max(460, Math.abs(distance) * 0.42));
    const direction = distance > 0 ? 'down' : 'up';

    const targetRect = target.getBoundingClientRect();
    emit({
        type: 'start',
        direction,
        origin,
        anchor: {
            x: targetRect.left + targetRect.width / 2,
            y: Math.max(navbarOffset() + 20, Math.min(targetRect.top, window.innerHeight - 40)),
        },
    });

    document.body.classList.add('is-swinging');
    document.body.dataset.swingDir = direction;

    // Native smooth scrolling would fight a per-frame scrollTo.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const finish = () => {
        animation = 0;
        abortSwing = null;
        root.style.scrollBehavior = previousBehavior;
        document.body.classList.remove('is-swinging');
        delete document.body.dataset.swingDir;
        window.removeEventListener('wheel', onUserScroll);
        window.removeEventListener('touchstart', onUserScroll);
        window.removeEventListener('keydown', onUserScroll);
        emit({ type: 'end' });
    };

    // A user who grabs the scroll mid-flight should win immediately.
    function onUserScroll() {
        cancelSwing();
    }

    abortSwing = finish;

    const start = performance.now();

    const step = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeOutBack(t);
        const next = startY + distance * eased;

        window.scrollTo(0, Math.max(0, Math.min(next, maxY)));

        if (t < 1) {
            animation = requestAnimationFrame(step);
            return;
        }

        window.scrollTo(0, destination);
        finish();
    };

    window.addEventListener('wheel', onUserScroll, { passive: true, once: true });
    window.addEventListener('touchstart', onUserScroll, { passive: true, once: true });
    window.addEventListener('keydown', onUserScroll, { once: true });

    animation = requestAnimationFrame(step);
};
