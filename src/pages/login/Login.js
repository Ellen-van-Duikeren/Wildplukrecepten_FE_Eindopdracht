import "./Login.css";
import garlic from "../../assets/garlic.jpg";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input";
import {loginUser} from "../../helperfunctions/axiosFunctions";

function Login({toggleIsAuthenticated}) {
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm();

    //onderstaande moet er nog uit, dit is een button om meteen zonder inlog en password op te geven in te loggen
    //ook weghalen toggleIsAuthenticated in functie aanroep hierboven
    const navigate = useNavigate();
    function handleClick() {
        toggleIsAuthenticated(true);
        navigate("/recipes");
    }


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(data) {
        console.log(username, password);
        // post request
        try {
            const result = await loginUser(data);
            login(result.data.accessToken);
            console.log(result.data);
            // if (result.status == 200) {
            //     localStorage.setItem('token', result.data.token);
            //     navigate("/recipes");
            //     toggleIsAuthenticated(true);
            // }
        } catch (e) {
            console.error(e);
        }
    }


    return (
            <article className="page login-page">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Inloggen</h1>
                    <Input
                        id="username"
                        labelText="Emailadres:"
                        type="email"
                        name="username"
                        className="input__text"
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
                        id="password"
                        labelText="Wachtwoord:"
                        type="password"
                        name="password"
                        className="input__text"
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


                        <button
                            type="submit"
                            className="button--ellips"
                        >
                            versturen
                        </button>



                    {/*onderstaande button moet er nog uit*/}
                    <button
                        type="button"
                        className="button--ellips"
                        onClick={() => handleClick()}
                    >inloggen zonder wachtwoord
                    </button>

                </form>


                <div className="right-side">
                    <img src={garlic} alt="wild garlic" className="photo"/>
                    <p className="photo-caption">Daslook, &copy; <a
                        href='https://unsplash.com/es/@garyellisphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Gary
                        Ellis</a> on <a
                        href='https://unsplash.com/s/photos/wild-garlic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a>
                    </p>
                </div>
            </article>
    );
}

export default Login;

