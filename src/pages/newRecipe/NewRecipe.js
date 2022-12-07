import React from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';

function NewRecipe(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (

        <div className="newrecipe">
            <h1>Een nieuw recept aanmaken</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Input
                inputType="text"
                inputId="title"
                placeholder="titel"
                validationRules={{
                    required: {
                        value: true,
                        message: 'Dit veld is verplicht',
                    }
                }}
                register={register}
                errors={errors}
                />
                {errors.title && <p>{errors.title.message}</p>}


                <label htmlFor="title-field">
                    Titel:
                    <input
                        type="text"
                        id="title-field"
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Dit veld is verplicht",
                            },
                        })}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </label>
                <label htmlFor="subtitle-field">
                    Subtitel:
                    <input
                        type="text"
                        id="subtitle-field"
                        {...register("subtitle")}
                    />
                </label>
                <label htmlFor="persons-field">
                    Aantal personen:
                    <input
                        type="number"
                        id="persons-field"
                        {...register("persons", {
                            required: {
                                value: true,
                                message: "Dit veld is verplicht"
                            },
                            min: {
                                value: 1,
                                message: "Aantal personen is minimaal 1"
                            },
                        })}
                    />
                    {errors.persons && <p>{errors.persons.message}</p>}
                </label>
                <label htmlFor="subtitle-field">
                    Email:
                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            validate: (value) => value.includes('@') || "Email moet een @ bevatten",
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </label>
                <button type="submit">Versturen</button>
            </form>
        </div>
    )
        ;
}

export default NewRecipe;