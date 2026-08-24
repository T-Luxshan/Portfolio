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
};

/**
 * Reveals its children once when scrolled into view.
 * `index` drives the stagger delay via the shared `--i` custom property.
 * `glow` opts the element into the cursor-following highlight.
 */
const Reveal = ({
    as: Tag = 'div',
    index = 0,
    variant = 'up',
    glow = false,
    className = '',
    style,
    children,
    ...rest
}) => {
    const revealRef = useReveal();
    const glowRef = usePointerTilt({ maxTilt: 0, enabled: glow });

    const classes = ['reveal', VARIANT_CLASS[variant], glow && 'glow-follow', className]
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
