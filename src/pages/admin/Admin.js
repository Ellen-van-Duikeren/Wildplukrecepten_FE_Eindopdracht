import React, {useEffect, useState} from 'react';
import './Admin.css';
import axios from "axios";

function Admin() {
    const [users, setUsers] = useState([]);

    // localstorage for aunthentication, nog dynamisch maken, nu hardcoded toegevoegd
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImV4cCI6MTY3MzA5ODk3NSwiaWF0IjoxNjcyMjM0OTc1fQ.3gj7aqwmo1Os_mATaOZr54yqZX_GKtbra7LSrOW8jJk');
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:8081/users",
                    {
                        "Authorization": {token}
                    });
                console.log(response.data);
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchUsers();
    }, [])


    return (
        <div className="administrator">
            <h1>Admin pagina</h1>
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
        </div>
    );
}

export default Admin;