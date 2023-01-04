import React from 'react';
import './Checkbox.css';

function Checkbox({name, labelText, register}) {
    return (
        <div className="component-checkbox">
            <label htmlFor={name} className="component-checkbox__label">
                <input
                    type="checkbox"
                    id={name}
                    className="component-checkbox__input"
                    name={name}
                    {...register(name)}
                />
                {labelText}
            </label>
        </div>
    );
}

export default Checkbox;