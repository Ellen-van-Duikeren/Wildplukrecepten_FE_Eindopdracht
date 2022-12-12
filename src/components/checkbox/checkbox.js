import React from 'react';
import './Checkbox.css';

function Checkbox({inputName, labelText, register}) {
    return (
        <div className="checkboxcomponent">
            <label htmlFor={inputName}>
                <input
                    type="checkbox"
                    id={inputName}
                    name={inputName}
                    {...register(inputName)}
                />
                {labelText}
            </label>
        </div>
    );
}

export default Checkbox;