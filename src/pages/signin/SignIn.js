import "./SignIn.css";
import garlic from "../../assets/garlic.jpg";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input";
import {API_URL} from "../../helperfunctions/axiosFunctions";


function SignIn() {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const response = await axios.post(`${API_URL}/authenticate`, data)
            console.log(response);
            // console.log("Response.data: " + response.data);
            // console.log("Response.status: " + response.status);
            navigate('/recipes');
            login(response.data.jwt);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <article className="page login-page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Inloggen</h1>
                <p className="login__p--margin">Ben je nog niet geregistreerd, ga dan naar <Link
                    to="/register">registreren</Link></p>

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
            </form>


            <div className="right-side">
                <img src={garlic} alt="wild garlic" className="photo"/>
                <p className="photo-caption">Daslook, &copy; <a
                    href='https://unsplash.com/es/@garyellisphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Gary
                    Ellis</a>
                </p>
            </div>
        </article>
    );
}

export default SignIn;

