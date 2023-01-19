import React, {useEffect, useRef, useState} from 'react';
import './Admin.css';
import axios from "axios";
import Input from "../../components/input/Input";
import {useForm} from "react-hook-form";
import {useReactToPrint} from "react-to-print";
import Button from "../../components/button/Button";

function Admin() {
    const token = localStorage.getItem('token');

    //get users
    const [users, setUsers] = useState([]);

    //patch
    const {register, handleSubmit, formState: {errors}} = useForm();
    // const [selectedUsername, setSelectedUsername] = useState("");
    const [patchThisUser, togglePatchThisUser] = useState(false);
    const [userToPatch, setUserToPatch] = useState([]);
    const [idOfUserToPatch, setIdOfUserToPatch] = useState("");


    // delete
    const [deleteThisUser, toggleDeleteThisUser] = useState(false);
    const [idOfUserToDelete, setIdOfUserToDelete] = useState("");

    // print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //mail
    const {register: register2, formState: {errors: errors2}, handleSubmit: handleSubmit2} = useForm();
    const [succesSendMail, toggleSuccesSendMail] = useState(false);


    // method to get an overview of all users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8081/users', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchUsers();
    }, []);


    // method to delete user
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
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }

        void deleteUser();
        return function cleanup() {
            controller.abort();
        }
    }, [deleteThisUser])


    // method to change user
    // function patchUserFunction(e, data) {
    //     e.preventDefault();
    //     togglePatchThisUser(true);
    // }

    // test
    function handleFormSubmit(data) {
        console.log("Dit is de handleFormSubmit functie");
        console.log(data);
        // als ik de lijn hieronder aanzet, dan wordt de data gewist, want hierboven worden zel wel gelogd, r 99, maar hieronder niet: r 109
        togglePatchThisUser(true);
    }

    useEffect((data) => {
        const controller = new AbortController();
        console.log("Dit is de eerste regel van de axiospatch function")
        async function patchUser(data) {
            console.log("Data:");
            console.log(data);
            try {
                const response = await axios.patch(`http://localhost:8081/users/${idOfUserToPatch}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    });
                console.log("Patchuser: ");
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }
        void patchUser();
        return function cleanup() {
            controller.abort();
        }
    }, [patchThisUser])

    // method to send mail
    // useEffect(() => {
    //     async function sendMail(data) {
    //         console.log(data);
    //         try {
    //             const response = await axios.post('http://localhost:8081/sendMail', {
    //                 data
    //             }, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`,
    //                 }
    //             });
    //             console.log("Response: " + response.data);
    //             // console.log("Response.status: " + response.status);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     void sendMail();
    // }, [succesSendMail]);



// return..............................................................................................................................................
    return (
        <article className="page admin-page">
            <h1>Admin pagina</h1>

            {/*users..................................................................................................*/}
            <section ref={componentRef}>
                <h2>Users</h2>
                <h3>Overzicht en mogelijkheid tot verwijderen van user</h3>
                <table className="users">
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Emailadres</th>
                        <th>Rol</th>
                        <th>Verwijder</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return (
                            <>
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
                            </>
                        )
                    })}
                    </tbody>
                </table>
                {deleteThisUser &&
                    <h4 className="attention">De user is succesvol verwijderd. Refresh deze pagina om het resultaat te
                        zien in de tabel hierboven.</h4>}


                {/*printing*/}
                <button onClick={handlePrint} className="button--ellips print__button">print</button>
            </section>


            {/*change user*/}
            <section>
                <h3 className="margin-top2">Aanpassen van user</h3>
                <p>Welke user wil je aanpassen?</p>
                <select
                    className="recipes__select"
                    // onChange={(e) => setSelectedUsername(e.target.value)}
                    onChange={(e) => setIdOfUserToPatch(e.currentTarget.value)}
                >
                    <option>selecteer een emailadres</option>
                    {users.map(user => (
                        <option
                            key={user.username}
                            value={user.username}
                        >
                            {user.username}
                        </option>
                    ))}
                </select>

                {console.log("IdOfUserToPatch")}
                {console.log(idOfUserToPatch)}
                {/*{selectedUsername && <>*/}
                {/*    <Button*/}
                {/*        type="button"*/}
                {/*        className="button--ellips margin-left1"*/}
                {/*        onClick={() => setUserToPatch(users.find((user => user.username === selectedUsername)))}*/}
                {/*    >kies user*/}
                {/*    </Button>*/}
                {/*</>*/}
                {/*}*/}


                {/*{idOfUserToPatch.length > 0 &&*/}
                {/*    setUserToPatch(users.find((user => user.username === idOfUserToPatch)))*/}
                {/*}*/}


                {/*{console.log("userToPatch")}*/}
                {/*{console.log(userToPatch)}*/}


                {/*//Edhub*/}
            {/*    function App() {*/}
            {/*    const { register, handleSubmit } = useForm();*/}

            {/*    function handleFormSubmit(data) {*/}
            {/*    console.log(data);*/}
            {/*}*/}

            {/*    return (*/}
            {/*    <form onSubmit={handleSubmit(handleFormSubmit)}>*/}
            {/*/!* input velden... *!/*/}
            {/*    </form>*/}
            {/*    )*/}
            {/*}*/}

                <form
                    key={1}
                    className="margin-top2"
                    // onSubmit={handleSubmit((e) => patchUserFunction(e))}>
                    // onSubmit={handleSubmit(() => togglePatchThisUser(true))}>
                    onSubmit={handleSubmit(handleFormSubmit)}>
                        <Input
                        labelText="password"
                        type="text"
                        name="password"
                        className="input__text"
                        // placeholder={userToPatch.password}
                        register={register}
                        errors={errors}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <Input
                        labelText="firstname"
                        type="text"
                        name="firstname"
                        className="input__text"
                        // placeholder={userToPatch.firstname}
                        register={register}
                        errors={errors}
                    />
                    {errors.firstname && <p>{errors.firstname.message}</p>}

                    <Input
                        labelText="lastname"
                        type="text"
                        name="lastname"
                        className="input__text"
                        // placeholder={userToPatch.lastname}
                        register={register}
                        errors={errors}
                    />
                    {errors.lastname && <p>{errors.lastname.message}</p>}

                    <Input
                        labelText="emailadress"
                        type="email"
                        name="emailadress"
                        className="input__text"
                        // placeholder={userToPatch.emailadress}
                        register={register}
                        errors={errors}
                    />
                    {errors.emailadress && <p>{errors.emailadress.message}</p>}

                    <Button type="submit" className="button--ellips">versturen</Button>
                    {patchThisUser && <h3>De user is succesvol gewijzigd.</h3>}
                </form>
            </section>


            {/*mail..................................................................................................*/}
            {/*<section>*/}
            {/*    <h2 className="h2__margin">Bericht versturen</h2>*/}
            {/*    <form key={2} onSubmit={() => toggleSuccesSendMail(!succesSendMail)}>*/}
            {/*        <div className="recipient__div">*/}
            {/*            <label htmlFor="recipient">*/}
            {/*                Email naar:*/}
            {/*                <select className="input__text label__select"*/}
            {/*                >*/}
            {/*                    <option>selecteer een emailadres</option>*/}
            {/*                    {users.map((user) => {*/}
            {/*                        return (*/}
            {/*                            <option*/}
            {/*                                key={user.username}*/}
            {/*                                // name="recipient"*/}
            {/*                                {...register2("recipient", {*/}
            {/*                                    required: {*/}
            {/*                                        value: true,*/}
            {/*                                        message: 'Dit veld is verplicht',*/}
            {/*                                    }*/}
            {/*                                })}*/}
            {/*                            >*/}
            {/*                                {errors2.recipient && <p>{errors2.recipient.message}</p>}*/}

            {/*                                {user.emailadress}*/}
            {/*                            </option>*/}
            {/*                        )*/}
            {/*                    })}*/}
            {/*                </select>*/}
            {/*            </label>*/}
            {/*        </div>*/}

            {/*        <Input*/}
            {/*            id="subject"*/}
            {/*            labelText="Onderwerp:"*/}
            {/*            type="text"*/}
            {/*            name="subject"*/}
            {/*            className="input__text"*/}
            {/*            placeholder="onderwerp"*/}
            {/*            validationRules={{*/}
            {/*                required: {*/}
            {/*                    value: true,*/}
            {/*                    message: 'Dit veld is verplicht',*/}
            {/*                }*/}
            {/*            }}*/}
            {/*            register={register2}*/}
            {/*            errors={errors2}*/}
            {/*        />*/}
            {/*        {errors2.subject && <p>{errors2.subject.message}</p>}*/}


            {/*        <div className="textarea__field">*/}
            {/*            <label htmlFor="textarea__text">*/}
            {/*                Bericht*/}
            {/*                <textarea*/}
            {/*                    className="textarea__text"*/}
            {/*                    name="msgBody"*/}
            {/*                    rows="4"*/}
            {/*                    cols="55"*/}
            {/*                    placeholder="typ hier je bericht"*/}
            {/*                    {...register2("msgBody", {*/}
            {/*                        required: {*/}
            {/*                            maxLength: "500",*/}
            {/*                            message: 'Maximaal 500 karakters'*/}
            {/*                        }*/}
            {/*                    })}*/}
            {/*                    errors={errors2}*/}
            {/*                >*/}
            {/*            {errors2.msgBody && <p>{errors2.msgBody.message}</p>}*/}
            {/*                </textarea>*/}
            {/*            </label>*/}
            {/*        </div>*/}

            {/*        <button*/}
            {/*            type="submit"*/}
            {/*            className="button--ellips"*/}
            {/*        >*/}
            {/*            versturen*/}
            {/*        </button>*/}

            {/*        {succesSendMail && <h3>Je mail is succesvol verzonden.</h3>}*/}
            {/*    </form>*/}
            {/*</section>*/}


        </article>
    )
        ;
}

export default Admin;