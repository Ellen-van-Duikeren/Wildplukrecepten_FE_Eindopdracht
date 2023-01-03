import React, {useEffect, useState} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from "axios";

function Recipe() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get("http://localhost:8081/recipes");
                console.log(response);
                setRecipes(response);
            } catch (e) {
                console.error(e);
            }
        }
        fetchRecipes();
    }, [])


    return (
        <section className="recipespage">
            <h1>Recepten</h1>
            <h3>Aantal recepten: {recipes.length}</h3>
            <ol>
                {recipes.map((recipe) => {
                    return <li key={recipe.id}>
                        <Link to={"/recipe/" + recipe.id}>
                            {recipe.title}
                        </Link>
                    </li>
                })}
            </ol>
        </section>
    );
}

export default Recipe;