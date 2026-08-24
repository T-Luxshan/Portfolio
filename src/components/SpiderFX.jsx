import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion, supportsFinePointer } from '../hooks/useReducedMotion';
import './SpiderFX.css';

/**
 * The environment layer: a New York night behind the content and a reactive web
 * layer in front of it.
 *
 * Both canvases are driven by a single requestAnimationFrame loop and hold no
 * React state, so nothing here re-renders the app. The loop sleeps while the
 * tab is hidden. Everything is sized to devicePixelRatio, capped at 2 so
 * high-density displays don't pay for pixels nobody can see.
 *
 *   background canvas: skyline, rain, drifting web mesh (scroll + cursor parallax)
 *   foreground canvas: cursor trail, web strands attaching to hovered cards,
 *                      impact bursts on click
 */

const ATTACH_SELECTOR = '.project-card, .certification-card, .skill-card, .education-card';
const BURST_SELECTOR = 'a, button, .project-card';

const CONFIG = {
    desktop: { nodes: 74, linkDistance: 132, rain: 70, cursorRadius: 170 },
    mobile: { nodes: 28, linkDistance: 108, rain: 30, cursorRadius: 0 },
};

const rand = (min, max) => min + Math.random() * (max - min);

const SpiderFX = () => {
    const bgRef = useRef(null);
    const fgRef = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const bg = bgRef.current;
        const fg = fgRef.current;
        if (!bg) return;

        const bgCtx = bg.getContext('2d', { alpha: true });
        const fgCtx = fg ? fg.getContext('2d', { alpha: true }) : null;
        if (!bgCtx) return;

        const interactive = supportsFinePointer();
        const settings = window.innerWidth <= 768 ? CONFIG.mobile : CONFIG.desktop;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let nodes = [];
        let drops = [];
        let skyline = [];
        let frame = 0;
        let running = true;

        const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, inside: false };
        const trail = [];
        const bursts = [];
        let attachTarget = null;
        // Kept after the cursor leaves so the strands can retract rather than blink out
        let attachRetained = null;
        let attachStrength = 0;

        const scrollState = { y: window.scrollY, target: window.scrollY, velocity: 0 };

        /* ---------------------------------------------------------- setup */

        const buildScene = () => {
            nodes = Array.from({ length: settings.nodes }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: rand(-0.09, 0.09),
                vy: rand(-0.07, 0.07),
                // depth drives size, brightness and how much a node parallaxes
                depth: rand(0.25, 1),
                ox: 0,
                oy: 0,
            }));

            drops = Array.from({ length: settings.rain }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                len: rand(9, 26),
                speed: rand(3.4, 8.2),
                depth: rand(0.3, 1),
            }));

            // Abstract skyline: deterministic-enough silhouette with lit windows
            skyline = [];
            let x = -40;
            while (x < width + 40) {
                const w = rand(46, 122);
                const h = rand(70, 240);
                const windows = [];
                const cols = Math.max(1, Math.floor(w / 18));
                const rows = Math.max(1, Math.floor(h / 22));
                for (let c = 0; c < cols; c += 1) {
                    for (let r = 0; r < rows; r += 1) {
                        if (Math.random() > 0.72) {
                            windows.push({
                                x: 7 + c * 18,
                                y: 12 + r * 22,
                                warm: Math.random() > 0.35,
                                phase: Math.random() * Math.PI * 2,
                            });
                        }
                    }
                }
                skyline.push({ x, w, h, windows });
                x += w + rand(4, 18);
            }
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;

            [bg, fg].forEach((canvas) => {
                if (!canvas) return;
                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
            });

            bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (fgCtx) fgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

            buildScene();
        };

        /* ---------------------------------------------------- draw: skyline */

        const drawSkyline = (time) => {
            const baseline = height + 8;
            const drift = -scrollState.y * 0.02;

            bgCtx.save();
            bgCtx.translate(drift, 0);

            skyline.forEach((building) => {
                const top = baseline - building.h;

                bgCtx.fillStyle = 'rgba(6, 9, 18, 0.92)';
                bgCtx.fillRect(building.x, top, building.w, building.h);

                // rim light so silhouettes separate from the sky
                bgCtx.fillStyle = 'rgba(225, 29, 46, 0.09)';
                bgCtx.fillRect(building.x, top, 1.2, building.h);

                building.windows.forEach((win) => {
                    const flicker = 0.5 + 0.5 * Math.sin(time * 0.0008 + win.phase);
                    bgCtx.globalAlpha = 0.1 + flicker * 0.24;
                    bgCtx.fillStyle = win.warm ? '#e8b06a' : '#7fa8ff';
                    bgCtx.fillRect(building.x + win.x, top + win.y, 3.4, 5.2);
                });
                bgCtx.globalAlpha = 1;
            });

            bgCtx.restore();
        };

        /* ------------------------------------------------------- draw: rain */

        const drawRain = () => {
            bgCtx.lineCap = 'round';
            drops.forEach((drop) => {
                const speed = drop.speed + scrollState.velocity * 0.06 * drop.depth;
                drop.y += speed;
                drop.x += speed * 0.34;

                if (drop.y > height + drop.len || drop.x > width + drop.len) {
                    drop.y = -drop.len - Math.random() * 60;
                    drop.x = Math.random() * (width + 120) - 60;
                }

                bgCtx.strokeStyle = `rgba(176, 198, 255, ${0.05 + drop.depth * 0.1})`;
                bgCtx.lineWidth = 0.6 + drop.depth * 0.7;
                bgCtx.beginPath();
                bgCtx.moveTo(drop.x, drop.y);
                bgCtx.lineTo(drop.x - drop.len * 0.34, drop.y - drop.len);
                bgCtx.stroke();
            });
        };

        /* ------------------------------------------------------ draw: mesh */

        const drawMesh = () => {
            const parallaxY = -scrollState.y * 0.06;
            const px = pointer.inside ? pointer.x : -9999;
            const py = pointer.inside ? pointer.y : -9999;

            // Positions first, so links can use the settled offsets
            nodes.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < -30) node.x = width + 30;
                if (node.x > width + 30) node.x = -30;
                if (node.y < -30) node.y = height + 30;
                if (node.y > height + 30) node.y = -30;

                let targetOx = 0;
                let targetOy = 0;

                if (settings.cursorRadius) {
                    const dx = node.x - px;
                    const dy = node.y + parallaxY * node.depth - py;
                    const dist = Math.hypot(dx, dy);
                    if (dist < settings.cursorRadius && dist > 0.001) {
                        // Nearby strands are pushed outward, closer ones react more
                        const push = (1 - dist / settings.cursorRadius) ** 2 * 26 * node.depth;
                        targetOx = (dx / dist) * push;
                        targetOy = (dy / dist) * push;
                    }
                }

                node.ox += (targetOx - node.ox) * 0.09;
                node.oy += (targetOy - node.oy) * 0.09;
                node.sx = node.x + node.ox;
                node.sy = node.y + node.oy + parallaxY * node.depth;
            });

            const maxDist = settings.linkDistance;

            for (let i = 0; i < nodes.length; i += 1) {
                const a = nodes[i];

                for (let j = i + 1; j < nodes.length; j += 1) {
                    const b = nodes[j];
                    const dx = a.sx - b.sx;
                    if (dx > maxDist || dx < -maxDist) continue;
                    const dy = a.sy - b.sy;
                    if (dy > maxDist || dy < -maxDist) continue;

                    const dist = Math.hypot(dx, dy);
                    if (dist > maxDist) continue;

                    const closeness = 1 - dist / maxDist;
                    const depth = (a.depth + b.depth) / 2;
                    bgCtx.strokeStyle = `rgba(150, 170, 214, ${(closeness * 0.16 * depth).toFixed(3)})`;
                    bgCtx.lineWidth = 0.35 + depth * 0.45;
                    bgCtx.beginPath();
                    bgCtx.moveTo(a.sx, a.sy);
                    bgCtx.lineTo(b.sx, b.sy);
                    bgCtx.stroke();
                }

                // Strands reaching toward the cursor: the spider-sense tell
                if (settings.cursorRadius && pointer.inside) {
                    const dx = a.sx - px;
                    const dy = a.sy - py;
                    const dist = Math.hypot(dx, dy);
                    if (dist < settings.cursorRadius) {
                        const closeness = 1 - dist / settings.cursorRadius;
                        bgCtx.strokeStyle = `rgba(225, 29, 46, ${(closeness * 0.22).toFixed(3)})`;
                        bgCtx.lineWidth = 0.5 + closeness * 0.6;
                        bgCtx.beginPath();
                        bgCtx.moveTo(a.sx, a.sy);
                        bgCtx.lineTo(px, py);
                        bgCtx.stroke();
                    }
                }

                const size = 0.7 + a.depth * 1.3;
                bgCtx.fillStyle = `rgba(206, 218, 245, ${(0.16 + a.depth * 0.26).toFixed(3)})`;
                bgCtx.beginPath();
                bgCtx.arc(a.sx, a.sy, size, 0, Math.PI * 2);
                bgCtx.fill();
            }
        };

        /* ------------------------------------------- draw: cursor lighting */

        const drawCursorGlow = () => {
            if (!pointer.inside) return;
            const radius = 240;
            const gradient = bgCtx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
            gradient.addColorStop(0, 'rgba(225, 29, 46, 0.1)');
            gradient.addColorStop(0.5, 'rgba(30, 111, 255, 0.045)');
            gradient.addColorStop(1, 'rgba(10, 15, 28, 0)');
            bgCtx.fillStyle = gradient;
            bgCtx.fillRect(pointer.x - radius, pointer.y - radius, radius * 2, radius * 2);
        };

        /* ------------------------------------------ draw: foreground layer */

        const drawTrail = () => {
            if (trail.length < 2) return;

            for (let i = 1; i < trail.length; i += 1) {
                const prev = trail[i - 1];
                const point = trail[i];
                const life = point.life;
                fgCtx.strokeStyle = `rgba(225, 29, 46, ${(life * 0.42).toFixed(3)})`;
                fgCtx.lineWidth = life * 1.9;
                fgCtx.lineCap = 'round';
                fgCtx.beginPath();
                fgCtx.moveTo(prev.x, prev.y);
                fgCtx.lineTo(point.x, point.y);
                fgCtx.stroke();
            }

            for (let i = trail.length - 1; i >= 0; i -= 1) {
                trail[i].life -= 0.055;
                if (trail[i].life <= 0) trail.splice(i, 1);
            }
        };

        const drawAttachment = () => {
            const targetStrength = attachTarget ? 1 : 0;
            attachStrength += (targetStrength - attachStrength) * 0.16;

            if (attachStrength < 0.02) {
                attachRetained = attachTarget;
                return;
            }
            if (attachTarget) attachRetained = attachTarget;
            if (!attachRetained) return;

            const rect = attachRetained.getBoundingClientRect();
            const anchors = [
                { x: rect.left, y: rect.top },
                { x: rect.right, y: rect.top },
                { x: rect.left, y: rect.bottom },
                { x: rect.right, y: rect.bottom },
            ];

            anchors.forEach((anchor) => {
                // Strands retract toward their anchor as the connection fades
                const tipX = anchor.x + (pointer.x - anchor.x) * attachStrength;
                const tipY = anchor.y + (pointer.y - anchor.y) * attachStrength;
                const midX = (anchor.x + tipX) / 2;
                const midY = (anchor.y + tipY) / 2;
                // Sag the strand so it reads as web, not wire
                const sag = 9 + 14 * (1 - attachStrength);
                const ctrlX = midX + (tipX - midX) * 0.25;
                const ctrlY = midY + sag;

                fgCtx.strokeStyle = `rgba(225, 29, 46, ${(attachStrength * 0.42).toFixed(3)})`;
                fgCtx.lineWidth = 0.9;
                fgCtx.beginPath();
                fgCtx.moveTo(anchor.x, anchor.y);
                fgCtx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
                fgCtx.stroke();
            });

            // Concentric rings make the attachment point read as a small web
            fgCtx.strokeStyle = `rgba(255, 255, 255, ${(attachStrength * 0.16).toFixed(3)})`;
            fgCtx.lineWidth = 0.6;
            for (let ring = 1; ring <= 2; ring += 1) {
                fgCtx.beginPath();
                fgCtx.arc(pointer.x, pointer.y, ring * 11 * attachStrength, 0, Math.PI * 2);
                fgCtx.stroke();
            }
        };

        const drawBursts = () => {
            for (let i = bursts.length - 1; i >= 0; i -= 1) {
                const burst = bursts[i];
                burst.life -= 0.045;
                if (burst.life <= 0) {
                    bursts.splice(i, 1);
                    continue;
                }

                const progress = 1 - burst.life;
                const radius = 8 + progress * 58;
                const alpha = burst.life * 0.55;

                fgCtx.strokeStyle = `rgba(225, 29, 46, ${alpha.toFixed(3)})`;
                fgCtx.lineWidth = 2.2 * burst.life;
                fgCtx.beginPath();
                fgCtx.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
                fgCtx.stroke();

                // Radial speed lines: the comic-book impact read
                const spokes = 9;
                fgCtx.lineWidth = 1.4 * burst.life;
                for (let s = 0; s < spokes; s += 1) {
                    const angle = burst.rotation + (s / spokes) * Math.PI * 2;
                    const inner = radius * 0.72;
                    const outer = radius * (1.05 + burst.life * 0.35);
                    fgCtx.beginPath();
                    fgCtx.moveTo(burst.x + Math.cos(angle) * inner, burst.y + Math.sin(angle) * inner);
                    fgCtx.lineTo(burst.x + Math.cos(angle) * outer, burst.y + Math.sin(angle) * outer);
                    fgCtx.stroke();
                }
            }
        };

        /* ------------------------------------------------------------ loop */

        const render = (time) => {
            frame = 0;
            if (!running) return;

            scrollState.velocity += (scrollState.target - scrollState.y - scrollState.velocity) * 0.2;
            scrollState.y += (scrollState.target - scrollState.y) * 0.12;

            bgCtx.clearRect(0, 0, width, height);
            drawSkyline(time);
            drawRain();
            drawMesh();
            drawCursorGlow();

            if (fgCtx) {
                fgCtx.clearRect(0, 0, width, height);
                if (interactive) {
                    drawTrail();
                    drawAttachment();
                }
                drawBursts();
            }

            frame = requestAnimationFrame(render);
        };

        /* -------------------------------------------------------- listeners */

        const onPointerMove = (event) => {
            pointer.vx = event.clientX - pointer.x;
            pointer.vy = event.clientY - pointer.y;
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.inside = true;

            const speed = Math.hypot(pointer.vx, pointer.vy);
            if (speed > 2.5) {
                trail.push({ x: pointer.x, y: pointer.y, life: Math.min(1, 0.4 + speed / 60) });
                if (trail.length > 22) trail.shift();
            }

            const hovered = event.target instanceof Element ? event.target.closest(ATTACH_SELECTOR) : null;
            attachTarget = hovered;
        };

        const onPointerLeave = () => {
            pointer.inside = false;
            attachTarget = null;
        };

        const onPointerDown = (event) => {
            if (!(event.target instanceof Element) || !event.target.closest(BURST_SELECTOR)) return;
            bursts.push({
                x: event.clientX,
                y: event.clientY,
                life: 1,
                rotation: Math.random() * Math.PI,
            });
        };

        const onScroll = () => {
            scrollState.target = window.scrollY;
        };

        const onVisibility = () => {
            running = !document.hidden;
            if (running && !frame) frame = requestAnimationFrame(render);
        };

        resize();
        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);

        if (interactive) {
            window.addEventListener('pointermove', onPointerMove, { passive: true });
            document.addEventListener('pointerleave', onPointerLeave);
            window.addEventListener('pointerdown', onPointerDown, { passive: true });
        }

        frame = requestAnimationFrame(render);

        return () => {
            running = false;
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerleave', onPointerLeave);
            window.removeEventListener('pointerdown', onPointerDown);
        };
    }, []);

    if (prefersReducedMotion()) return null;

    return (
        <>
            <canvas ref={bgRef} className="fx-canvas fx-canvas--bg" aria-hidden="true" />
            <canvas ref={fgRef} className="fx-canvas fx-canvas--fg" aria-hidden="true" />
        </>
    );
};

export default SpiderFX;
