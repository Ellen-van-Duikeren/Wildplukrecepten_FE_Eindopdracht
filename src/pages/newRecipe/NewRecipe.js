import React, {useState} from 'react';
import Input from '../../components/input/Input';
import './NewRecipe.css';
import {useForm} from 'react-hook-form';
import Checkbox from '../../components/checkbox/Checkbox';
import handleInputChange from "../../helperfunctions/handleInputChange";
import handleRemoveClick from "../../helperfunctions/handleRemoveClick";
import axios from "axios";
import Button from "../../components/button/Button";


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
    // constant for the new recipe_id that is being posted to generate the id to which the photo must be assigned to
    const [recipe_id, setRecipe_id] = useState(0);

    // text when sending data succeeded
    const [addSuccesRecipe, toggleAddSuccessRecipe] = useState(false);
    const [addSuccesPhoto, toggleAddSuccessPhoto] = useState(false);

    // upload & preview photo
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');


    async function onSubmit(data) {
        // add lists to data
        data.utensils = [];
        for (let ut in utensilList) {
            data.utensils.push(utensilList[ut])
        }
        ;
        data.ingredients = [];
        for (let ut in ingredientList) {
            data.ingredients.push(ingredientList[ut])
        }
        ;
        data.instructions = [];
        for (let ut in instructionList) {
            data.instructions.push(instructionList[ut])
        }
        ;

        // add checkboxes to data.months
        data.months = [];
        if (data.january) {
            data.months.push("JANUARI")
        }
        if (data.february) {
            data.months.push("FEBRUARI")
        }
        if (data.march) {
            data.months.push("MAART")
        }
        if (data.april) {
            data.months.push("APRIL")
        }
        if (data.may) {
            data.months.push("MEI")
        }
        if (data.june) {
            data.months.push("JUNI")
        }
        if (data.july) {
            data.months.push("JULI")
        }
        if (data.august) {
            data.months.push("AUGUSTUS")
        }
        if (data.september) {
            data.months.push("SEPTEMBER")
        }
        if (data.october) {
            data.months.push("OKTOBER")
        }
        if (data.november) {
            data.months.push("NOVEMBER")
        }
        if (data.december) {
            data.months.push("DECEMBER")
        }
        if (data.yearround) {
            data.months.push("JAARROND")
        }

        // add checkboxes to data.tags
        data.tags = [];
        if (data.vegetarian) {
            data.tags.push("VEGETARISCH")
        }
        if (data.vegan) {
            data.tags.push("VEGANISTISCH")
        }
        if (data.lactosefree) {
            data.tags.push("LACTOSEVRIJ")
        }
        if (data.glutenfree) {
            data.tags.push("GLUTENVRIJ")
        }
        if (data.breakfast) {
            data.tags.push("ONTBIJT")
        }
        if (data.lunch) {
            data.tags.push("LUNCH")
        }
        if (data.diner) {
            data.tags.push("DINER")
        }
        if (data.snack) {
            data.tags.push("SNACK")
        }
        if (data.sidedish) {
            data.tags.push("BIJGERECHT")
        }
        if (data.starter) {
            data.tags.push("VOORGERECHT")
        }
        if (data.maindish) {
            data.tags.push("HOOFDGERECHT")
        }
        if (data.drinks) {
            data.tags.push("DRINKEN")
        }
        if (data.alcoholic) {
            data.tags.push("ALCOHOLISCH")
        }
        if (data.openfire) {
            data.tags.push("OPENVUUR")
        }
        if (data.dutchoven) {
            data.tags.push("DUTCHOVEN")
        }

        // post request
        try {
            const response = await axios.post(
                'http://localhost:8081/recipes',
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            console.log(response.data);
            setRecipe_id(response.data);
            console.log(data);
            if (response.status === 201) {
                toggleAddSuccessRecipe(true);
            }
        } catch (e) {
            console.error(e);
        }

    }

    // photo
    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    // photo
    async function sendImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("De upload button activeert de methode sendImage en de recipe_id is: " + recipe_id);
            const response = await axios.post(`http://localhost:8081/recipes/${recipe_id}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                })
            console.log("Photo")
            console.log(response);
            if (response.status === 204) {
                toggleAddSuccessPhoto(true);
            }
        } catch (e) {
            console.error(e)
        }
    }


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
                <h1 className="margin-bottom1">Nieuw recept toevoegen</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="new-recipe-page__form">
                    <div className="texts">
                        <Input
                            labelText="Titel *"
                            type="text"
                            name="title"
                            className="input__text"
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

                        <Input
                            labelText="Aantal personen"
                            type="number"
                            name="persons"
                            className="input__text input__text--width"
                            min="0"
                            max="30"
                            placeholder="0"
                            register={register}
                            errors={errors}
                        />

                        <Input
                            labelText="Bron"
                            type="text"
                            name="source"
                            className="input__text"
                            placeholder="bijv www.natuurkok.nl"
                            register={register}
                            errors={errors}
                        />

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

                        <Input
                            labelText="Bereidingstijd"
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
                    </div>

                    <div>
                        <h3>Benodigdheden</h3>
                        <ol>
                            {utensilList.map((x, i) => {
                                return (
                                    <div className="utensil__div" key={i}>
                                        <li className="utensil__li">
                                            <input
                                                type="text"
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
                                                    className="button--round button--round-margin"
                                                    onClick={() => handleRemoveClick(i, utensilList, setUtensilList)}
                                                >
                                                    -
                                                </button>}
                                            {utensilList.length - 1 === i &&
                                                <button
                                                    className="button--round button--round-margin"
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
                        <h3>Ingrediënten</h3>
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
                                                    className="button--round button--round-margin"
                                                    onClick={() => handleRemoveClick(i, ingredientList, setIngredientList)}
                                                >
                                                    -
                                                </button>}
                                            {ingredientList.length - 1 === i &&
                                                <button
                                                    className="button--round button--round-margin"
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
                        <h3>Bereiding</h3>
                        <ol>
                            {instructionList.map((x, i) => {
                                return (
                                    <div className="instruction__div" key={i}>
                                        <li className="instruction__li">
                                            <input
                                                type="text"
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
                                                    className="button--round button--round-margin"
                                                    onClick={() => handleRemoveClick(i, instructionList, setInstructionList)}
                                                >
                                                    -
                                                </button>}
                                            {instructionList.length - 1 === i &&
                                                <button
                                                    className="button--round button--round-margin"
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
                        <h3 className="margin-top1">In welke maanden kan je de wildpluk halen. Vink hieronder aan.</h3>
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

                        <Checkbox
                            name="yearround"
                            labelText="jaarrond"
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
                            labelText="snack"
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
                    {addSuccesRecipe && <h3 className="attention">Dankjewel voor het versturen van een nieuw recept. You are awesome.</h3>}
                </form>


                <form onSubmit={sendImage} className="image">
                    <h3>Foto toevoegen (optioneel)</h3>
                    <p>Werkwijze:</p>
                    <ol>
                        <li className="image__li">Vul eerst hierboven alle gegevens in en (belangrijk) klik op de groene
                            button
                            met "versturen"
                        </li>
                        <li className="image__li">Klik hieronder op de witte button met "choose file" en selecteer je
                            foto (jpg/jpeg/png)
                        </li>
                        <li className="image__li">Je kan maar 1 foto per recept uploaden van maximaal 5Mb</li>
                        <li className="image__li">Je krijgt nu een preview van je foto te zien</li>
                        <li className="image__li">Als je toch een andere foto wilt, klik je opnieuw op de witte button
                            met "choose file"
                        </li>
                        <li className="image__li">Klik op de groene button met "uploaden"</li>

                    </ol>
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
                        className="button--ellips image__button"
                    >
                        uploaden
                    </Button>
                    {addSuccesPhoto && <h3>De upload van je foto is geslaagd.</h3>}

                </form>


            </article>
        </>
    )
        ;
}

export default NewRecipe;