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

function Recipe() {
    const {id} = useParams();
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

    // updates
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [patchThisRecipe, togglePatchThisRecipe] = useState(false);
    const [search, setSearch] = useState([]);
    const [searchGeneral, setSearchGeneral] = useState("");
    // const [utensilList, setUtensilList] = useState([{utensil: ""}]);
    // const [searchIngredient, setSearchIngredient] = useState("");
    // const [searchInstruction, setSearchInstruction] = useState("");

    const [recipeList] = useState([
        {
            label: "selecteer een categorie",
            value: "recipelist"
        },
        {label: "algemeen", value: "general"},
        {label: "benodigdheden", value: "utensils"},
        {label: "ingredienten", value: "ingredients"},
        {label: "instructies", value: "instructions"},
        {label: "maanden", value: "months"},
        {label: "tags", value: "tags"}
    ]);

    const [generalList] = useState([
        {
            label: "selecteer een categorie",
            value: "generallist"
        },
        {label: "titel", value: "title"},
        {label: "subtitel", value: "sub_title"},
        {label: "bron", value: "source"},
        {label: "tekst", value: "story"},
        {label: "voorbereidingstijd", value: "prep_time"},
        {label: "bereidingstijd", value: "cook_time"}
    ]);


    // method to get a recipe by id
    useEffect(() => {
        async function fetchRecipe() {
            setDeleted(false);
            togglePatchThisRecipe(false);
            try {
                const response = await axios.get(`http://localhost:8081/recipes/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setRecipe(response.data);
                setIngredients(response.data.ingredients);
                setMonths(response.data.months);
                setUtensils(response.data.utensils);
                setInstructions(response.data.instructions);
                setTags(response.data.tags);

            } catch (e) {
                console.error(e);
            }
        }

        if (id) {
            void fetchRecipe();
        }
    }, []);


    // methods to change recipe
    // const handleInputChangePatch = (e, index, item, setItem) => {
    //     const {name, value} = e.target;
    //     const list = [...item];
    //     list[index][name] = value;
    //     setItem(list);
    // };


    async function patchRecipe(data) {
        console.log("Data in patch function to patch")
        console.log(data)
        // if (utensilList.length > 0) {
        //     data.utensils = [];
        //     for (let ut in utensilList) {
        //         data.utensils.push(utensilList[ut])
        //     }
        // }
        //
        // console.log("Data recipe:");
        // console.log(data);
        try {
            const response = await axios.patch(`http://localhost:8081/recipes/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            togglePatchThisRecipe(true);
            setRecipe(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    if (patchThisRecipe) {
        void patchRecipe();
    }


    // method to delete recipe
    async function deleteRecipe() {
        try {
            const response = await axios.delete(`http://localhost:8081/recipes/${recipe.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(response);
            setDeleted(true);
        } catch (e) {
            console.error(e);
        }
    }

    if (deleted) {
        void deleteRecipe();
    }


    // printing
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <article className="page" key={`${recipe.id}-1`}>
            <form onSubmit={handleSubmit(patchRecipe)}>
                <div className="recipe-description" ref={componentRef}>

                    {/*left-side..........................................*/}
                    <section className="left-side--narrow">

                        <h3 className="margin-bottom1">Ingredienten:</h3>
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
                                {ingredients.map((ingredient) => {
                                    return (
                                        <div key={`${ingredient.ingredient_name}`}>
                                            <label className="ingredient__label">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox__input checkbox__input--margin"/>
                                                {ingredient.amount > 0 &&
                                                    (
                                                        <>
                                                            {/*{admin && <p>id {ingredient.id}: </p>}*/}
                                                            <p className="ingredient__p">
                                                                {recipe.persons > 0
                                                                    ?
                                                                    ((countPersons * parseInt(ingredient.amount) / recipe.persons) < 1)
                                                                        ? (countPersons * parseInt(ingredient.amount) / recipe.persons).toFixed(1)
                                                                        : (countPersons * parseInt(ingredient.amount) / recipe.persons)
                                                                    :
                                                                    ingredient.amount}
                                                            </p>
                                                        </>
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


                    {/*right-side.......................................................*/}
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
                            onClick={() => toggleAdmin(!admin)}
                        >
                            hide admin
                        </Button>}

                        {admin &&
                            <>
                                <h3>Recept verwijderen</h3>
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
                                <h3>Recept aanpassen</h3>
                                <p className="margin-bottom1">Selecteer een categorie: bijv algemeen > titel. Op de plek
                                    van die categorie verschijnt nu een invoerveld. Hiervoor moet je dus naar beneden
                                    scrollen.</p>
                                <select
                                    className="recipes__select margin-bottom2"
                                    value={search}
                                    onChange={(e) => setSearch(e.currentTarget.value)}>
                                    {recipeList.map(category => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>

                                {search.includes("general") &&
                                    <select
                                        className="recipes__select margin-bottom2"
                                        value={searchGeneral}
                                        onChange={(e) => setSearchGeneral(e.currentTarget.value)}>
                                        {generalList.map(generalCategory => (
                                            <option
                                                key={generalCategory.value}
                                                value={generalCategory.value}
                                            >
                                                {generalCategory.label}
                                            </option>
                                        ))}
                                    </select>}

                                {search.includes("utensils") &&
                                    <p className="attention margin-bottom2">Deze functie werkt nog niet. De categorie
                                        algemeen werkt wel.</p>}
                                {search.includes("ingredients") &&
                                    <p className="attention margin-bottom2">Deze functie werkt nog niet. De categorie
                                        algemeen werkt wel.</p>}
                                {search.includes("instructions") &&
                                    <p className="attention margin-bottom2">Deze functie werkt nog niet. De categorie
                                        algemeen werkt wel.</p>}
                                {search.includes("months") &&
                                    <p className="attention margin-bottom2">Deze functie werkt nog niet. De categorie
                                        algemeen werkt wel.</p>}
                                {search.includes("tags") &&
                                    <p className="attention margin-bottom2">Deze functie werkt nog niet. De categorie
                                        algemeen werkt wel.</p>}
                            </div>
                        }

                        {months &&
                            <div className="tags">
                                {months.map((month, index) => {
                                    return (
                                        <p
                                            className="tag"
                                            key={`${month}-${index}`}
                                        >
                                            {month}
                                        </p>
                                    );
                                })}
                            </div>
                        }

                        {admin ? <h1>{recipe.id} {recipe.title}</h1> : <h1>{recipe.title}</h1>}
                        {searchGeneral.includes("title") &&
                            <Input
                                type="text"
                                name="title"
                                className="input"
                                placeholder={recipe.title}
                                register={register}
                                errors={errors}
                            />}

                        {recipe.sub_title && <p className="margin-bottom1">{recipe.sub_title}</p>}
                        {searchGeneral.includes("sub_title") &&
                            <Input
                                type="text"
                                name="sub_title"
                                className="input"
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
                        {searchGeneral.includes("story") &&
                            <Input
                                type="text"
                                name="story"
                                className="input"
                                placeholder={recipe.story}

                                register={register}
                                errors={errors}
                            />}

                        <div className="times margin-top1">
                            {recipe.prep_time &&
                                <>
                                    <RiKnifeLine size="40px" color="#A8C256"/>
                                    <div className="times--div">
                                        <h4>{recipe.prep_time}</h4>
                                        <p>voorbereidingstijd</p>
                                    </div>
                                </>
                            }
                            {searchGeneral.includes("prep_time") &&
                                <Input
                                    type="text"
                                    name="prep_time"
                                    className="input"
                                    placeholder={recipe.prep_time}
                                    register={register}
                                    errors={errors}
                                />}


                            {recipe.cook_time &&
                                <>
                                    <GiCampCookingPot size="40px" color="#A8C256"/>
                                    <div className="times--div">
                                        <h4>{recipe.cook_time}</h4>
                                        <p>bereidingstijd</p>
                                    </div>
                                </>
                            }
                            {searchGeneral.includes("cook_time") &&
                                <Input
                                    type="text"
                                    name="cook_time"
                                    className="input"
                                    placeholder={recipe.cook_time}
                                    register={register}
                                    errors={errors}
                                />}
                        </div>

                        {utensils &&
                            <>
                                <h3 className="margin-top1">Benodigdheden:</h3>
                                <div>
                                    {utensils.map((utensil, i) => {
                                        return (
                                            <ul key={`${utensil}-${i}`}>
                                                <li className="margin-left1">{utensil.utensil}</li>
                                                {/*{search.includes("utensils") &&*/}
                                                {/*    <input*/}
                                                {/*        type="text"*/}
                                                {/*        name="utensil"*/}
                                                {/*        className="input"*/}
                                                {/*        value={i.utensil}*/}
                                                {/*        onChange={e => handleInputChangePatch(e, i, utensilList, setUtensilList)}*/}
                                                {/*    />}*/}
                                            </ul>
                                        );
                                    })}
                                </div>
                            </>
                        }


                        {instructions &&
                            <>
                                <h3 className="margin-top1">Bereiding:</h3>
                                <div>
                                    {instructions.map((instruction, index) => {
                                        return (
                                            <div className="instructions--div" key={`${instruction}-${index}`}>
                                                <Button
                                                    type="button"
                                                    className="button--round margin-left1 margin-right1"
                                                >
                                                    {index + 1}
                                                </Button>
                                                <div>
                                                    <p className="p--strong">Stap {index + 1}</p>
                                                    <p>{instruction.instruction}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        }

                        {recipe.tip && <>
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
                        </div>

                        <h2>Eet smakelijk!</h2>

                        {/*printing*/}
                        <button
                            onClick={handlePrint}
                            className="button--ellips recipes__button"
                        >
                            print
                        </button>


                        {recipe.source && <p className="source margin-top2">bron: {recipe.source}</p>}
                        {searchGeneral.includes("source") &&
                            <Input
                                type="text"
                                name="source"
                                className="input"
                                placeholder={recipe.source}
                                register={register}
                                errors={errors}
                            />}
                        {errors.source && <p>{errors.source.message}</p>}

                        {admin &&
                            <Button
                                type="submit"
                                className="button--ellips margin-top2"
                            >
                                versturen
                            </Button>}
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