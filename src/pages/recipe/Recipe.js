import React, {useContext, useEffect, useRef, useState} from 'react';
import './Recipe.css';
import {RiKnifeLine} from 'react-icons/ri';
import {GiCampCookingPot} from 'react-icons/gi';
import axios from "axios";
import Button from "../../components/button/Button";
import {useReactToPrint} from "react-to-print";
import {AuthContext} from "../../context/AuthContext";
import Input from "../../components/input/Input";
import {useForm} from "react-hook-form";
import {Link, useParams} from "react-router-dom";
import Checkbox from "../../components/checkbox/Checkbox";

function Recipe() {
    let {idRecipe} = useParams();
    const token = localStorage.getItem('token');
    const {isAuth, user} = useContext(AuthContext);

    // admin button to show or hide options to change or delete recipe
    const [admin, toggleAdmin] = useState(false);

    // show recipe
    const [recipe, setRecipe] = useState([]);
    const [countPersons, setCountPersons] = useState(4);
    const [ingredients, setIngredients] = useState([]);
    const [months, setMonths] = useState([]);
    const [utensils, setUtensils] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [tags, setTags] = useState([]);

    // delete recipe
    const [deleted, setDeleted] = useState(false);

    // change recipe
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [patchThisRecipe, togglePatchThisRecipe] = useState(false);
    const [showInputFields, toggleShowInputFields] = useState(false);
    const [utensilList, setUtensilList] = useState([{}]);
    const [instructionList, setInstructionList] = useState("");


    // method to get a recipe by id.....................................................................................
    useEffect(() => {
        const controller = new AbortController();

        async function fetchRecipe() {
            setDeleted(false);
            togglePatchThisRecipe(false);
            try {
                const response = await axios.get(`http://localhost:8081/recipes/${idRecipe}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setRecipe(response.data);
                setIngredients(response.data.ingredients);
                setMonths(response.data.months);
                setUtensils(response.data.utensils);
                // sort utensils by id, necessary after patching
                response.data.instructions.sort((a, b) => a.id - b.id);
                setInstructions(response.data.instructions);
                setTags(response.data.tags);
            } catch (e) {
                console.error(e);
            }
        }

        if (idRecipe) {
            void fetchRecipe();
            return function cleanup() {
                controller.abort();
            }
        }
    }, []);


    // methods to patch recipe..........................................................................................
    // patch utensils
    const handleInputChangePatchUtensil = (e, i, idItem) => {
        // to prevent adding a key-value pair to the list after input of each letter you have to press enter
        if (e.key === 'Enter') {
            const {value} = e.target;
            const list = [...utensilList, {id: idItem, utensil: value}]
            setUtensilList(list);
        }
    }

    // patch instructions
    const handleInputChangePatchInstruction = (e, i, idItem) => {
        // to prevent adding a key-value pair to the list after input of each letter you have to press enter
        if (e.key === 'Enter') {
            const {value} = e.target;
            const list = [...instructionList, {id: idItem, instruction: value}]
            setInstructionList(list);
        }
    }

    async function patchRecipe(data) {
        // added because in backend the title is required (may not be blanc)
        if (!data.title) {
            data.title = recipe.title;
        }

        // add lists to data
        data.utensils = [];
        for (let utensil in utensilList) {
            data.utensils.push(utensilList[utensil])
        }

        data.instructions = [];
        for (let instruction in instructionList) {
            data.instructions.push(instructionList[instruction])
        }

        // add months to data.months
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

        // add tags to data.tags
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

        try {
            const response = await axios.patch(`http://localhost:8081/recipes/${idRecipe}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            if (response.status === 200) {
                togglePatchThisRecipe(true);
            }
            setRecipe(response.data);
        } catch (e) {
            console.error(e);
        }
    }


    // method to delete recipe..........................................................................................
    async function deleteRecipe() {
        try {
            const response = await axios.delete(`http://localhost:8081/recipes/${idRecipe}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            setDeleted(true);
        } catch (e) {
            console.error(e);
        }
    }


    // printing.........................................................................................................
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (

        <article className="page" key={`${recipe.id}-1`}>
            <form onSubmit={handleSubmit(patchRecipe)}>
                <div className="recipe-description" ref={componentRef}>

                    {/*left-side.....................................................................................*/}
                    <section className="left-side--narrow">

                        {ingredients && <h3 className="margin-bottom1">Ingredienten:</h3>}
                        {recipe.persons > 0 &&
                            <>
                                <div className="counter-persons">
                                    <Button
                                        type="button"
                                        className="button--round button--round-yellow"
                                        onClick={() => setCountPersons(countPersons => countPersons - 1)}
                                        disabled={countPersons <= 1}
                                    >-
                                    </Button>

                                    <p className="counter-persons__p margin-bottom2">{countPersons}</p>

                                    <Button
                                        type="button"
                                        className="button--round button--round-yellow"
                                        onClick={() => setCountPersons(countPersons => countPersons + 1)}
                                    >+
                                    </Button>
                                    <p className="counter-persons__p">personen</p>
                                </div>
                            </>
                        }


                        {ingredients &&
                            <div>
                                {ingredients.map((ingredient, i) => {
                                    return (
                                        <div key={`${ingredient.ingredient_name}`}>
                                            <label className="ingredient__label">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox__input margin-left16"/>
                                                {ingredient.amount > 0 &&
                                                    (
                                                        <p className="ingredient__p">
                                                            {recipe.persons > 0
                                                                ?
                                                                ((countPersons * (ingredient.amount) / recipe.persons) < 1)
                                                                    ? (countPersons * (ingredient.amount) / recipe.persons).toFixed(1)
                                                                    : (countPersons * (ingredient.amount) / recipe.persons)
                                                                :
                                                                ingredient.amount}
                                                        </p>
                                                    )}
                                                <p className="ingredient__p">{ingredient.unit}</p>
                                                <p className="ingredient__p">{ingredient.ingredient_name}</p>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        }
                    </section>


                    {/*right-side....................................................................................*/}
                    <section className="recipe-page-descriptions right-side">

                        {/*buttons for admin*/}
                        {(isAuth && user.authority === "ROLE_ADMIN" && !admin) && <Button
                            type="button"
                            className="button--ellips margin-bottom2"
                            onClick={() => toggleAdmin(!admin)}
                        >
                            show admin
                        </Button>}

                        {admin && <Button
                            type="button"
                            className="button--ellips button--ellips-margin"
                            onClick={() => {
                                toggleAdmin(!admin)
                                toggleShowInputFields(false)
                            }
                            }
                        >
                            hide admin
                        </Button>}

                        {admin &&
                            <>
                                <h3 className="margin-top2">Recept verwijderen</h3>
                                <Button
                                    type="button"
                                    className="button--ellips button--ellips-margin"
                                    onClick={() => deleteRecipe()}
                                >
                                    verwijder
                                </Button>
                                {deleted &&
                                    <h4 className="attention">Dit recept is succesvol verwijderd. Ga terug naar <Link
                                        to="/recipes">recepten.</Link></h4>}
                            </>
                        }


                        {admin &&
                            <div className="recipe__div">
                                <h3 className="margin-top2">Recept aanpassen</h3>
                                {showInputFields ?
                                    <Button
                                        type="button"
                                        className="button--ellips margin-bottom2"
                                        onClick={() => toggleShowInputFields(!showInputFields)}
                                    >
                                        hide input
                                    </Button>
                                    :
                                    <Button
                                        type="button"
                                        className="button--ellips margin-bottom2"
                                        onClick={() => toggleShowInputFields(!showInputFields)}
                                    >
                                        show input
                                    </Button>
                                }
                            </div>
                        }


                        {months &&
                            <div className="tags">
                                {months.map((month, i) => {
                                    return (
                                        <p
                                            key={`${month}-${i}`}
                                            className="tag"
                                        >
                                            {month}
                                        </p>
                                    )
                                })}

                                {showInputFields &&
                                    <div>
                                        <Checkbox
                                            name="january"
                                            labelText="januari"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="february"
                                            labelText="februari"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="march"
                                            labelText="maart"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="april"
                                            labelText="april"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="may"
                                            labelText="mei"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="june"
                                            labelText="juni"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="july"
                                            labelText="juli"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="august"
                                            labelText="augustus"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="september"
                                            labelText="september"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="october"
                                            labelText="oktober"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="november"
                                            labelText="november"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="december"
                                            labelText="december"
                                            register={register}
                                        />

                                        <Checkbox
                                            name="yearround"
                                            labelText="jaarrond"
                                            register={register}
                                        />
                                    </div>
                                }
                            </div>
                        }

                        {admin ? <h1>{recipe.id}: {recipe.title}</h1> : <h1>{recipe.title}</h1>}
                        {showInputFields &&
                            <Input
                                type="text"
                                name="title"
                                className="input input--large"
                                placeholder={recipe.title}
                                register={register}
                                errors={errors}
                            />
                        }

                        {recipe.sub_title && <p className="margin-bottom1">{recipe.sub_title}</p>}
                        {showInputFields &&
                            <Input
                                type="text"
                                name="sub_title"
                                className="input input--large"
                                placeholder={recipe.sub_title}
                                register={register}
                                errors={errors}
                            />}

                        {recipe.file &&
                            <img
                                src={recipe.file.url}
                                alt={recipe.name}
                                className="recipe__image"
                            />}

                        {recipe.story && <p>{recipe.story}</p>}
                        {showInputFields &&
                            <textarea
                                className="textarea--border" name="story" rows="4" cols="55"
                                placeholder="bijv een verhaaltje over jouw eigen ervaringen met dit recept"
                                {...register("story", {
                                    required: {
                                        maxLength: "500",
                                        message: 'Maximaal 500 karakters'
                                    }
                                })}
                            >
                            </textarea>
                        }

                        <div className="times margin-top1">
                            {recipe.prep_time &&
                                <>
                                    <RiKnifeLine size="40px" color="#A8C256"/>
                                    <div className="times--div">
                                        <h4>{recipe.prep_time}</h4>
                                        <p>voorbereidingstijd</p>
                                        {showInputFields &&
                                            <Input
                                                type="text"
                                                name="prep_time"
                                                className="input"
                                                placeholder={recipe.prep_time}
                                                register={register}
                                                errors={errors}
                                            />}
                                    </div>
                                </>
                            }


                            {recipe.cook_time &&
                                <>
                                    <GiCampCookingPot size="40px" color="#A8C256"/>
                                    <div className="times--div">
                                        <h4>{recipe.cook_time}</h4>
                                        <p>bereidingstijd</p>
                                        {showInputFields &&
                                            <Input
                                                type="text"
                                                name="cook_time"
                                                className="input"
                                                placeholder={recipe.cook_time}
                                                register={register}
                                                errors={errors}
                                            />}
                                    </div>
                                </>
                            }
                        </div>


                        {utensils.length > 0 &&
                            <>
                                <h3 className="margin-top1">Benodigdheden:</h3>
                                {utensils.map((utensil, i) => {
                                    return (
                                        <ul key={`${utensil}-${i}`}>
                                            <li className="margin-left1">{utensil.utensil}</li>
                                            {showInputFields &&
                                                <input
                                                    type="text"
                                                    name="utensil"
                                                    className="input input--large"
                                                    placeholder="pas eventueel aan en druk op enter"
                                                    value={i.utensil}
                                                    onKeyDown={e => handleInputChangePatchUtensil(e, i, utensil.id)}
                                                />}
                                        </ul>
                                    );
                                })}
                            </>
                        }


                        {instructions.length > 0 &&
                            <>
                                <h3 className="margin-top1">Bereiding:</h3>
                                {instructions.map((instruction, i) => {
                                    return (
                                        <div className="instructions--div" key={`${instruction}-${i}`}>
                                            <Button
                                                type="button"
                                                className="button--round margin-left1 margin-right1"
                                            >
                                                {i + 1}
                                            </Button>
                                            <div>
                                                <p className="p--strong">Stap {i + 1}</p>
                                                <p>{instruction.instruction}</p>
                                                {showInputFields &&
                                                    <input
                                                        type="text"
                                                        name="instruction"
                                                        className="input input--large"
                                                        placeholder="pas eventueel aan en druk op enter"
                                                        value={i.instruction}
                                                        onKeyDown={e => handleInputChangePatchInstruction(e, i, instruction.id)}
                                                    />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        }

                        {recipe.tip &&
                            <>
                                <h4>Tip: </h4>
                                <p>{recipe.tip}</p>
                            </>
                        }


                        <div className="tags">
                            {tags.map((tag, index) => {
                                return (
                                    <p
                                        className="tag"
                                        key={`${tag}-${index}`}
                                    >
                                        {tag}
                                    </p>
                                );
                            })}

                            {showInputFields &&
                                <>
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
                                </>
                            }
                        </div>

                        <h2>Eet smakelijk!</h2>

                        {/*printing*/}
                        {/*Because after patching an utensil, ingredient or instruction one have to press enter to make it work, the form to print is automatically shown.*/}
                        {/*To prevent this I have decided to prevent printing when patching.*/}

                        {!admin && <button
                            onClick={handlePrint}
                            className="button--ellips recipes__button margin-top1"
                        >
                            print
                        </button>
                        }


                        {recipe.source && <p className="source margin-top2">bron: {recipe.source}</p>}
                        {showInputFields &&
                            <Input
                                type="text"
                                name="source"
                                className="input"
                                placeholder={recipe.source}
                                register={register}
                                errors={errors}
                            />}


                        {admin &&
                            <Button
                                type="submit"
                                className="button--ellips margin-top2"
                            >
                                versturen
                            </Button>
                        }
                        {patchThisRecipe &&
                            <h4 className="attention margin-top2">Dit recept is succesvol aangepast. Ververs deze pagina
                                om je aangepaste recept te zien.</h4>}
                    </section>
                </div>
            </form>
        </article>
    );
}

export default Recipe;