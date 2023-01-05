import React, {useState} from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';
import Checkbox from '../../components/checkbox/Checkbox';
import handleInputChange from "../../helperfunctions/handleInputChange";
import handleRemoveClick from "../../helperfunctions/handleRemoveClick";
import axios from "axios";
import Button from "../../components/button/Button";

//nog checken register photo


function NewRecipe() {
    // (simple) inputs
    const {register, handleSubmit, formState: {errors}} = useForm();
    const token = localStorage.getItem('token');


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
                {data},
                {headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
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

            <article className="page new-recipe-page">
                <h1>Nieuw recept toevoegen</h1>
                <form onSubmit={addRecipe} className="new-recipe-page__form">
                    {/*<form onSubmit={handleSubmit(handleFormSubmit)}>*/}
                    <div className="texts">
                        <Input
                            labelText="Titel *"
                            type="text"
                            name="title"
                            className="input__text"
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
                            type="text"
                            name="subtitle"
                            className="input__text"
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

                        <div onSubmit={sendImage} className="image">
                            <label htmlFor="image" className="image__label">
                                Voeg foto toe
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="image__input"
                                    onChange={handleImageChange}/>
                            </label>
                            {previewUrl &&
                                <label className="preview__label">
                                    Preview
                                    <img src={previewUrl}
                                         className="preview__image"
                                         alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                    />
                                </label>
                            }

                            <Button
                                type="submit"
                                className="button--ellips image__button">uploaden</Button>
                        </div>


                        <Input
                            labelText="Aantal personen"
                            type="number"
                            name="persons"
                            className="input__text input__text--width"
                            min="1"
                            max="30"
                            value="1"
                            register={register}
                            errors={errors}
                        />

                        <Input
                            labelText="Bron"
                            type="text"
                            name="source"
                            className="input__text"
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

                        <div className="textarea__field">
                            <label htmlFor="textarea__text">
                                Tekst
                                <textarea
                                    className="textarea__text" name="story" rows="4" cols="55"
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
                            type="text"
                            name="prepTime"
                            className="input__text"
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
                            type="text"
                            name="cookTime"
                            className="input__text"
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

                    <div>
                        <h3>Benodigdheden</h3>
                        <ol>
                            {utensilList.map((x, i) => {
                                return (
                                    <div className="utensil__div" key={i}>
                                        <li className="utensil__li">
                                            <input
                                                name="utensil"
                                                className="utensil__input"
                                                placeholder="bijv uitgekookte potjes"
                                                value={x.utensil}
                                                onChange={e => handleInputChange(e, i, utensilList, setUtensilList)}
                                            />
                                        </li>
                                        <div>
                                            {utensilList.length !== 1 &&
                                                <button
                                                    className="button--round"
                                                    onClick={() => handleRemoveClick(i, utensilList, setUtensilList)}
                                                >
                                                    -
                                                </button>}
                                            {utensilList.length - 1 === i &&
                                                <button
                                                    className="button--round utensil_button"
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


                    <div>
                        <h3>Ingrediënten *</h3>
                        <p>Vul hier eerst de hoeveelheid in, dan de maat en als laatste het ingredient</p>
                        <ol>
                            {ingredientList.map((x, i) => {
                                return (
                                    <div className="ingredient__div" key={i}>
                                        <li className="ingredient__li">
                                            <input
                                                type="number"
                                                name="amount"
                                                className="ingredient__amount"
                                                min="0"
                                                step="0.1"
                                                value={x.amount}
                                                onChange={e => handleInputChange(e, i, ingredientList, setIngredientList)}
                                            />
                                            <input
                                                type="text"
                                                name="unit"
                                                className="ingredient__unit"
                                                min="0"
                                                step="0.1"
                                                value={x.unit}
                                                onChange={e => handleInputChange(e, i, ingredientList, setIngredientList)}
                                            />
                                            <input
                                                type="text"
                                                name="ingredient_name"
                                                className="ingredient__name"
                                                value={x.ingredient_name}
                                                onChange={e => handleInputChange(e, i, ingredientList, setIngredientList)}
                                            />
                                        </li>
                                        <div>
                                            {ingredientList.length !== 1 &&
                                                <button
                                                    className="button--round"
                                                    onClick={() => handleRemoveClick(i, ingredientList, setIngredientList)}
                                                >
                                                    -
                                                </button>}
                                            {ingredientList.length - 1 === i &&
                                                <button
                                                    className="button--round"
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

                    <div>
                        <h3>Bereiding *</h3>
                        <ol>
                            {instructionList.map((x, i) => {
                                return (
                                    <div className="instruction__div" key={i}>
                                        <li className="instruction__li">
                                            <input
                                                name="instruction"
                                                placeholder="bijv was de bramen"
                                                className="instruction__input"
                                                value={x.instruction}
                                                onChange={e => handleInputChange(e, i, instructionList, setInstructionList)}
                                            />
                                        </li>
                                        <div>
                                            {instructionList.length !== 1 &&
                                                <button
                                                    className="button--round"
                                                    onClick={() => handleRemoveClick(i, instructionList, setInstructionList)}
                                                >
                                                    -
                                                </button>}
                                            {instructionList.length - 1 === i &&
                                                <button
                                                    className="button--round"
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

                    <div>
                        {/*checkboxes............................................*/}
                        <h3>In welke maanden kan je de wildpluk halen. Vink hieronder aan.</h3>
                        <Checkbox
                            name="january"
                            labelText="januari"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="february"
                            labelText="februari"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="march"
                            labelText="maart"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="april"
                            labelText="april"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="may"
                            labelText="mei"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="june"
                            labelText="juni"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="july"
                            labelText="juli"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="august"
                            labelText="augustus"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="september"
                            labelText="september"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="october"
                            labelText="oktober"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="november"
                            labelText="november"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="december"
                            labelText="december"
                            className="component-checkbox__input"
                            register={register}
                        />
                    </div>


                    <div className="checkboxes">
                        <h3>Vink hieronder aan wat van toepassing is</h3>

                        <Checkbox
                            name="vegetarian"
                            labelText="vegetarisch"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="vegan"
                            labelText="veganistisch"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="lactosefree"
                            labelText="lactosevrij"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="glutenfree"
                            labelText="glutenvrij"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="breakfast"
                            labelText="ontbijt"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="lunch"
                            labelText="lunch"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="diner"
                            labelText="diner"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="snack"
                            labelText="tussendoortje"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="sidedish"
                            labelText="bijgerecht"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="starter"
                            labelText="voorgerecht"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="maindish"
                            labelText="hoofdgerecht"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="drinks"
                            labelText="drinken"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="alcoholic"
                            labelText="met alcohol"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="openfire"
                            labelText="op open vuur"
                            className="component-checkbox__input"
                            register={register}
                        />

                        <Checkbox
                            name="dutchoven"
                            labelText="dutch oven"
                            className="component-checkbox__input"
                            register={register}
                        />

                    </div>

                    <p className="new-recipe-page--required">* is verplicht</p>

                    <Button type="submit" className="button--ellips">versturen</Button>
                    {addSucces === true && <h3>Dankjewel voor het versturen van een nieuw recept. you are awesome.</h3>}

                </form>
            </article>
        </>
    )
        ;
}

export default NewRecipe;