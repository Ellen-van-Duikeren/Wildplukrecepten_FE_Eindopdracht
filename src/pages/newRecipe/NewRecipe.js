import React, {useState} from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';
import Checkbox from '../../components/checkbox/checkbox';
import handleInputChange from "../../helperfunctions/handleInputChange";
import handleRemoveClick from "../../helperfunctions/handleRemoveClick";
import axios from "axios";

//nog checken register photo
//functies hieronder naar helperfuncties verplaatsen
//aanpassen css

function NewRecipe() {
    // (simple) inputs
    const {register, handleSubmit, formState: {errors}} = useForm();

    // some extra inputs in useState while I want to be able to add and remove instructions, utensils and ingredients
    const [instructionList, setInstructionList] = useState([{instruction: ""}]);
    const [ingredientList, setIngredientList] = useState([{
        amount: "",
        unit: "",
        ingredient_name: ""
    }]);
    const [utensilList, setUtensilList] = useState([{utensil: ""}]);

    // text when sending data succeeded
    const [addSucces, toggleAddSuccess] = useState(false);

    // upload & preview photo
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('')

    // submit form
    async function addRecipe(e, data) {
        e.preventDefault();

        // post request
        try {
            const response = await axios.post(
                'http://localhost:8081/recipes',
                data
            );
            console.log(response.data);
            console.log(instructionList);
            console.log(ingredientList);
            console.log(utensilList);
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    // photo
    function handleImageChange(e) {
        // Sla het gekozen bestand op
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        // Sla het gekozen bestand op in de state
        setFile(uploadedFile);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    // nog aanpassen want nu path alleen naar recipe with id 1
    // photo
    async function sendImage(e) {
        e.preventDefault();
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", file);

        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.post('http://localhost:8081/recipes/1/photo', formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    // example formState and axios.post: :https://stackoverflow.com/questions/69561981/react-hook-form-axios-post-unable-to-create-payload
    // import React from "react";
    // import {useForm} from "react-hook-form";
    // import axios from "axios";
    //
    // function Eirform() {
    //     const { register, handleSubmit, formState: { errors } } = useForm();
    //
    //     const onSubmit = data => {
    //         axios
    //             .post(
    //                 'http://localhost:8000/tran',
    //                 data,
    //                 { headers: { 'Content-Type': 'application/json' }}
    //             )
    //             .then(response => {console.log(response.data)})
    //             .catch(error => {console.log(error.data)});
    //     };
    //
    //     return (
    //         <div>
    //             <h1>My Input Form</h1>
    //             <form onSubmit={handleSubmit(onSubmit)}>
    //                 ...
    //             </form>
    //         </div>
    //     )
    // }
    // export {Eirform}

    //
    // function handleFormSubmit(data) {
    //     console.log(data);
    //     console.log(instructionList);
    //     console.log(ingredientList);
    //     console.log(utensilList);
    //     document.getElementById("thnx").textContent = 'Dankjewel voor het toevoegen van een nieuw recept. You are awesome.'
    // }

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

    return (
        <>

            <div className="newrecipepage">
                <h1>Nieuw recept toevoegen</h1>
                <form onSubmit={addRecipe} className="formRecipe">
                    {/*<form onSubmit={handleSubmit(handleFormSubmit)}>*/}
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

                        <div onSubmit={sendImage} className="form-image">
                            <label htmlFor="student-image" className="image-label">
                                Voeg foto toe (optioneel)
                                <input type="file" name="image-field" id="recipe-image" onChange={handleImageChange}/>
                            </label>
                            {previewUrl &&
                                <label className="preview-label">
                                    Preview:
                                    <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                                </label>
                            }
                            <button type="submit" id="photo_upload_button">Uploaden</button>
                        </div>


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
                            inputName="starter"
                            labelText="voorgerecht"
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
                    {addSucces === true && <h3>Dankjewel voor het versturen van een nieuw recept. you are awesome.</h3>}

                </form>
            </div>
        </>
    )
        ;
}

export default NewRecipe;