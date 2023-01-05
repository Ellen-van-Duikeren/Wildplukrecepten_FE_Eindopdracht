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
    const [recipes, setRecipes] = useState([]);

    const currentRecipe = recipes.find((recipe) => {
        return recipe.id === id;
    });

    const [countPersons, setCountPersons] = useState(parseInt(currentRecipe.persons));

    // printing
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <article className="page recipe-page" key={currentRecipe.id}>
            <div className="recipe__description" ref={componentRef}>

                {/*left-side.......................................................*/}
                <div className="div--empty"></div>

                {/*printing*/}
                <button onClick={handlePrint} className="button--ellips print__button">print </button>

                <section className="left-side">
                    <h3>Ingredienten:</h3>
                    {currentRecipe.persons > 0 &&
                        <>
                            <div className="counterPersons">
                                <Button
                                    type="button"
                                    className="button--round"
                                    onClick={() => setCountPersons(countPersons => countPersons - 1)}
                                    disabled={countPersons <= 1}
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

                    <div>
                        {currentRecipe.ingredient.map((ingredient) => {
                            return (
                                <div className="recipe-age__ingredient">
                                    <label className="ingredient__label">
                                        <input type="checkbox"/>
                                        <p>{countPersons * parseInt(ingredient.amount) / currentRecipe.persons}</p>
                                        <p>{ingredient.unit}</p>
                                        <p>{ingredient.ingredient_name}</p>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </section>


                {/*right-side.......................................................*/}
                <section className="recipe-page__descriptions">
                    <h1>{currentRecipe.title}</h1>
                    <p>{currentRecipe.subtitle}</p>

                    {currentRecipe.file && <img src={currentRecipe.file.url} alt={currentRecipe.name}/>}

                    <div id="months">
                        {currentRecipe.months.map((month) => {
                            return (
                                <p id="month">{month}</p>
                            );
                        })}
                    </div>

                    <p>{currentRecipe.story}</p>
                    <div className="times">
                        {currentRecipe.preptime &&
                            <>
                                <RiKnifeLine size="40px" color="#A8C256"/>
                                <div className="time">
                                    <h4>{currentRecipe.preptime}</h4>
                                    <p>voorbereidingstijd</p>
                                </div>
                            </>
                        }
                        {currentRecipe.cooktime &&
                            <>
                                <GiCampCookingPot size="40px" color="#A8C256"/>
                                <div className="time">
                                    <h4>{currentRecipe.cooktime}</h4>
                                    <p>bereidingstijd</p>
                                </div>
                            </>
                        }
                    </div>

                    {currentRecipe.utensil &&
                        <>
                            <h3 id="utensilsheader">Benodigdheden:</h3>
                            <div id="utensils">
                                {currentRecipe.utensils.map((utensil) => {
                                    return (
                                        <ul>
                                            <li id="utensil">{utensil}</li>
                                        </ul>
                                    );
                                })}
                            </div>
                        </>
                    }

                    <h3>Bereiding:</h3>
                    <div id="instructions">
                        {currentRecipe.instructions.map((instruction, i) => {
                            return (
                                <div id="instruction">
                                    <p id="step">{i + 1}</p>
                                    <div>
                                        <h5>Stap {i + 1}</h5>
                                        <p id="instruction">{instruction}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h4>Tip: </h4>
                    {currentRecipe.tip && <p>{currentRecipe.tip}</p>}


                    <div id="tags">
                        {currentRecipe.tags.map((tag) => {
                            return (
                                <ul>
                                    <li id="tag">{tag}</li>
                                </ul>
                            );
                        })}
                    </div>

                    {currentRecipe.source && <p id="source">bron: {currentRecipe.source}</p>}

                </section>

            </div>


        </article>


    );
}

export default Recipe;