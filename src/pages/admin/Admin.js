import React, {useEffect, useState} from 'react';
import './Admin.css';
import axios from "axios";

function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:8081/useraccounts");
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
                    <th>Id</th>
                    <th>Voornaam</th>
                    <th>Achternaam</th>
                    <th>Emailadres</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.emailadress}</td>
                    </tr>
                })}
                </tbody>
            </table>

        </div>
    );
}

export default Admin;