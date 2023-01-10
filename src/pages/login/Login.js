import "./Login.css";
import garlic from "../../assets/garlic.jpg";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input";
import {API_URL} from "../../helperfunctions/axiosFunctions";

function Login({toggleIsAuthenticated}) {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const navigate = useNavigate();

    function handleClick() {
        toggleIsAuthenticated(true);
        navigate("/recipes");
    }

     //axios login
     async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post(`${API_URL}/authenticate`, data)
            // console.log("Result: " + result);
            // console.log("Result.data: " + result.data);
            // console.log("Result.status: " + result.status);
            if (result.status === 200) {
                localStorage.setItem('token', result.data.jwt);
                console.log("In token opgeslagen: " +  localStorage.getItem('token'));
                navigate("/recipes");
                toggleIsAuthenticated(true);
            }
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
                    labelText="Username:"
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
                    inloggen
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

