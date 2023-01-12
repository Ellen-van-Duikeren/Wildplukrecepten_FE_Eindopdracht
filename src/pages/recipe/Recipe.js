import React, {useEffect, useRef, useState} from 'react';
import './Recipe.css';
import {useParams} from "react-router-dom";
import {RiKnifeLine} from 'react-icons/ri';
import {GiCampCookingPot} from 'react-icons/gi';
import axios from "axios";
import Button from "../../components/button/Button";
import {useReactToPrint} from "react-to-print";

function Recipe({imgname}) {
    const {id} = useParams();
    const [recipe, setRecipe] = useState([]);
    const token = localStorage.getItem('token');
    const [countPersons, setCountPersons] = useState(4);
    const [ingredients, setIngredients] = useState([]);
    const [months, setMonths] = useState([]);
    const [utensils, setUtensils] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [tags, setTags] = useState([]);


    // method to get a recipe by id
    useEffect(() => {
            async function fetchRecipe() {
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
                fetchRecipe();
            }
        },
        []);


// printing
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <article className="page" key={`${recipe.id}-1`}>
            <div className="recipe__description" ref={componentRef}>

                {/*left-side..........................................*/}
                <section className="left-side__narrow">

                    <h3 className="ingredients--h3">Ingredienten:</h3>
                    {recipe.persons > 0 &&
                        <>
                            <div className="counter-persons">
                                <Button
                                    type="button"
                                    className="button--round button--round-yellow"
                                    onClick={() => setCountPersons(countPersons => countPersons - 1)}
                                    disabled={countPersons <= 0}
                                >-
                                </Button>
                                <p className="counter-persons__p">{countPersons}</p>
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
                                    <div key={`${ingredient.ingredient_name}-2`}>
                                        <label className="ingredient--label">
                                            <input
                                                type="checkbox"
                                                className="checkbox__input checkbox__input--margin"/>
                                            {ingredient.amount > 0 &&
                                                <p className="ingredient--p">
                                                    {recipe.persons > 0
                                                        ?
                                                        ((countPersons * parseInt(ingredient.amount) / recipe.persons) < 1)
                                                            ? (countPersons * parseInt(ingredient.amount) / recipe.persons).toFixed(1)
                                                            : (countPersons * parseInt(ingredient.amount) / recipe.persons)
                                                        :
                                                        ingredient.amount}
                                                </p>}
                                            <p className="ingredient--p">{ingredient.unit}</p>
                                            <p className="ingredient--p">{ingredient.ingredient_name}</p>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    }
                </section>


                {/*right-side.......................................................*/}
                <section className="recipe-page__descriptions right-side">

                    {months &&
                        <div className="tags">
                            {months.map((month) => {
                                return (
                                    <p
                                        className="tag"
                                        key={`${month}-3`}
                                    >
                                        {month}
                                    </p>
                                );
                            })}
                        </div>
                    }

                    <h1>{recipe.title}</h1>
                    {recipe.subtitle && <p>{recipe.subtitle}</p>}

                    {recipe.file && <img src={recipe.file.url} alt={recipe.name}/>}

                    {recipe.story && <p>{recipe.story}</p>}

                    <div className="times">
                        {recipe.prep_time &&
                            <>
                                <RiKnifeLine size="40px" color="#A8C256"/>
                                <div className="times--div">
                                    <h4>{recipe.prep_time}</h4>
                                    <p>voorbereidingstijd</p>
                                </div>
                            </>
                        }
                        {recipe.cook_time &&
                            <>
                                <GiCampCookingPot size="40px" color="#A8C256"/>
                                <div className="times--div">
                                    <h4>{recipe.cook_time}</h4>
                                    <p>bereidingstijd</p>
                                </div>
                            </>
                        }
                    </div>

                    {utensils &&
                    <>
                        <h3>Benodigdheden:</h3>
                        <div className="utensils--div">
                            {utensils.map((utensil) => {
                                return (
                                    <ul key={`${utensil.utensil}-4`}>
                                        <li className="utensils--li">{utensil.utensil}</li>
                                    </ul>
                                );
                            })}
                        </div>
                    </>
                    }

                    {instructions &&
                        <>
                            <h3>Bereiding:</h3>
                            <div>
                                {instructions.map((instruction, i) => {
                                    return (
                                        <div className="instructions--div">
                                            <Button
                                                type="button"
                                                className="button--round button--round-margin"
                                            >
                                                {i + 1}
                                            </Button>
                                            <div>
                                                <p className="p__strong">Stap {i + 1}</p>
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
                        {tags.map((tag) => {
                            return (
                                <p
                                    className="tag"
                                    key={`${tag}-5`}
                                >
                                    {tag}
                                </p>
                            );
                        })}
                    </div>

                    <h2>Eet smakelijk!</h2>

                    {/*printing*/}
                    <button onClick={handlePrint} className="button--ellips button--ellips">print</button>


                    {recipe.source && <p className="source">bron: {recipe.source}</p>}


                </section>

            </div>


        </article>


    );
}

export default Recipe;