import React from 'react';
import './Input.css';

function Input({ type, name, labelText, className, placeholder, value, min, max, step, register, validationRules, errors }) {


    return (
        <div className="margin-bottom2">
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