import React from 'react';
import useMagnetic from '../../hooks/useMagnetic';
import { swingTo } from '../../motion/swing';

/**
 * Wraps an interactive element so it leans toward the cursor as it approaches,
 * more strongly the closer the cursor gets. The hook no-ops on touch devices
 * and under reduced motion, leaving a plain element with no transform.
 *
 * In-page hash links travel by web swing rather than a plain jump.
 */
const MagneticButton = ({
    as: Tag = 'a',
    strength = 7,
    radius = 110,
    className = '',
    href,
    onClick,
    children,
    ...rest
}) => {
    const ref = useMagnetic({ strength, radius });
    const classes = ['magnetic', 'spider-sense', className].filter(Boolean).join(' ');

    const handleClick = (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        const targetId = href?.startsWith('#') ? href.slice(1) : null;
        if (!targetId || !document.getElementById(targetId)) return;

        event.preventDefault();
        const rect = event.currentTarget.getBoundingClientRect();
        swingTo(targetId, { x: rect.left + rect.width / 2, y: rect.bottom });
    };

    return (
        <Tag ref={ref} className={classes} href={href} onClick={handleClick} {...rest}>
            {children}
        </Tag>
    );
};

export default MagneticButton;
