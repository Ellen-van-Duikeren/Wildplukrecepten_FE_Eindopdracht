import React from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';
import Checkbox from '../../components/checkbox/checkbox';

function NewRecipe(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <h1>Een nieuw recept aanmaken</h1>
            <div className="newrecipepage">

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="texts">
                    <Input
                        labelText="Titel *"
                        inputType="text"
                        inputId="title"
                        inputName="title"
                        placeholder="bijv frambozenjam"
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

                    <Input
                        labelText="Subtitel"
                        inputType="text"
                        inputId="subtitle-field"
                        inputName="subtitle"
                        placeholder="bijv de heerlijkste ter wereld"
                        validationRules={{
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 karakters',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {errors.title && <p>{errors.title.message}</p>}

                    <Input
                        labelText="Aantal personen"
                        inputType="number"
                        inputId="persons-field"
                        inputName="persons"
                        inputMin="1"
                        inputMax="30"
                        value="1"
                        register={register}
                        errors={errors}
                    />


                    <Input
                        labelText="Bron"
                        inputType="text"
                        inputId="source"
                        inputName="source"
                        placeholder="bijv www.natuurkok.nl"
                        validationRules={{
                            maxLength: {
                                value: 250,
                                message: 'Maximaal 250 karakters',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {errors.source && <p>{errors.source.message}</p>}

                    <div id="textarea-field">
                        <label htmlFor="story">
                            Tekst
                            <textarea
                                id="story" name="story" rows="4" cols="57"
                                placeholder="bijv een verhaaltje over jouw eigen ervaringen met dit recept">
                            </textarea>
                        </label>
                    </div>

                    <Input
                        labelText="Voorbereidingstijd"
                        inputType="text"
                        inputId="preptime"
                        inputName="prepTime"
                        placeholder="bijv 20 min"
                        validationRules={{
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 karakters',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {errors.prepTime && <p>{errors.prepTime.message}</p>}

                    <Input
                        labelText="Bereidingstijd *"
                        inputType="text"
                        inputId="cooktime"
                        inputName="cookTime"
                        placeholder="bijv 20 min"
                        validationRules={{
                            maxLength: {
                                value: 50,
                                message: 'Maximaal 50 karakters',
                            },
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht'
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {errors.cookTime && <p>{errors.cookTime.message}</p>}
                    </div>


{/*checkboxes............................................*/}
                    <div className="checkboxes">
                        <h3>Vink hieronder aan wat van toepassing is</h3>

                        <Checkbox
                            inputName="vegetarian"
                            labelText="vegetarisch"
                        />

                        <Checkbox
                            inputName="vegan"
                            labelText="veganistisch"
                        />

                        <Checkbox
                            inputName="lactosefree"
                            labelText="lactosevrij"
                        />

                        <Checkbox
                            inputName="glutenfree"
                            labelText="glutenvrij"
                        />

                        <Checkbox
                            inputName="sidedish"
                            labelText="bijgerecht"
                        />

                        <Checkbox
                            inputName="maindish"
                            labelText="hoofdgerecht"
                        />

                        <Checkbox
                            inputName="drinks"
                            labelText="drinken"
                        />

                        <Checkbox
                            inputName="breakfast"
                            labelText="ontbijt"
                        />

                        <Checkbox
                            inputName="lunch"
                            labelText="lunch"
                        />

                        <Checkbox
                            inputName="diner"
                            labelText="diner"
                        />

                        <Checkbox
                            inputName="snack"
                            labelText="tussendoortje"
                        />

                        <Checkbox
                            inputName="openfire"
                            labelText="open vuur"
                        />

                        <Checkbox
                            inputName="dutchoven"
                            labelText="dutch oven"
                        />

                    </div>


                    {/*foto*/}
                    {/*maanden*/}

                    {/*ingredient*/}
                    {/*instructie*/}

                    <p>* is verplicht</p>

                    <button type="submit">Versturen</button>
                </form>
            </div>
        </>
    )
        ;
}

export default NewRecipe;