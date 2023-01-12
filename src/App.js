import './App.css';
import Nav from './components/nav/Nav';
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Admin from "./pages/admin/Admin";
import Recipes from "./pages/recipes/Recipes";
import NewRecipe from "./pages/newRecipe/NewRecipe";
import Footer from "./components/footer/Footer";
import SignIn from "./pages/signin/SignIn";
import Recipe from "./pages/recipe/Recipe";
import {useContext, useState} from "react";
import AboutMe from "./pages/aboutme/AboutMe";
import Register from "./pages/register/Register";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth, role} = useContext(AuthContext);

    return (

        <>
            <Nav/>

            <Routes>
                <Route
                    path="/"
                    element={<Home/>}/>
                <Route
                    path="/signin"
                    element={<SignIn/>}
                />

                <Route
                    path="/register"
                    element={<Register/>}
                />


                <Route
                    path="/recipes"
                    element={isAuth ? <Recipes/> : <Navigate to="/"/>}/>
                />

                <Route
                    path="/recipe/:id"
                    element={isAuth ? <Recipe/> : <Navigate to="/"/>}/>
                />

                <Route
                    path="/newrecipe"
                    element={isAuth ? <NewRecipe/> : <Navigate to="/"/>}/>
                />

                <Route
                    path="/aboutme"
                    element={isAuth ? <AboutMe/> : <Navigate to="/"/>}/>
                />

                <Route
                    path="/admin"
                    element={isAuth ? <Admin/> : <Navigate to="/"/>}/>
                />

                <Route
                    path="*"
                    element={<PageNotFound/>}/>
            </Routes>

            <Footer/>

        </>
    )
        ;
}


export default App;
