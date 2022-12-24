import React, {useState} from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';
import Checkbox from '../../components/checkbox/checkbox';
import {Uploader} from "uploader";
import {UploadButton} from "react-uploader";

//nog checken register photo
//functies hieronder naar helperfuncties verplaatsen
//aanpassen css

function NewRecipe() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [instructionList, setInstructionList] = useState([{instruction: ""}]);
    const [ingredientList, setIngredientList] = useState([{
        amount: "",
        unit: "",
        ingredient_name: ""
    }]);
    const [utensilList, setUtensilList] = useState([{utensil: ""}]);

    function handleFormSubmit(data) {
        console.log(data);
        console.log(instructionList);
        console.log(ingredientList);
        console.log(utensilList);
        document.getElementById("thnx").textContent = 'Dankjewel voor het toevoegen van een nieuw recept. You are awesome.'
    }


// handle input change for ingredient, utensil & instruction
    const handleInputChange = (e, index, item, setItem) => {
        const {name, value} = e.target;
        const list = [...item];
        list[index][name] = value;
        setItem(list);
    };

// handle remove click for ingredient, utensil & instruction
    const handleRemoveClick = (index, item, setItem) => {
        const list = [...item];
        list.splice(index, 1);
        setItem(list);
    };

// handle add click for ingredient, utensil & instruction
    const handleAddClick = (item, setItem) => {
        switch (item) {
            case utensilList:
                setItem([...item, {utensil: ""}]);
                break;
            case ingredientList:
                setItem([...item, {amount: ""}]);
                setItem([...item, {unit: ""}]);
                setItem([...item, {ingredient_name: ""}]);
                break;
            case instructionList:
                setItem([...item, {instruction: ""}]);
                break;
            default:
                console.log("The add button is not functioning correctly")
        }
        ;
    }


//uploading photos
    // Get production API keys from Upload.io
    const uploader = Uploader({
        apiKey: "free"
    });

    // Customize the file upload UI (see "customization"):
    const options = {multi: true}


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
                                    value: false,
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

                        <label id="photo_upload_label">
                            Foto
                            <UploadButton uploader={uploader}         // Required.
                                          options={options}           // Optional.
                                          name="recipe-image"
                                          onComplete={files => {      // Optional.
                                              if (files.length === 0) {
                                                  console.log('Geen foto geselecteerd.')
                                              } else {
                                                  console.log('Foto uploaded:');
                                                  console.log(files.map(f => f.fileUrl));
                                              }
                                          }}
                                          {...register("recipe-image")}
                            >
                                {({onClick}) =>
                                    <button id="photo_upload_button" onClick={onClick}>
                                        Foto toevoegen
                                    </button>
                                }
                            </UploadButton>
                        </label>

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
                                    value: false,
                                    message: 'Dit veld is verplicht'
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                        {errors.cookTime && <p>{errors.cookTime.message}</p>}
                    </div>

                    <div className="utensils">
                        <h3>Benodigdheden</h3>
                        <ol className="utensil">
                            {utensilList.map((x, i) => {
                                return (
                                    <div className="utensilLine" key={i}>
                                        <li>
                                            <input
                                                name="utensil"
                                                placeholder="bijv uitgekookte potjes"
                                                value={x.utensil}
                                                onChange={e => handleInputChange(e, i, utensilList, setUtensilList)}
                                            />
                                        </li>
                                        <div id="anotherUtensil">
                                            {utensilList.length !== 1 &&
                                                <button
                                                    onClick={() => handleRemoveClick(i, utensilList, setUtensilList)}
                                                >
                                                    -
                                                </button>}
                                            {utensilList.length - 1 === i &&
                                                <button
                                                    onClick={() => handleAddClick(utensilList, setUtensilList)}
                                                >
                                                    +
                                                </button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </ol>
                    </div>


                    <div className="ingredients">
                        <h3>Ingrediënten *</h3>
                        <p>Vul hier eerst de hoeveelheid in, dan de maat en als laatste het ingredient</p>
                        <ol className="ingredient">
                            {ingredientList.map((x, i) => {
                                return (
                                    <div className="ingredientLine" key={i}>
                                        <li>
                                            <input
                                                type="number"
                                                name="amount"
                                                id="amount"
                                                min="0"
                                                step="0.1"
                                                value={x.amount}
                                                onChange={e => handleInputChange(e, i, ingredientList, setIngredientList)}
                                            />
                                            <input
                                                type="text"
                                                name="unit"
                                                id="unit"
                                                min="0"
                                                step="0.1"
                                                value={x.unit}
                                                onChange={e => handleInputChange(e, i, ingredientList, setIngredientList)}
                                            />
                                            <input
                                                type="text"
                                                name="ingredient_name"
                                                id="ingredient_name"
                                                value={x.ingredient_name}
                                                onChange={e => handleInputChange(e, i, ingredientList, setIngredientList)}
                                            />
                                        </li>
                                        <div id="anotherIngredient">
                                            {ingredientList.length !== 1 &&
                                                <button
                                                    onClick={() => handleRemoveClick(i, ingredientList, setIngredientList)}
                                                >
                                                    -
                                                </button>}
                                            {ingredientList.length - 1 === i &&
                                                <button
                                                    onClick={() => handleAddClick(ingredientList, setIngredientList)}
                                                >
                                                    +
                                                </button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </ol>
                    </div>

                    <div className="instructions">
                        <h3>Bereiding *</h3>
                        <ol className="instruction">
                            {instructionList.map((x, i) => {
                                return (
                                    <div className="instructionLine" key={i}>
                                        <li>
                                            <input
                                                name="instruction"
                                                placeholder="bijv was de bramen"
                                                value={x.instruction}
                                                onChange={e => handleInputChange(e, i, instructionList, setInstructionList)}
                                            />
                                        </li>
                                        <div id="anotherInstruction">
                                            {instructionList.length !== 1 &&
                                                <button
                                                    onClick={() => handleRemoveClick(i, instructionList, setInstructionList)}
                                                >
                                                    -
                                                </button>}
                                            {instructionList.length - 1 === i &&
                                                <button
                                                    onClick={() => handleAddClick(instructionList, setInstructionList)}
                                                >
                                                    +
                                                </button>}
                                        </div>
                                    </div>
                                )
                            })}
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