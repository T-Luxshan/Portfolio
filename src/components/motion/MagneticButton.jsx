import React from 'react';
import usePointerTilt from '../../hooks/usePointerTilt';

/**
 * Wraps an interactive element so it drifts slightly toward the cursor.
 * The hook no-ops on touch devices and under reduced motion, in which case this
 * renders as a plain element with no transform.
 */
const MagneticButton = ({ as: Tag = 'a', className = '', children, ...rest }) => {
    const ref = usePointerTilt({ maxTilt: 0, maxMagnet: 6 });
    const classes = ['magnetic', className].filter(Boolean).join(' ');

    return (
        <Tag ref={ref} className={classes} {...rest}>
            {children}
        </Tag>
    );
};

export default MagneticButton;
