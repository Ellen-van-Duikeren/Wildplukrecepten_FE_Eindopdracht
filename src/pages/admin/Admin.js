import React, {useEffect, useRef, useState} from 'react';
import './Admin.css';
import {API_URL, authAxios, fetchUser} from "../../helperfunctions/axiosFunctions";
import axios from "axios";
import Input from "../../components/input/Input";
import {useForm} from "react-hook-form";
import {useReactToPrint} from "react-to-print";
import Button from "../../components/button/Button";


function Admin() {
    const token = localStorage.getItem('token');
    const [idRecipe, setIdRecipe] = useState(1);
    const [recipes, setRecipes] = useState([]);
    //get
    const [users, setUsers] = useState([]);
    const [getThisUser, toggleGetThisUser] = useState(false);
    //patch
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [selectedUsername, setSelectedUsername] = useState("");
    const [patchThisUser, togglePatchThisUser] = useState(false);
    const [userToPatch, setUserToPatch] = useState([]);
    // delete
    const [deleteThisUser, toggleDeleteThisUser] = useState(false);
    // print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    {/*method to get an overview of all users..................................................................................*/
    }

    useEffect(() => {
        async function fetchUsers() {
            toggleGetThisUser(false)
            togglePatchThisUser(false);
            toggleDeleteThisUser(false);
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

        fetchUsers();
    }, [])


    async function getUserById(id) {
        try {
            const response = await axios.get(`http://localhost:8081/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            console.log(response)
            setUserToPatch(response);
            toggleGetThisUser(true);
        } catch (e) {
            console.error(e);
        }
    }
    if (getThisUser) {
        void getUserById();
    }


    async function patchUser(id, data) {
        console.log("Data:");
        console.log(data);
        try {
            const response = await axios.put(`http://localhost:8081/users/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            togglePatchThisUser(true);
        } catch (e) {
            console.error(e);
        }
    }

    if (patchThisUser) {
        void patchUser();
    }


    async function deleteUser(id) {
        try {
            const response = await axios.delete(`http://localhost:8081/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(response);
            toggleDeleteThisUser(true);
        } catch (e) {
            console.error(e);
        }
    }

    if (deleteThisUser) {
        void deleteUser();
    }


    // method to send mail...........................................................................................
    async function onSubmit(data) {

        console.log(data);
        try {
            const response = await axios.post('http://localhost:8081/sendMail', {
                data
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log("Response: " + response.data);
            console.log("Response.status: " + response.status);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <article className="page admin-page">
            <h1>Admin pagina</h1>

            {/*users..................................................................................................*/}
            <section ref={componentRef}>
                <h2>Users</h2>
                <h3>Overzicht alle users en mogelijkheid tot verwijderen van user</h3>
                <table className="users">
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Emailadres</th>
                        <th>Rol</th>
                        <th>Verwijder</th>
                        <th>Aanpassen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return <tr key={user.username}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.emailadress}</td>
                            <td>{user.authorities[0].authority}</td>
                            <td>
                                <Button
                                    type="button"
                                    className="button--round button--round-brown"
                                    onClick={() => deleteUser(user.username)}
                                >
                                    -
                                </Button>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    className="button--ellips button--ellips-brown"
                                    onClick={() => getUserById(user.username)}
                                >
                                    pas aan
                                </Button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
                {deleteThisUser && <h4 className="attention">De user is succesvol verwijderd</h4>}

                {/*printing*/}
                <button onClick={handlePrint} className="button--ellips print__button">print</button>

                {/*<h3 className="margin-top2">Aanpassen van user</h3>*/}
                {/*<p>Welke user wil je aanpassen?</p>*/}
                {/*<select*/}
                {/*    className="recipes__select"*/}
                {/*    value={selectedUsername}*/}
                {/*    onChange={(e) => setSelectedUsername(e.currentTarget.value)}>*/}
                {/*    {users.map(user => (*/}
                {/*        <option*/}
                {/*            key={user.value}*/}
                {/*            value={user.value}*/}
                {/*        >*/}
                {/*            {user.username}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}

                {/*{console.log("Selected user: ")}*/}
                {/*{console.log(selectedUsername)}*/}

                {/*<Button*/}
                {/*    type="button"*/}
                {/*    className="button--ellips margin-left1"*/}
                {/*    // onClick={() => getUserById()}*/}
                {/*    onClick={() => setUserToPatch(users.filter(user => users.username == {selectedUsername}))}*/}
                {/*>kies user*/}
                {/*</Button>*/}


                <form onSubmit={handleSubmit(patchUser)} className="margin-top2">
                    <Input
                        labelText="username"
                        type="text"
                        name="username"
                        className="input__text"
                        placeholder={getThisUser.username}
                        register={register}
                        errors={errors}
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <Input
                        labelText="password"
                        type="text"
                        name="password"
                        className="input__text"
                        placeholder={getThisUser.password}
                        register={register}
                        errors={errors}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <Input
                        labelText="enabled"
                        type="text"
                        name="enabled"
                        className="input__text"
                        placeholder={getThisUser.enabled}
                        register={register}
                        errors={errors}
                    />
                    {errors.enabled && <p>{errors.enabled.message}</p>}

                    <Input
                        labelText="apiKey"
                        type="text"
                        name="apiKey"
                        className="input__text"
                        placeholder={getThisUser.apiKey}
                        register={register}
                        errors={errors}
                    />
                    {errors.apiKey && <p>{errors.apiKey.message}</p>}

                    <Input
                        labelText="firstname"
                        type="text"
                        name="firstname"
                        className="input__text"
                        placeholder={getThisUser.firstname}
                        register={register}
                        errors={errors}
                    />
                    {errors.firstname && <p>{errors.firstname.message}</p>}

                    <Input
                        labelText="lastname"
                        type="text"
                        name="lastname"
                        className="input__text"
                        placeholder={getThisUser.lastname}
                        register={register}
                        errors={errors}
                    />
                    {errors.lastname && <p>{errors.lastname.message}</p>}

                    <Input
                        labelText="emailadress"
                        type="text"
                        name="emailadress"
                        className="input__text"
                        placeholder={getThisUser.emailadress}
                        register={register}
                        errors={errors}
                    />
                    {errors.emailadress && <p>{errors.emailadress.message}</p>}

                    <Button type="submit" className="button--ellips">versturen</Button>
                    {togglePatchThisUser && <h3>De user is succesvol gewijzigd.</h3>}

                </form>


            </section>


            {/*recipes..................................................................................................*/}

            {/*<h2 className="admin__h2">*/}
            {/*    Recipes*/}
            {/*</h2>*/}

            {/*<table className="users">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>id</th>*/}
            {/*        <th>Titel</th>*/}

            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {recipes.map((recipe) => {*/}
            {/*        return <tr key={recipe.id}>*/}
            {/*            <td>{recipe.id}</td>*/}
            {/*            <td>{recipe.title}</td>*/}
            {/*        </tr>*/}
            {/*    })}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            {/*<h3>Zoek recipe op id</h3>*/}
            {/*Welk recept wil je opvragen. Typ het id in.*/}
            {/*<input*/}
            {/*    type="number"*/}
            {/*    value={idRecipe}*/}
            {/*    onChange={(e) => setIdRecipe(e.target.value)}*/}
            {/*/>*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    onClick={() => fetchRecipeById()}*/}
            {/*>Vraag recept op*/}
            {/*</button>*/}

            {/*email..................................................................................................*/}
            <section>
                <h2 className="h2__margin">Bericht versturen</h2>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="recipient__div">
                        <label htmlFor="recipient">
                            Email naar:
                            <select id="recipient" className="input__text label__select">
                                {users.map((user) => {
                                    return (
                                        <option
                                            value="email"
                                            key={user.lastname}
                                            name="recipient"
                                            {...register("recipient", {
                                                required: {
                                                    value: true,
                                                    message: 'Dit veld is verplicht',
                                                }
                                            })}
                                        >
                                            {errors.recipient && <p>{errors.recipient.message}</p>}

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
                        register={register}
                        errors={errors}
                    />
                    {errors.subject && <p>{errors.subject.message}</p>}


                    <div className="textarea__field">
                        <label htmlFor="textarea__text">
                            Bericht
                            <textarea
                                className="textarea__text"
                                name="msgBody"
                                rows="4"
                                cols="55"
                                placeholder="typ hier je bericht"
                                {...register("msgBody", {
                                    required: {
                                        maxLength: "500",
                                        message: 'Maximaal 500 karakters'
                                    }
                                })}
                            >
                        {errors.msgBody && <p>{errors.msgBody.message}</p>}
                            </textarea>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="button--ellips"
                    >
                        versturen
                    </button>
                </form>
            </section>


        </article>
    )
        ;
}

export default Admin;