import React from 'react';
import './Input.css';

function Input({ inputType, placeholder, inputName, labelText, inputId, validationRules, register, errors }) {


    return (
        <div className="inputcomponent">
            <label htmlFor={inputId}>
                {labelText}
                <input
                    type={inputType}
                    id={inputId}
                    placeholder={placeholder}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </div>
    );
}

export default Input;