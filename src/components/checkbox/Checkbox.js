import React from 'react';
import './Checkbox.css';

function Checkbox({name, labelText, register}) {
    return (
        <div className="checkbox">
            <label htmlFor={name} className="checkbox__label">
                <input
                    type="checkbox"
                    id={name}
                    className="checkbox__input"
                    name={name}
                    {...register(name)}
                />
                {labelText}
            </label>
        </div>
    );
}

export default Checkbox;