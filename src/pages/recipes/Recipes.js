import React, {useContext, useEffect, useState} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import login from "../login/Login";

function Recipe() {
    const {user} = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    // const [months, setMonths] = useState([]);
    const [query, setQuery] = useState("");
    const token = localStorage.getItem('token');

    // method to get an overview of all recipes
    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get('http://localhost:8081/recipes', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log("Response get all recipes:")
                console.log(response.data);
                console.log(response.data[0].months);
                // console.log("Response.status: " + response.status);
                setRecipes(response.data);
                // setMonths(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchRecipes();
    }, [token])


    //searchbar
    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };


    // if (searchInput.length > 0) {
    //     // months.filter((month) => {
    //     //     return month.match(searchInput);
    //     const filtered = recipes.filter(recipe => {
    //         return recipe.months == searchInput;
    //     });
    //     setFilteredRecipes(filtered);
    //     console.log("FilteredRecipes");
    //     console.log(filteredRecipes);
    // }


    return (
        <article className="page recipes-page">

            <section>
                <div className="recipes__div--space-between">
                    {/*<h2>Aantal recepten: {recipes.length}</h2>*/}
                    {user.firstname ? <h1>Welkom {user.firstname}</h1> : <h1>Welkom</h1>}
                    <h1>Recepten</h1>
                </div>

                {/*searchbar*/}
                {/*<label htmlFor="months">zoek op maand:*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="zoek op maand"*/}
                {/*        onChange={handleChange}*/}
                {/*        value={searchInput}*/}
                {/*    />*/}
                {/*    <select id="months">*/}
                {/*        <option value="januari">januari</option>*/}
                {/*        <option value="februari">februari</option>*/}
                {/*        <option value="maart">maart</option>*/}
                {/*        <option value="april">april</option>*/}
                {/*        <option value="mei">mei</option>*/}
                {/*        <option value="juni">juni</option>*/}
                {/*        <option value="juli">juli</option>*/}
                {/*        <option value="augustus">augustus</option>*/}
                {/*        <option value="september">september</option>*/}
                {/*        <option value="oktober">oktober</option>*/}
                {/*        <option value="november">november</option>*/}
                {/*        <option value="december">december</option>*/}
                {/*    </select>*/}
                {/*</label>*/}


                <label htmlFor="search"> Typ hier je zoekwoord
                    <input id="search" placeholder="zoeken..." onChange={handleChange}/>
                </label>

                <h3>Boe</h3>

                {/*nog nadenken hoe de zoekfunctie eruit komt te zien en alle tiles van de recepten er dan inzetten*/}
                {/*{*/}
                {/*    recipes.filter(recipe => {*/}
                {/*        if (query === "") {*/}
                {/*            return recipe;*/}
                {/*        } else if (recipe.title.toLowerCase().includes(query.toLowerCase())) {*/}
                {/*            return recipe;*/}
                {/*        }*/}
                {/*    }).map((recipe) => (*/}
                {/*        <p>{recipe.title}</p>*/}
                {/*    ))*/}
                {/*}*/}


                {/*{*/}
                {/*    recipes.filter(recipe => {*/}
                {/*        if (query === "") {*/}
                {/*            return recipe;*/}
                {/*        } else {*/}
                {/*            for (let i = 0; i < recipe.months.length; i++) {*/}
                {/*                if (recipe.months[i].toLowerCase().includes(query.toLowerCase())) {*/}
                {/*                    return recipe;*/}
                {/*                }*/}
                {/*            }*/}
                {/*        }*/}
                {/*    }).map((recipe) => (*/}
                {/*        <p key={recipe.id}>{recipe.title}</p>*/}
                {/*    ))*/}
                {/*}*/}


                {/*{*/}
                {/*    recipes.filter(recipe => {*/}
                {/*        if (query === "") {*/}
                {/*            return recipe;*/}
                {/*        } else {*/}
                {/*            for (let i = 0; i < recipe.tags.length; i++) {*/}
                {/*                if (recipe.tags[i].toLowerCase().includes(query.toLowerCase())) {*/}
                {/*                    return recipe;*/}
                {/*                }*/}
                {/*            }*/}
                {/*        }*/}
                {/*    }).map((recipe) => (*/}
                {/*        <p key={recipe.id}>{recipe.title}</p>*/}
                {/*    ))*/}
                {/*}*/}


                {
                    recipes.filter(recipe => {
                        if (query === "") {
                            return recipe;
                        } else {
                            for (let i = 0; i < recipe.ingredients.length; i++) {
                                if (recipe.ingredients[i].ingredient_name.toLowerCase().includes(query.toLowerCase())) {
                                    return recipe;
                                }
                            }
                        }
                    }).map((recipe) => (
                        <p key={recipe.id}>{recipe.title}</p>
                    ))
                }


                <h3>Boe</h3>


                <ul className="recipes__ul">
                    <div className="recipes__div">
                        {recipes.map((recipe) => {
                            return <li key={recipe.id}
                                       className="recipes__li">
                                <Link
                                    to={"/recipe/" + recipe.id}
                                    className="recipes__a"
                                >
                                    {recipe.file &&
                                        <img
                                            src={recipe.file.url}
                                            alt={recipe.name}
                                            className="recipes__image"
                                        />}
                                    {recipe.title}
                                </Link>
                            </li>
                        })}
                    </div>
                </ul>
            </section>
        </article>
    )
        ;
}

export default Recipe;