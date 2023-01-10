import React from 'react';
import logoText from "../../assets/logoText.png";
import {NavLink, useNavigate} from 'react-router-dom';
import './Nav.css';
import Button from "../button/Button";

function Nav({isAuthenticated, toggleIsAuthenticated}) {
    const navigate = useNavigate();

    function handleClick() {
        toggleIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <>
            <nav>
                <ul className="nav__ul">
                    {/*hieronder nog leuk logo toevoegen?*/}
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">
                        <li><em>Wildplukrecepten</em></li>
                    </NavLink>

                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">
                        <li>home</li>
                    </NavLink>

                    {isAuthenticated &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/recipes">
                            <li>recepten</li>
                        </NavLink>}

                    {isAuthenticated &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/newRecipe">
                            <li>recept toevoegen</li>
                        </NavLink>}

                    {isAuthenticated &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/aboutme">
                            <li>about me</li>
                        </NavLink>}

                    {isAuthenticated &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/admin">
                            <li>admin</li>
                        </NavLink>}

                    {!isAuthenticated &&
                        <button
                            type="button"
                            className="button--ellips"
                            onClick={() => handleClick()}
                        >
                            inloggen
                        </button>}

                    {isAuthenticated &&
                        <button
                            type="button"
                            className="button--ellips"
                            onClick={() => handleClick()}
                        >
                            uitloggen
                        </button>}
                    {/*hieronder zoek button uitgecomment, lelijk ding*/}
                    {/*<input className="formControl" type="text" placeholder="zoek"></input>*/}
                </ul>
            </nav>
        </>
    );
}

export default Nav;