import './Login.css';
import garlic from "../../assets/garlic.jpg";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

function Login({isAuthenticated, toggleIsAuthenticated}) {
    const navigate = useNavigate();

    //onderstaande moet er nog uit, dit is een button om meteen zonder inlog en password op te geven in te loggen
    function handleClick() {
        toggleIsAuthenticated(true);
        navigate("/recipes");
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [addSucces, toggleAddSuccess] = useState(false);

    // authentication code, nog aanpassen dat deze dynamisch wordt


    async function addUser(e) {
        e.preventDefault();
        console.log(username, password);

        // post request
        try {
            const response = await axios.post('http://localhost:8081/authenticate', {
                    username: username,
                    password: password,
                });
            console.log(response.data);
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <div className="login-form">
                <form onSubmit={addUser}>
                    <h2 id="inlog-header">Inloggen</h2>
                    <label
                        htmlFor="username">
                        Login:
                        <input
                            type="email"
                            name="username"
                            id="username"
                            placeholder="emailadres"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                    </label>

                    <label
                        htmlFor="password">
                        Wachtwoord:
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="wachtwoord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </label>

                    <div className="login_succeeded">
                        <button type="submit" id="login-button">Versturen</button>
                        {addSucces === true &&
                            <>
                                <p>Je bent aangemeld.</p>
                                {toggleIsAuthenticated(true)}
                                {navigate("/recipes")}
                            </>
                        }
                    </div>

                    {/*onderstaande button moet er nog uit*/}
                    <button
                        type="button"
                        id="click-login-button"
                        onClick={() => handleClick()}
                    >Inloggen zonder wachtwoord
                    </button>

                </form>


                <div className="right-side">
                    <img src={garlic} alt="wild garlic" id="wild-garlic"/>
                    <p id="text-photo">Daslook, &copy; <a
                        href='https://unsplash.com/es/@garyellisphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Gary
                        Ellis</a> on <a
                        href='https://unsplash.com/s/photos/wild-garlic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;

// function handleFormSubmit(data) {
//     console.log(data);
//     const rightUser = users.find((user) => user.username === data.username);
//     console.log("Username: " + data.username);
//     if (rightUser != null) {
//         const rightPassword = rightUser.password
//         console.log("Password: " + data.password);
//         if (data.password === rightPassword) {
//             toggleIsAuthenticated(true);
//             navigate("/recipes");
//         } else {
//             console.error("Dit wachtwoord klopt niet. Neem contact op met de administratie.");
//             document.getElementById("password-is-not-right").textContent = "Dit wachtwoord klopt niet. Neem contact op met de administratie.";
//         }
//     } else {
//         console.error("Deze gebruikersnaam is onbekend. Neem contact op met de administratie.");
//         document.getElementById("username-does-not-exist").textContent = "Deze gebruikersnaam is onbekend. Neem contact op met de administratie.";
//     }
// }
