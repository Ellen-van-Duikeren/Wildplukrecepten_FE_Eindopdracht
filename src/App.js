import './App.css';
import Nav from './components/nav/Nav';
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Admin from "./pages/admin/Admin";
import Recipes from "./pages/recipes/Recipes";
import NewRecipe from "./pages/newRecipe/NewRecipe";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Recipe from "./pages/recipe/Recipe";
import {useContext} from "react";
import AboutMe from "./pages/aboutme/AboutMe";
import Register from "./pages/register/Register";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (

        <>
            <Nav/>

            <Routes>
                <Route
                    path="/"
                    element={<Home/>}
                />

                <Route
                    path="/login"
                    element={<Login/>}
                />

                <Route
                    path="/register"
                    element={<Register/>}
                />

                <Route
                    path="/recipes"
                    element={isAuth ? <Recipes/> : <Navigate to="/login"/>}/>
                />

                <Route
                    path="/recipe/:id"
                    element={isAuth ? <Recipe/> : <Navigate to="/login"/>}/>
                />

                <Route
                    path="/newrecipe"
                    element={isAuth ? <NewRecipe/> : <Navigate to="/login"/>}/>
                />

                <Route
                    path="/aboutme"
                    element={isAuth ? <AboutMe/> : <Navigate to="/login"/>}/>
                />

                <Route
                    path="/admin"
                    element={isAuth ? <Admin/> : <Navigate to="/login"/>}/>
                />

                <Route
                    path="*"
                    element={<PageNotFound/>}/>
            </Routes>

            <Footer/>

        </>
    );
}


export default App;
