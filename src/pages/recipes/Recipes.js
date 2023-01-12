import React, {useContext, useEffect, useState} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Recipe() {
    const {firstname} = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
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
                // console.log("Response.status: " + response.status);
                setRecipes(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchRecipes();
    }, [])


    return (
        <article className="page recipes-page">

            <section>
                <h1>Recepten</h1>
                <h2>Aantal recepten: {recipes.length}</h2>
                {firstname ? <h3>Welkom, {firstname}</h3> : <h3>Welkom, hieronder vind je de recepten</h3>}
                <ol>
                    {recipes.map((recipe) => {
                        return <li key={recipe.id}>
                            <Link to={"/recipe/" + recipe.id}>
                                {recipe.file && <img src={recipe.file.url} alt={recipe.name}/>}
                                {recipe.title}
                            </Link>
                        </li>
                    })}
                </ol>
            </section>
        </article>
    );
}

export default Recipe;