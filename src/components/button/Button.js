import React from 'react';
import './Button.css';

function Button({type, className, children}) {
    return (
        <button
        type={type}
        className={className}>
            {children}
        </button>

    );
}

export default Button;