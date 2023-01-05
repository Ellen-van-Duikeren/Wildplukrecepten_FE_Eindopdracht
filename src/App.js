import './App.css';
import Nav from './components/nav/Nav';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Admin from "./pages/admin/Admin";
import Recipes from "./pages/recipes/Recipes";
import NewRecipe from "./pages/newRecipe/NewRecipe";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Recipe from "./pages/recipe/Recipe";
import {useState} from "react";
import AboutMe from "./pages/aboutme/AboutMe";


function App() {
    const [isAuthenticated, toggleIsAuthenticated] = useState(false);

       return (

        <>
            <Nav
                isAuthenticated={
                    isAuthenticated
                }

                toggleIsAuthenticated=
                    {
                        toggleIsAuthenticated
                    }
            />

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route
                    path="/login"
                    element={<Login
                        isAuthenticated={isAuthenticated}
                        toggleIsAuthenticated={toggleIsAuthenticated}
                    />}
                />

                <Route
                    path="/recipes"
                    element={<Recipes
                        isAuthenticated={isAuthenticated}
                        // toggleIsAuthenticated={toggleIsAuthenticated}
                    />}
                />

                <Route
                    path="/recipe/:id"
                    element={<Recipe
                        isAuthenticated={isAuthenticated}
                        // toggleIsAuthenticated={toggleIsAuthenticated}
                    />}
                />

                <Route path="/newrecipe" element=
                    {<NewRecipe/>}
                />

                <Route
                    path="/aboutme"
                    element={<AboutMe
                        isAuthenticated={isAuthenticated}
                        // toggleIsAuthenticated={toggleIsAuthenticated}
                    />}
                />

                <Route path="/admin" element={<Admin/>}
                />

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>

            <Footer/>

        </>
    )
        ;
}


export default App;
