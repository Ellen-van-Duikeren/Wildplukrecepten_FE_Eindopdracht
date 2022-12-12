import React from 'react';
import './PageNotFound.css';
import {Link} from "react-router-dom";

function PageNotFound(props) {
    return (
        <div className="page-not-found">
           <h2>Oeps... Deze pagina bestaat niet</h2>
           <p>Ga terug naar de <Link to="/">homepage.</Link></p>
        </div>
    );
}

export default PageNotFound;