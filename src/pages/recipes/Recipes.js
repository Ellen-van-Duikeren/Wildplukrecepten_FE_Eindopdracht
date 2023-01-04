import React, {useEffect, useState} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from "axios";

function Recipe() {
    const [recipes, setRecipes] = useState([]);
    const token = localStorage.getItem('token');


    // useEffect(() => {
    //     async function fetchRecipes() {
    //         try {
    //             const response = await axios.get("http://localhost:8081/recipes",
    //                 {
    //                     "Authorization": `Bearer ${token}`
    //                 });
    //             console.log(response);
    //             setRecipes(response);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     fetchRecipes();
    // }, [token])

    return (
        <article className="page recipes-page">
            <h1>Recepten</h1>
            <h2>Aantal recepten: {recipes.length}</h2>
            <ol>
                {recipes.map((recipe) => {
                    return <li key={recipe.id}>
                        <Link to={"/recipe/" + recipe.id}>
                            {recipe.title}
                        </Link>
                    </li>
                })}
            </ol>
        </article>
    );
}

export default Recipe;