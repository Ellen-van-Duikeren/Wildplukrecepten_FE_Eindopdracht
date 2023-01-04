import React from 'react';
import './PageNotFound.css';
import {Link} from "react-router-dom";

function PageNotFound(props) {
    return (
        <article className="page page-not-found">
           <h2>Oeps... Deze pagina bestaat niet</h2>
           <p>Ga terug naar de <Link to="/">homepage.</Link></p>
        </article>
    );
}

export default PageNotFound;