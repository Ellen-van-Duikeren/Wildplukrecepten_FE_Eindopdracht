import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <article className="page margin-bottom2">
           <h2>Oeps... Deze pagina bestaat niet</h2>
           <p>Ga terug naar de <Link to="/">homepage.</Link></p>
        </article>
    );
}

export default PageNotFound;