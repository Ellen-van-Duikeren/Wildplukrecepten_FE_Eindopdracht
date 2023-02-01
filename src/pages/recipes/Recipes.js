import React, {useContext, useEffect, useState} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/button/Button";

function Recipe() {
    const {isAuth, user} = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const token = localStorage.getItem('token');
    const [admin, toggleAdmin] = useState(false);

    // search
    let [filteredRecipes, setFilteredRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [month, setMonth] = useState("selecteer");
    const [tag, setTag] = useState("selecteer");
    const [idOfSearchedRecipe, setIdOfSearchedRecipe] = useState(0);

    const [monthsList] = useState([
        {label: "selecteer een maand", value: "months"},
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
        {label: "december", value: "december"},
        {label: "jaarrond", value: "jaarrond"}
    ]);

    const [tagsList] = useState([
        {label: "selecteer een categorie", value: "tags"},
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
                response.data.sort((a, b) => a.id - b.id);
                setRecipes(response.data);
                setFilteredRecipes(response.data);
                // setRecipesToShow(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchRecipes();
        return function cleanup() {
            controller.abort();
        }
    }, [token])


    // search by word
    if (query != "") {
        filteredRecipes = filteredRecipes.filter(functionFilterByWord);

        function functionFilterByWord(recipe) {
            if (recipe.title.toLowerCase().includes(query.toLowerCase())) {
                return recipe;
            } else {
                //search for ingredients
                for (let i = 0; i < recipe.ingredients.length; i++) {
                    if (recipe.ingredients[i].ingredient_name.toLowerCase().includes(query.toLowerCase())) {
                        return recipe;
                    }
                }
            }
        }
    }


    // search by month
    if (!month.includes("selecteer")) {
        filteredRecipes = filteredRecipes.filter(functionFilterByMonth);

        function functionFilterByMonth(recipe) {
            for (let i = 0; i < recipe.months.length; i++) {
                if (recipe.months[i].toLowerCase().includes(month.toLowerCase())
                    || (recipe.months[i].toLowerCase().includes("jaarrond")))
                    return true;
            }
            return false;
        }
    }


    // search by tag
    if (!tag.includes("selecteer")) {
        filteredRecipes = filteredRecipes.filter(functionFilterByTag);

        function functionFilterByTag(recipe) {
            for (let i = 0; i < recipe.tags.length; i++) {
                if (recipe.tags[i].toLowerCase().includes(tag.toLowerCase()))
                    return true;
            }
            return false;
        }
    }


    // search by id
    if (idOfSearchedRecipe !== 0) {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.id == idOfSearchedRecipe);
    }


    // return...................................................................................................................
    return (
        <section className="page">
            <article className="recipes__article margin-bottom1">
                <div className="recipes__div--space-between">
                    {user.firstname ? <h1>Welkom {user.firstname} bij recepten</h1> :
                        <h1>Welkom bij wildplukrecepten</h1>}

                    {/*buttons for admin*/}
                    {(isAuth && user.authority === "ROLE_ADMIN" && !admin) && <Button
                        type="button"
                        className="button--ellips button--ellips-yellow"
                        onClick={() => toggleAdmin(!admin)}
                    >
                        show id
                    </Button>}

                    {admin && <Button
                        type="button"
                        className="button--ellips button--ellips-yellow"
                        onClick={() => toggleAdmin(!admin)}
                    >
                        hide id
                    </Button>}
                </div>

                {/*search by word*/}
                <h3>Zoek op woord, maand of categorie</h3>
                <input
                    id="search"
                    placeholder="zoeken..."
                    onChange={(e) => setQuery(e.currentTarget.value)}
                />

                {/*search by month*/}
                <select
                    className="recipes__select margin-left1"
                    value={month}
                    onChange={(e) => setMonth(e.currentTarget.value)}>
                    {/*onChange={(e) => selectByMonth(e, e.target.value)}>*/}
                    {monthsList.map(month => (
                        <option
                            key={month.value}
                            value={month.value}
                        >
                            {month.label}
                        </option>
                    ))}
                </select>

                {/*search by tag*/}
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


                {/*search by id*/}
                {admin &&
                    <select
                        className="recipes__select margin-left1"
                        onChange={(e) => setIdOfSearchedRecipe(e.currentTarget.value)}>
                        <option>selecteer een id</option>
                        {recipes.map(recipe => (
                            <option
                                key={recipe.id}
                                value={recipe.id}
                            >
                                {recipe.id}
                            </option>
                        ))}
                    </select>
                }

                <Button
                    type="button"
                    className="button--ellips button--ellips-yellow margin-left1"
                    onClick={() => window.location.reload()}
                >
                    reset
                </Button>

            </article>


            {/*show (selected) recipes*/}
            <article className="recipes__article--flex">
                {filteredRecipes.map((recipe) => (
                    <Link
                        to={"/recipe/" + recipe.id}
                        className="recipes__a"
                        key={recipe.id}
                    >
                        <ul className="recipes__ul">

                            <li
                                className="recipes__li">

                                {recipe.file &&
                                    <img
                                        src={recipe.file.url}
                                        alt={recipe.name}
                                        className="recipes__image"
                                    />}
                                <p>{admin && recipe.id} {recipe.title}</p>
                                {!month.includes("selecteer") && (recipe.months[0].toLowerCase().includes("jaarrond") ?
                                    <p>jaarrond</p> : <p>{month}</p>)}
                            </li>
                        </ul>
                    </Link>
                ))
                }
            </article>

        </section>
    )
        ;
}

export default Recipe;