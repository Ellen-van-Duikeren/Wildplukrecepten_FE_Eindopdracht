import './Login.css';
import garlic from "../../assets/garlic.jpg";
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import Input from "../../components/input/Input";
import users from '../../data/users.json';
import React from "react";

function Login({isAuthenticated, toggleIsAuthenticated}) {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    //onderstaande moet er nog uit, dit is een button om meteen zonder inlog en password op te geven in te loggen
    function handleClick() {
        toggleIsAuthenticated(true);
        navigate("/recipes");
    }

    function handleFormSubmit(data) {
        console.log(data);
        const rightUser = users.find((user) => user.username === data.username);
        console.log("Username: " + data.username);
        if (rightUser != null) {
            const rightPassword = rightUser.password
            console.log("Password: " + data.password);
            if (data.password == rightPassword) {
                toggleIsAuthenticated(true);
                navigate("/recipes");
            } else {
                console.error("Dit wachtwoord klopt niet. Neem contact op met de administratie.");
                document.getElementById("password-is-not-right").textContent = "Dit wachtwoord klopt niet. Neem contact op met de administratie.";
            }
        } else {
            console.error("Deze gebruikersnaam is onbekend. Neem contact op met de administratie.");
            document.getElementById("username-does-not-exist").textContent = "Deze gebruikersnaam is onbekend. Neem contact op met de administratie.";
        }
    }

    return (
        <>
            <div className="login-form">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h2 id="inlog-header">Inloggen</h2>
                    <Input
                        labelText="Login:"
                        inputType="text"
                        inputId="username"
                        inputName="username"
                        placeholder="emailadres"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {errors.username && <p>{errors.username.message}</p>}


                    <Input
                        labelText="Wachtwoord:"
                        inputType="password"
                        inputId="password"
                        inputName="password"
                        placeholder="wachtwoord"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <button type="submit" id="login-button">Versturen</button>

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
                    <p id="text-photo">Daslook, &copy <a
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