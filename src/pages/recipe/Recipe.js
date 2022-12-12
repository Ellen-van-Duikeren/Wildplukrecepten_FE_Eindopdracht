import React, {useState} from 'react';
import './Recipe.css';
import {Link, useParams} from "react-router-dom";
import data from '../../data/data.json';
import imagerecipe from '../../assets/bramenjam.jpg'
import {RiKnifeLine} from 'react-icons/ri';
import {GiCampCookingPot} from 'react-icons/gi';


function Recipe({imgname}) {
    const {id} = useParams();

    const currentRecipe = data.find((datax) => {
        return datax.id === id;
    });

    const [countPersons, setCountPersons] = useState(parseInt(currentRecipe.persons));

    return (
        <div className="recipepage" key={currentRecipe.id}>
            <div className="recipedescription">

{/*left-side.......................................................*/}
                <div id="emptydiv"></div>
                <article className="left-side">
                    <h3>Ingredienten:</h3>
                    {currentRecipe.persons &&
                        <>
                            <div id="counterPersons">
                                <button
                                    type="button"
                                    onClick={() => setCountPersons(countPersons => countPersons - 1)}
                                    disabled={countPersons <= 1}
                                >-
                                </button>
                                <p id="amountOfPersons">{countPersons}</p>
                                <button
                                    type="button"
                                    onClick={() => setCountPersons(countPersons => countPersons + 1)}
                                >+
                                </button>
                                <p>personen</p>
                            </div>
                        </>
                    }

                    <div>
                        {currentRecipe.ingredient.map((ingredient) => {
                            return (
                                <div className="ingredients">
                                    <label id="ingredient">
                                        <input type="checkbox"/>
                                        <p>{countPersons * parseInt(ingredient.amount) / currentRecipe.persons}</p>
                                        <p>{ingredient.unit}</p>
                                        <p>{ingredient.ingredientname}</p>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </article>


{/*right-side.......................................................*/}
                <article className="descriptions">
                    <h1>{currentRecipe.title}</h1>
                    <p>{currentRecipe.subtitle}</p>
                    <img src={imagerecipe} alt={currentRecipe.name}/>

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

                    <h3>Bereiding:</h3>
                    <div id="instructions">
                        {currentRecipe.instructions.map((instruction, i) => {
                            return (
                                <div id="instruction">
                                    <p id="step">{i+1}</p>
                                    <div>
                                    <h5>Stap {i+1}</h5>
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
                                    <p id="tag">{tag}</p>
                                </ul>
                            );
                        })}
                    </div>

                    {currentRecipe.source && <p id="source">bron: {currentRecipe.source}</p>}


                </article>
            </div>

            <article id="backtohome">
                <Link to="/">Terug naar Home</Link>
            </article>
        </div>
    )
        ;
}

export default Recipe;