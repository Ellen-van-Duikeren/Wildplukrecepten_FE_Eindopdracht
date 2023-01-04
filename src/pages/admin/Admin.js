import React, {useEffect, useState} from 'react';
import './Admin.css';
import axios from "axios";

// const API_URL = 'http://localhost:8081';

function Admin() {
    const [users, setUsers] = useState([]);

    // localstorage for aunthentication, nog dynamisch maken, nu hardcoded toegevoegd
    // const token = localStorage.getItem('token');
    // const authAxios = axios.create({
    //     bareUrl: API_URL,
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });

    // useEffect(() => {
    //     async function fetchUsers() {
    //         try {
    //             const response = await authAxios.get("/users");
    //             console.log(response.data);
    //             setUsers(response.data);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     fetchUsers();
    // }, [token])


    return (
        <article className="page admin-page">
            <h1>Admin pagina</h1>

            <section>
                <h2>Users</h2>
                <table className="users">
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Emailadres</th>
                        <th>Loginnaam</th>
                        <th>Password</th>
                        <th>Rol</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return <tr key={user.username}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.emailadress}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.authorities.authority}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </section>

            <section>
            <h2>Berichten versturen</h2>
            </section>

            <section>
                <h2>Ontvangen berichten</h2>
            </section>

        </article>
    );
}

export default Admin;