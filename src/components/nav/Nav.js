import React, {useContext} from 'react';
import logoText from "../../assets/logoText.png";
import {NavLink, useNavigate} from 'react-router-dom';
import './Nav.css';
import Button from "../button/Button";
import {AuthContext} from "../../context/AuthContext";

//nog logo toevoegen?

function Nav() {
    const {isAuth, authority, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleClick() {
        navigate("/signin");
    }

    return (
        <>
            <nav>
                <ul className="nav__ul">
                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">
                        <li><em>Wildplukrecepten</em></li>
                    </NavLink>

                    <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">
                        <li>home</li>
                    </NavLink>

                    {isAuth &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/recipes">
                            <li>recepten</li>
                        </NavLink>}

                    {isAuth &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/newRecipe">
                            <li>recept toevoegen</li>
                        </NavLink>}

                    {isAuth &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/aboutme">
                            <li>about me</li>
                        </NavLink>}

                    {authority == "ROLE-ADMIN" &&
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/admin">
                            <li>admin</li>
                        </NavLink>}

                    {!isAuth &&
                        <button
                            type="button"
                            className="button--ellips"
                            onClick={() => navigate('/signin')}
                        >
                            inloggen
                        </button>}

                    {isAuth &&
                        <button
                            type="button"
                            className="button--ellips"
                            onClick={logout}
                        >
                            uitloggen
                        </button>}
                </ul>
            </nav>
        </>
    );
}

export default Nav;