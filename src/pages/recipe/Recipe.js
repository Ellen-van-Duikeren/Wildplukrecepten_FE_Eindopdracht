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
    const [countPersons, setCountPersons] = useState(0);

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
                    console.log(response.data.ingredients[0]);
                    setRecipe(response.data);
                } catch (e) {
                    console.error(e);
                }
            }

            if (id) {
                fetchRecipe();
            }
        },
        [id]);


// printing
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <article className="page recipe-page" key={recipe.id}>
            <div className="recipe__description" ref={componentRef}>




                {/*left-side.......................................................*/}
                <div className="div--empty"></div>


                <section className="left-side">

                    {/*printing*/}
                    <button onClick={handlePrint} className="button--ellips print__button">print</button>


                    <h3>Ingredienten:</h3>
                    {recipe.persons > 0 &&
                        <>
                            <div className="counterPersons">
                                <Button
                                    type="button"
                                    className="button--round"
                                    onClick={() => setCountPersons(countPersons => countPersons - 1)}
                                    disabled={countPersons <= 0}
                                >-
                                </Button>
                                <p id="amountOfPersons">{countPersons}</p>
                                <Button
                                    type="button"
                                    className="button--round"
                                    onClick={() => setCountPersons(countPersons => countPersons + 1)}
                                >+
                                </Button>
                                <p>personen</p>
                            </div>
                        </>
                    }

                    {/*<div>*/}
                    {/*    {recipe.ingredients.map((ingredient) => {*/}
                    {/*        return (*/}
                    {/*            <div className="recipe-age__ingredient">*/}
                    {/*                <label className="ingredient__label">*/}
                    {/*                    <input type="checkbox"/>*/}
                    {/*                    <p>{countPersons * parseInt(ingredient.amount) / recipe.persons}</p>*/}
                    {/*                    <p>{ingredient.unit}</p>*/}
                    {/*                    <p>{ingredient.ingredient_name}</p>*/}
                    {/*                </label>*/}
                    {/*            </div>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</div>*/}
                </section>


                {/*right-side.......................................................*/}
                <section className="recipe-page__descriptions right-side">
                    <h1>{recipe.title}</h1>
                    <p>{recipe.subtitle}</p>

                    {recipe.file && <img src={recipe.file.url} alt={recipe.name}/>}

                    {/*<div id="months">*/}
                    {/*    {recipe.months.map((month) => {*/}
                    {/*        return (*/}
                    {/*            <p id="month">{month}</p>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</div>*/}

                    <p>{recipe.story}</p>
                    <div className="times">
                        {recipe.preptime &&
                            <>
                                <RiKnifeLine size="40px" color="#A8C256"/>
                                <div className="time">
                                    <h4>{recipe.preptime}</h4>
                                    <p>voorbereidingstijd</p>
                                </div>
                            </>
                        }
                        {recipe.cooktime &&
                            <>
                                <GiCampCookingPot size="40px" color="#A8C256"/>
                                <div className="time">
                                    <h4>{recipe.cooktime}</h4>
                                    <p>bereidingstijd</p>
                                </div>
                            </>
                        }
                    </div>

                {/*    {recipe.utensil &&*/}
                {/*        <>*/}
                {/*            <h3 id="utensilsheader">Benodigdheden:</h3>*/}
                {/*            <div id="utensils">*/}
                {/*                {recipe.utensils.map((utensil) => {*/}
                {/*                    return (*/}
                {/*                        <ul>*/}
                {/*                            <li id="utensil">{utensil}</li>*/}
                {/*                        </ul>*/}
                {/*                    );*/}
                {/*                })}*/}
                {/*            </div>*/}
                {/*        </>*/}
                {/*    }*/}

                {/*    <h3>Bereiding:</h3>*/}
                {/*    <div id="instructions">*/}
                {/*        {recipe.instructions.map((instruction, i) => {*/}
                {/*            return (*/}
                {/*                <div id="instruction">*/}
                {/*                    <p id="step">{i + 1}</p>*/}
                {/*                    <div>*/}
                {/*                        <h5>Stap {i + 1}</h5>*/}
                {/*                        <p id="instruction">{instruction}</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </div>*/}

                    <h4>Tip: </h4>
                    {recipe.tip && <p>{recipe.tip}</p>}


                    {/*<div id="tags">*/}
                    {/*    {recipe.tags.map((tag) => {*/}
                    {/*        return (*/}
                    {/*            <ul>*/}
                    {/*                <li id="tag">{tag}</li>*/}
                    {/*            </ul>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</div>*/}

                    {recipe.source && <p id="source">bron: {recipe.source}</p>}

                </section>

            </div>


        </article>


    );
}

export default Recipe;