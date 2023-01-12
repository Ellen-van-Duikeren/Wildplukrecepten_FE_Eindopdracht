import React from 'react';
import './Input.css';

function Input({ value, name, labelText, type, className, placeholder, min, max, step, register,  validationRules, errors }) {


    return (
        <div className="component__input">
            <label htmlFor={name} >
                {labelText}
                <input
                    type={type}
                    name={name}
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    {...register(name, validationRules)}
                />
            </label>
            {errors[name] && <p>{errors[name].message}</p>}
        </div>
    );
}

export default Input;