import garlic from "../../assets/garlic.jpg";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input";


function Login() {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [unknown, setUnknown] = useState(false);

    async function onSubmit(data) {
        try {
            const response = await axios.post('http://localhost:8081/authenticate', data);
            if (response.status === 403) {
                setUnknown(true);
            }
            navigate('/recipes');
            login(response.data.jwt);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <article className="page page--flex">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Inloggen</h1>
                <p>Ben je nieuw hier, ga dan naar <Link
                    to="/register">registreren.</Link></p>

                <div className="margin-top2">
                <Input
                    id="username"
                    labelText="Gebruikersnaam:"
                    type="email"
                    name="username"
                    autocomplete="username"
                    className="input__text input--medium"
                    placeholder="typ hier je emailadres"
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        }
                    }}
                    register={register}
                    errors={errors}
                />

                <Input
                    id="password"
                    labelText="Wachtwoord:"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    className="input__text input--medium"
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

                <button
                    type="submit"
                    className="button--ellips"
                >
                    inloggen
                </button>

                    {unknown && <h3>Gebruikersnaam is onbekend of wachtwoord klopt niet.</h3>}

                </div>
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

export default Login;

