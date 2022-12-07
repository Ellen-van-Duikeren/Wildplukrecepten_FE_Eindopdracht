import React from 'react';
import './Recipe.css';
import {useParams} from "react-router-dom";

function Recipe(props) {
    const {id} = useParams();
    return (
        <div>
            <h1>Hier komt een recept te staan</h1>
            <p>Dummy tekst: Het productnummer is {id}</p>
        </div>
    );
}

export default Recipe;