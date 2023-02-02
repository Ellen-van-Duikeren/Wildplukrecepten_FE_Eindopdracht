import React, {useContext, useState} from 'react';
import Input from "../../components/input/Input";
import blackthorns from "../../assets/blackthorns.jpg";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";


function Register() {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const navigate = useNavigate();
    const [succesRegister, toggleSuccessRegister] = useState(true);

    async function registerUser(data) {
        try {
            const response = await axios.post('http://localhost:8081/users/register', data)
            if (response.status !== 201) {
                toggleSuccessRegister(false);
            }
            navigate('/login')
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <article className="page page--flex">
            <form onSubmit={handleSubmit(registerUser)} className="left-side">
                <h1>Registreren</h1>
                <p className="margin-bottom2">Heb je je al geregistreerd, ga dan naar <Link
                    to="/login">inloggen</Link></p>
                <Input
                    id="username"
                    labelText="Gebruikersnaam:"
                    type="email"
                    name="username"
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
                    id="firstname"
                    labelText="Voornaam:"
                    type="text"
                    name="firstname"
                    className="input__text input--medium"
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

                <Input
                    id="lastname"
                    labelText="Achternaam:"
                    type="text"
                    name="lastname"
                    className="input__text input--medium"
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

                <Input
                    id="email"
                    labelText="Email:"
                    type="email"
                    name="emailadress"
                    className="input__text input--medium"
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

                <Input
                    id="password"
                    labelText="Wachtwoord:"
                    type="password"
                    name="password"
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

                {!succesRegister &&
                    <h3>Het registreren is niet gelukt. Stuur een mail naar e.vanduikeren@gmail.com</h3>}

                <p className="margin-bottom2">Als je registratie is gelukt, kom je op de pagina waarop je direct kan
                    inloggen.</p>


                <button
                    type="submit"
                    className="button--ellips margin-bottom2"
                >
                    registreren
                </button>
            </form>


            <div className="right-side">
                <img src={blackthorns} alt="blackthorns" className="photo margin-top1"/>
                <p className="photo-caption">Sleedoorn, &copy; <a
                    href="https://www.pexels.com/photo/bunch-of-ripe-blueberries-with-water-drops-5980178/">Alexandra
                    Patrusheva</a>
                </p>
            </div>
        </article>);
}

export default Register;