import React, {useEffect, useRef, useState} from 'react';
import './Admin.css';
import {API_URL, authAxios} from "../../helperfunctions/axiosFunctions";
import axios from "axios";
import Input from "../../components/input/Input";
import {useForm} from "react-hook-form";
import {useReactToPrint} from "react-to-print";
import sortObject from "../../helperfunctions/sortObjects";


function Admin() {
    const [users, setUsers] = useState([]);
    const {handleSubmit, formState: {errors}, register} = useForm();
    const token = localStorage.getItem('token');

    // printing
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
                sortObject(response.data, 'username')
                console.log(response.data);
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchUsers();
    }, [])

    //method to send mail to user
    async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post('http://localhost:8081/sendMail', {
                data
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log("Result: " + result.data);
            console.log("Result.status: " + result.status);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <article className="page admin-page">
            <h1>Admin pagina</h1>


            <section ref={componentRef}>
                <h2>Users</h2>
                <table className="users">
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Emailadres</th>
                        <th>Rol</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return <tr key={user.username}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.emailadress}</td>
                            <td>{user.authorities[0].authority}</td>
                        </tr>
                    })}
                    </tbody>
                </table>

                {/*printing*/}
                <button onClick={handlePrint} className="button--ellips print__button">print</button>

            </section>

            <section>
                <h2 className="h2__margin">Bericht versturen</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*<Input*/}
                    {/*    id="recipient"*/}
                    {/*    labelText="Email naar:"*/}
                    {/*    type="email"*/}
                    {/*    name="recipient"*/}
                    {/*    className="input__text"*/}
                    {/*    placeholder="emailadres"*/}
                    {/*    validationRules={{*/}
                    {/*        required: {*/}
                    {/*            value: true,*/}
                    {/*            message: 'Dit veld is verplicht',*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    register={register}*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}
                    {/*{errors.recipient && <p>{errors.recipient.message}</p>}*/}

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