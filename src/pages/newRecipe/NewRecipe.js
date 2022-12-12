import React, {useState} from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';
import Checkbox from '../../components/checkbox/checkbox';

function NewRecipe() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [inputList, setInputList] = useState([{instruction: ""}]);

    const handleInputChange = (e, index) => {
        const { instruction, value } = e.target;
        const list = [...inputList];
        list[index][instruction] = value;
        setInputList(list);
    };

    function handleRemoveClick(index) {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    function handleAddClick(i) {
        setInputList([...inputList, { instruction: "" }]);
    };

    function handleFormSubmit(data) {
        console.log(data);
        console.log(inputList);
        document.getElementById("thnx").textContent = 'Dankjewel voor het toevoegen van een nieuw recept. You are awesome.'
    }

    return (
        <>
            <div className="newrecipepage">
                <h1>Nieuw recept toevoegen</h1>

                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <div className="texts">
                        <Input
                            labelText="Titel *"
                            inputType="text"
                            inputId="title"
                            inputName="title"
                            placeholder="bijv bramenjam"
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
                                    placeholder="bijv een verhaaltje over jouw eigen ervaringen met dit recept"
                                    {...register("story", {
                                        required: {
                                            maxLength: "500",
                                            message: 'Maximaal 500 karakters'
                                        }
                                    })}
                                >
                                    {errors.story && <p>{errors.story.message}</p>}
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

                    <div className="ingredients">
                        <h3>Ingrediënten *</h3>
                        <p>Vul hier eerst de hoeveelheid in, dan de maat en als laatste het ingredient</p>
                        <div className="ingredient">
                            <Input
                                inputType="number"
                                inputId="amount"
                                inputName="amount"
                                inputMin="0"
                                inputStep="0.1"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />
                            {errors.ingredient && <p>{errors.ingredient.message}</p>}

                            <Input
                                inputType="text"
                                inputId="unit"
                                inputName="unit"
                                placeholder="bijv dl, gram, tl"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />
                            {errors.unit && <p>{errors.unit.message}</p>}

                            <Input
                                inputType="text"
                                inputId="ingredientname"
                                inputName="ingredientname"
                                placeholder="bijv bramen"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: 'Dit veld is verplicht',
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />
                            {errors.ingredientname && <p>{errors.ingredientname.message}</p>}
                        </div>

                        <div className="utensils">
                            <h3>Benodigdheden</h3>
                            <ol>
                                <li>
                                    <Input
                                        inputType="text"
                                        inputId="utensil"
                                        inputName="utensil"
                                        placeholder="bijv uitgekookte potjes"
                                        validationRules={{
                                            required: {
                                                maxLength: "250",
                                                message: 'Maximaal 250 karakters',
                                            }
                                        }}
                                        register={register}
                                        errors={errors}
                                    />
                                    {errors.needed && <p>{errors.needed.message}</p>}
                                </li>
                            </ol>
                        </div>


                    </div>

                    <div className="instructions">
                        <h3>Bereiding *</h3>
                        <ol className="instruction">
                            {inputList.map((x, i) =>
                                <div className="instructionLine" key={i}>
                                    <li>
                                        <Input
                                            inputType="text"
                                            inputId="instruction"
                                            inputName="instruction"
                                            placeholder="bijv was de bramen"
                                            onChange={e => handleInputChange(e, i)}
                                            register={register}
                                            errors={errors}
                                        />
                                        {errors.instruction && <p>{errors.instruction.message}</p>}

                                    </li>
                                    <div id="anotherInstruction">
                                        {inputList.length !== 1 &&
                                        <button
                                                type="button"
                                                onClick={() => handleRemoveClick(i)}

                                            >
                                                -
                                            </button>}

                                        {inputList.length -1 === i && <button
                                                type="button"
                                                onClick={() => handleAddClick()}
                                            >+
                                            </button>}
                                    </div>
                                </div>
                            )}<br />
                        </ol>
                    </div>

                    <div className="checkboxes">
                        {/*checkboxes............................................*/}
                        <h3>In welke maanden kan je de wildpluk halen. Vink hieronder aan.</h3>
                        <Checkbox
                            inputName="january"
                            labelText="januari"
                            register={register}
                        />

                        <Checkbox
                            inputName="february"
                            labelText="februari"
                            register={register}
                        />

                        <Checkbox
                            inputName="march"
                            labelText="maart"
                            register={register}
                        />

                        <Checkbox
                            inputName="april"
                            labelText="april"
                            register={register}
                        />

                        <Checkbox
                            inputName="may"
                            labelText="mei"
                            register={register}
                        />

                        <Checkbox
                            inputName="june"
                            labelText="juni"
                            register={register}
                        />

                        <Checkbox
                            inputName="july"
                            labelText="juli"
                            register={register}
                        />

                        <Checkbox
                            inputName="august"
                            labelText="augustus"
                            register={register}
                        />

                        <Checkbox
                            inputName="september"
                            labelText="september"
                            register={register}
                        />

                        <Checkbox
                            inputName="october"
                            labelText="oktober"
                            register={register}
                        />

                        <Checkbox
                            inputName="november"
                            labelText="november"
                            register={register}
                        />

                        <Checkbox
                            inputName="december"
                            labelText="december"
                            register={register}
                        />
                    </div>


                    <div className="checkboxes">
                        <h3>Vink hieronder aan wat van toepassing is</h3>

                        <Checkbox
                            inputName="vegetarian"
                            labelText="vegetarisch"
                            register={register}
                        />

                        <Checkbox
                            inputName="vegan"
                            labelText="veganistisch"
                            register={register}
                        />

                        <Checkbox
                            inputName="lactosefree"
                            labelText="lactosevrij"
                            register={register}
                        />

                        <Checkbox
                            inputName="glutenfree"
                            labelText="glutenvrij"
                            register={register}
                        />

                        <Checkbox
                            inputName="breakfast"
                            labelText="ontbijt"
                            register={register}
                        />

                        <Checkbox
                            inputName="lunch"
                            labelText="lunch"
                            register={register}
                        />

                        <Checkbox
                            inputName="diner"
                            labelText="diner"
                            register={register}
                        />

                        <Checkbox
                            inputName="snack"
                            labelText="tussendoortje"
                            register={register}
                        />

                        <Checkbox
                            inputName="sidedish"
                            labelText="bijgerecht"
                            register={register}
                        />

                        <Checkbox
                            inputName="maindish"
                            labelText="hoofdgerecht"
                            register={register}
                        />

                        <Checkbox
                            inputName="drinks"
                            labelText="drinken"
                            register={register}
                        />

                        <Checkbox
                            inputName="alcoholic"
                            labelText="met alcohol"
                            register={register}
                        />

                        <Checkbox
                            inputName="openfire"
                            labelText="op open vuur"
                            register={register}
                        />

                        <Checkbox
                            inputName="dutchoven"
                            labelText="dutch oven"
                            register={register}
                        />

                    </div>

                    <p id="required">* is verplicht</p>

                    <button type="submit" id="submitButton">Versturen</button>
                    <h3 id="thnx"></h3>

                </form>
            </div>
        </>
    )
        ;
}

export default NewRecipe;