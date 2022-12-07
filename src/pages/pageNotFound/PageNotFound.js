import React from 'react';
import './PageNotFound.css';
import {Link} from "react-router-dom";

function PageNotFound(props) {
    return (
        <div className="page-not-found">
           <h2>Oops... This page doesn't exist</h2>
           <p>Take me back to the <Link to="/">homepage.</Link></p>
        </div>
    );
}

export default PageNotFound;