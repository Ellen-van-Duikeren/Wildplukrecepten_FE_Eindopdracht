import React from 'react';
import './Recipes.css';
import data from '../../data/data.json';
import {Link} from "react-router-dom";

function Recipe() {
    return (
        <section className="recipespage" key={data.id}>
            <h1>Recepten overzichtspagina</h1>
            <h3>Aantal recepten: {data.length}</h3>
            <ol>
                {data.map((datax) => {
                    return <li key={datax.id}>
                        <Link to={"/recipe/" + datax.id}>
                            {datax.title}
                        </Link>
                    </li>
                })}
            </ol>
        </section>
    );
}

export default Recipe;