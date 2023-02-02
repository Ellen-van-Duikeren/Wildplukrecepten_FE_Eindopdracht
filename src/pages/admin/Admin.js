import React, {useEffect, useRef, useState} from 'react';
import './Admin.css';
import axios from "axios";
import Input from "../../components/input/Input";
import {useForm} from "react-hook-form";
import {useReactToPrint} from "react-to-print";
import Button from "../../components/button/Button";
import {Link} from "react-router-dom";

function Admin() {
    const token = localStorage.getItem('token');

    //get users
    const [users, setUsers] = useState([]);

    //patch user
    const {register, handleSubmit: handleSubmit1, formState: {errors}} = useForm();
    const [patchThisUser, togglePatchThisUser] = useState(false);
    const [idOfUserToPatch, setIdOfUserToPatch] = useState("");

    // delete user
    const [deleteThisUser, toggleDeleteThisUser] = useState(false);
    const [idOfUserToDelete, setIdOfUserToDelete] = useState("");

    // print users
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //mail
    const {register: register2, formState: {errors: errors2}, handleSubmit: handleSubmit2} = useForm();
    const [idOfUserToEmail, setIdOfUserToEmail] = useState("");
    const [succesSendMail, toggleSuccesSendMail] = useState(false);


    // method to get an overview of all users
    useEffect(() => {
        const controller = new AbortController();
        async function fetchUsers() {
            toggleDeleteThisUser(false);
            togglePatchThisUser(false);
            try {
                const response = await axios.get('http://localhost:8081/users', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchUsers();
        return function cleanup() {
            controller.abort();
        }
    }, []);


    // methods to delete user
    function deleteUserFunction(e, usernameOfUser) {
        e.preventDefault();
        toggleDeleteThisUser(true);
        setIdOfUserToDelete(usernameOfUser);
    }

    useEffect(() => {
        const controller = new AbortController();
        async function deleteUser() {
            try {
                const response = await axios.delete(`http://localhost:8081/users/${idOfUserToDelete}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
            } catch (e) {
                console.error(e);
            }
        }

        void deleteUser();
        return function cleanup() {
            controller.abort();
        }
    }, [deleteThisUser])


    async function patchUser(data) {
        try {
            const response = await axios.patch(`http://localhost:8081/users/${idOfUserToPatch}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
            togglePatchThisUser(true);
        } catch (e) {
            console.error(e);
        }
    }


    // methods to send mail
    function emailUserFunction(data) {
        data.recipient = idOfUserToEmail;
        void sendMail(data);
    }


    async function sendMail(data) {
        try {
            const response = await axios.post('http://localhost:8081/sendMail', {
                data
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                toggleSuccesSendMail(true);
            }
            console.log("Response in sending email on adminpage")
            console.log(response);
            console.log(response.status);
        } catch (e) {
            console.error(e);
        }
    }


// return..............................................................................................................................................
    return (
        <article className="page admin-page">
            <h1>Admin pagina</h1>

            {/*users.................................................................................................*/}
            <section ref={componentRef}>
                <h2>Users</h2>
                <h3>Overzicht van users en mogelijkheid tot verwijderen van een user</h3>
                <table className="users">
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Emailadres / username</th>
                        <th>Rol</th>
                        <th>Verwijder</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.username}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.emailadress}</td>
                                <td>{user.authorities[0].authority}</td>
                                <td>
                                    <Button
                                        type="button"
                                        className="button--round button--round-brown"
                                        onClick={(e) => deleteUserFunction(e, user.username)}
                                    >
                                        -
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {deleteThisUser &&
                    <h4 className="attention">De user is succesvol verwijderd. Refresh deze pagina om het resultaat
                        te zien in de tabel hierboven.</h4>}


                {/*printing*/}
                <button onClick={handlePrint} className="button--ellips">print</button>
            </section>


            {/*change user*/}
            <section>
                <h3 className="margin-top2">Aanpassen van user</h3>
                <p className="margin-bottom1">Welke user wil je aanpassen?</p>
                <select
                    className="recipes__select"
                    onChange={e => setIdOfUserToPatch(e.currentTarget.value)}
                >
                    <option>selecteer een username</option>
                    {users.map(user => (
                        <option
                            key={user.username}
                            value={user.username}
                        >
                            {user.username}
                        </option>
                    ))}
                </select>


                <form
                    key={1}
                    className="margin-top2"
                    onSubmit={handleSubmit1(patchUser)}
                >
                    <Input
                        labelText="wachtwoord"
                        type="text"
                        name="password"
                        className="input__text"
                        register={register}
                        errors={errors}
                    />

                    <Input
                        labelText="voornaam"
                        type="text"
                        name="firstname"
                        className="input__text"
                        register={register}
                        errors={errors}
                    />

                    <Input
                        labelText="achternaam"
                        type="text"
                        name="lastname"
                        className="input__text"
                        register={register}
                        errors={errors}
                    />

                    <Input
                        labelText="emailadres"
                        type="email"
                        name="emailadress"
                        className="input__text"
                        register={register}
                        errors={errors}
                    />

                    <Button
                        type="submit"
                        className="button--ellips"
                    >
                        versturen
                    </Button>
                    {patchThisUser &&
                        <h4 className="attention margin-top1">De user is succesvol gewijzigd. Refresh deze pagina om het
                            resultaat te zien in de tabel hierboven, tenzij je het wachtwoord hebt gewijzigd.</h4>}

                </form>
            </section>


            <section>
                <h3 className="margin-top2">User toevoegen</h3>
                <p>Als je een user wilt toevoegen, dan kan je dit via de pagina <Link
                    to="/register">registreren</Link> doen.</p>
            </section>


            {/*mail..................................................................................................*/}
            <section>
                <h2 className="margin-top2">Bericht versturen</h2>
                <p className="margin-bottom2">Bericht versturen vanuit de frontend werkt (nog) niet; in de backend wel.
                    Ik krijg zowel een "Error while sending mail" en een Response.status 200. Ik kon geen hulp krijgen
                    bij het debuggen van deze errors omdat dit buiten de scope van de opleiding valt.</p>
                <form
                    key={2}
                    onSubmit={handleSubmit2(emailUserFunction)}
                >
                    <div className="margin-bottom2">
                        <label htmlFor="recipient">
                            Email naar:
                            <select
                                className="input__text label__select"
                                onChange={e => setIdOfUserToEmail(e.target.value)}
                            >
                                <option>selecteer een emailadres</option>
                                {users.map((user) => {
                                    return (
                                        <option
                                            key={user.username}

                                        >
                                            {user.emailadress}
                                        </option>
                                    )
                                })}
                            </select>
                        </label>
                    </div>

                    <Input
                        id="subject"
                        labelText="Onderwerp:"
                        type="text"
                        name="subject"
                        className="input__text"
                        placeholder="onderwerp"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }
                        }}
                        register={register2}
                        errors={errors2}
                    />
                    {errors2.subject && <p>{errors2.subject.message}</p>}


                    <div className="textarea__field">
                        <label htmlFor="textarea__text">
                            Bericht:
                            <textarea
                                className="textarea__text"
                                name="msgBody"
                                rows="4"
                                cols="55"
                                placeholder="typ hier je bericht"
                                {...register2("msgBody", {
                                    required: {
                                        maxLength: "500",
                                        message: 'Maximaal 500 karakters'
                                    }
                                })}
                                errors={errors2}
                            >
                        {errors2.msgBody && <p>{errors2.msgBody.message}</p>}
                            </textarea>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="button--ellips"
                    >
                        versturen
                    </button>

                    {succesSendMail && <h4 className="attention margin-top1"> Je mail is succesvol verzonden.</h4>}
                </form>
            </section>


        </article>
    )
        ;
}

export default Admin;