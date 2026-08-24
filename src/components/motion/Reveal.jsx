import React from 'react';
import useReveal from '../../hooks/useReveal';
import usePointerTilt from '../../hooks/usePointerTilt';
import mergeRefs from '../../hooks/mergeRefs';

const VARIANT_CLASS = {
    up: '',
    left: 'reveal--left',
    right: 'reveal--right',
    scale: 'reveal--scale',
    blur: 'reveal--blur',
    swing: 'reveal--swing',
    throw: 'reveal--throw',
    land: 'reveal--land',
    drop: 'reveal--drop',
};

/**
 * Reveals its children once when scrolled into view.
 *
 * `variant` selects the entrance character (a swing settles like a hanging web
 * line, a throw lands with impact), `index` drives the stagger delay through
 * the shared `--i` custom property, `mask` wipes the content in behind a hard
 * edge, and `glow` opts into the cursor-following highlight.
 */
const Reveal = ({
    as: Tag = 'div',
    index = 0,
    variant = 'up',
    glow = false,
    mask = false,
    className = '',
    style,
    children,
    ...rest
}) => {
    const revealRef = useReveal();
    const glowRef = usePointerTilt({ maxTiltX: 0, maxTiltY: 0, enabled: glow });

    const classes = [
        'reveal',
        VARIANT_CLASS[variant],
        mask && 'mask-reveal',
        glow && 'glow-follow',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Tag
            ref={mergeRefs(revealRef, glowRef)}
            className={classes}
            style={{ '--i': index, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
