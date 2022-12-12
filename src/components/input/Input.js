import React from 'react';
import './Input.css';

function Input({ inputValue, inputType, placeholder, inputName, labelText, inputId, validationRules, register, errors, inputMin, inputMax, inputStep }) {


    return (
        <div className="inputcomponent">
            <label htmlFor={inputId}>
                {labelText}
                <input
                    type={inputType}
                    id={inputId}
                    placeholder={placeholder}
                    min={inputMin}
                    max={inputMax}
                    step={inputStep}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </div>
    );
}

export default Input;