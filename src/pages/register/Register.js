import React, {useContext, useState} from 'react';
import Input from "../../components/input/Input";
import blackthorns from "../../assets/blackthorns.jpg";
import axios from "axios";
import {API_URL} from "../../helperfunctions/axiosFunctions";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";


function Register() {
    const {isAuth, setAuth} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm();
    const navigate = useNavigate();
    const [succesRegister, toggleSuccessRegister] = useState(true);


    async function registerUser(data) {
        try {
            const response = await axios.post(`${API_URL}/users/register`, data)
            console.log("Response in register: ")
            console.log(response);
            if (response.status != 201) {
                console.log("Registratie is niet gelukt");
                toggleSuccessRegister(false);
            }
            navigate('/login')

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <article className="page login-page">
            <form onSubmit={handleSubmit(registerUser)}>
                <h1>Registreren</h1>
                <p className="login__p--margin">Heb je je al geregistreerd, ga dan naar <Link
                    to="/login">inloggen</Link></p>
                <Input
                    id="username"
                    labelText="Username:"
                    type="text"
                    name="username"
                    className="input__text"
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
                {errors.username && <p>{errors.username.message}</p>}

                <Input
                    id="firstname"
                    labelText="Voornaam:"
                    type="text"
                    name="firstname"
                    className="input__text"
                    placeholder="voornaam"
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        }
                    }}
                    register={register}
                    errors={errors}
                />
                {errors.firstname && <p>{errors.firstname.message}</p>}

                <Input
                    id="lastname"
                    labelText="Achternaam:"
                    type="text"
                    name="lastname"
                    className="input__text"
                    placeholder="achternaam"
                    validationRules={{
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        }
                    }}
                    register={register}
                    errors={errors}
                />
                {errors.lastname && <p>{errors.lastname.message}</p>}

                <Input
                    id="email"
                    labelText="Email:"
                    type="email"
                    name="emailadress"
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
                {errors.email && <p>{errors.email.message}</p>}

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

                {!succesRegister && <h3>Het registreren is niet gelukt. Stuur een mail naar e.vanduikeren@gmail.com</h3>}

                <p className="register__p">Let op, als je registratie is gelukt, kom je op de login pagina en kan je meteen inloggen.</p>


                <button
                    type="submit"
                    className="button--ellips"
                >
                    registreren
                </button>


            </form>


            <div className="right-side">
                <img src={blackthorns} alt="blackthorns" className="photo"/>
                <p className="photo-caption">Sleedoorn, &copy; <a
                    href="https://www.pexels.com/photo/bunch-of-ripe-blueberries-with-water-drops-5980178/">Alexandra
                    Patrusheva
                </a>
                </p>
            </div>
        </article>);
}

export default Register;