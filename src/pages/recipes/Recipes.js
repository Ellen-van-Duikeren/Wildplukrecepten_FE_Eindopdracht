import React, {useContext, useEffect, useState} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/button/Button";

function Recipe() {
    const {isAuth, user} = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const token = localStorage.getItem('token');
    const [admin, toggleAdmin] = useState(false);

    const [month, setMonth] = useState("selecteer");
    const [tag, setTag] = useState("selecteer");
    const [monthsList] = useState([
        {
            label: "selecteer een maand",
            value: "months"
        },
        {label: "januari", value: "januari"},
        {label: "februari", value: "februari"},
        {label: "maart", value: "maart"},
        {label: "april", value: "april"},
        {label: "mei", value: "mei"},
        {label: "juni", value: "juni"},
        {label: "juli", value: "juli"},
        {label: "augustus", value: "augustus"},
        {label: "september", value: "september"},
        {label: "oktober", value: "oktober"},
        {label: "november", value: "november"},
        {label: "december", value: "december"}
    ]);

    const [tagsList] = useState([
        {
            label: "selecteer een categorie",
            value: "tags"
        },
        {label: "vegetarisch", value: "vegetarisch"},
        {label: "veganistisch", value: "veganistisch"},
        {label: "lactosevrij", value: "lactosevrij"},
        {label: "glutenvrij", value: "glutenvrij"},
        {label: "ontbijt", value: "ontbijt"},
        {label: "lunch", value: "lunch"},
        {label: "diner", value: "diner"},
        {label: "snack", value: "snack"},
        {label: "bijgerecht", value: "bijgerecht"},
        {label: "voorgerecht", value: "voorgerecht"},
        {label: "hoofdgerecht", value: "hoofdgerecht"},
        {label: "drinken", value: "drinken"},
        {label: "alcoholisch", value: "alcoholisch"},
        {label: "open vuur", value: "open vuur"},
        {label: "dutch oven", value: "dutch oven"}
    ]);


    // method to get an overview of all recipes
    useEffect(() => {
        const controller = new AbortController();
        async function fetchRecipes() {
            try {
                const response = await axios.get('http://localhost:8081/recipes', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                console.log("Response get all recipes:")
                console.log(response.data);
                // console.log(response.data[0].months);
                setRecipes(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchRecipes();
        return function cleanup() {
            controller.abort(); // <--- request annuleren
        }
    }, [token])




    return (
        <section className="page recipes-page">
            <article className="recipes__article">
                <div className="recipes__div--space-between">
                    {user.firstname ? <h1>Welkom {user.firstname} bij recepten</h1> : <h1>Welkom bij recepten</h1>}

                    {/*buttons for admin*/}
                    {(isAuth && user.authority === "ROLE_ADMIN" && !admin) && <Button
                        type="button"
                        className="button--ellips button--ellips-margin button--ellips-yellow"
                        onClick={() => toggleAdmin(!admin)}
                    >
                        Show id
                    </Button>}

                    {admin && <Button
                        type="button"
                        className="button--ellips button--ellips-margin button--ellips-yellow"
                        onClick={() => toggleAdmin(!admin)}
                    >
                        Hide id
                    </Button>}

                </div>

                <h3>Zoek op woord, maand of categorie</h3>
                <input
                    id="search"
                    placeholder="zoeken..."
                    onChange={(e) => setQuery(e.currentTarget.value)}
                />

                <select
                    className="recipes__select margin-left1"
                    value={month}
                    onChange={(e) => setMonth(e.currentTarget.value)}>
                    {monthsList.map(month => (
                        <option
                            key={month.value}
                            value={month.value}
                        >
                            {month.label}
                        </option>
                    ))}
                </select>

                <select
                    className="recipes__select margin-left1"
                    value={tag}
                    onChange={(e) => setTag(e.currentTarget.value)}>
                    {tagsList.map(tag => (
                        <option
                            key={tag.value}
                            value={tag.value}
                        >
                            {tag.label}
                        </option>
                    ))}
                </select>
            </article>

            {/*tiles............................................................................................................................................*/}

            <article className="recipes__article--flex">
                {((query === "") && (month.includes("selecteer") && tag.includes("selecteer")) &&
                    recipes.filter(recipe => {
                        return recipe;
                    }).map((recipe) => (
                        <ul className="recipes__ul" key={recipe.id}>
                            <div>
                                <li
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
                                        <p>{admin && recipe.id} {recipe.title}</p>
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    )))
                }
            </article>

            {query !== "" &&
                <h3 className="recipes__h3">Geselecteerd op zoekterm "{query}"</h3>}
            <article className="recipes__article--flex">
                {query !== "" &&
                    recipes.filter(recipe => {
                        if (query === "") {
                            return recipe;
                            //if query is not empty alias else
                        } else if (recipe.title.toLowerCase().includes(query.toLowerCase())) {
                            return recipe;
                        } else {
                            //search for ingredients
                            for (let i = 0; i < recipe.ingredients.length; i++) {
                                if (recipe.ingredients[i].ingredient_name.toLowerCase().includes(query.toLowerCase())) {
                                    return recipe;
                                }
                            }
                        }
                    }).map((recipe) => (
                        <ul className="recipes__ul key={recipe.id}">
                            <div>
                                <li
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
                                        <p>{admin && recipe.id} {recipe.title}</p>
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    ))
                }
            </article>


            {!month.includes("selecteer") &&
                <h3 className="recipes__h3">Geselecteerd op maand {month}, inclusief jaarrond</h3>}
            <article className="recipes__article--flex">
                {!month.includes("selecteer") && (
                    recipes.filter(recipe => {
                        for (let i = 0; i < recipe.months.length; i++) {
                            if (recipe.months[i].toLowerCase().includes(month.toLowerCase())
                                || (recipe.months[i].toLowerCase().includes("jaarrond"))) {
                                return recipe;
                            }
                        }
                    }).map((recipe) => (
                            <ul className="recipes__ul" key={recipe.id}>
                                <div>
                                    <li
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
                                            <p>{admin && recipe.id} {recipe.title}</p>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                    )))
                }
            </article>


            {!tag.includes("selecteer") && <h3 className="recipes__h3">Geselecteerd op categorie {tag}</h3>}
            <article className="recipes__article--flex">
                {!tag.includes("selecteer") && (
                    recipes.filter(recipe => {
                        for (let i = 0; i < recipe.tags.length; i++) {
                            if (recipe.tags[i].toLowerCase().includes(tag.toLowerCase())) {
                                return recipe;
                            }
                        }
                    }).map((recipe) => (
                            <ul className="recipes__ul" key={recipe.id}>
                                <div>
                                    <li
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
                                            <p>{admin && recipe.id} {recipe.title}</p>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                    )))
                }
            </article>





        </section>
    )
        ;
}

export default Recipe;