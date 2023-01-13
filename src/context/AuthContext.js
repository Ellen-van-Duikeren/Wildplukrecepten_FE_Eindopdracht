import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    function login(token) {
        console.log(token)
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        void fetchUserData(token, decodedToken.sub)
    }

    async function fetchUserData(token, id) {
        try {
            const response = await axios.get(`http://localhost:8081/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("Response user na inlog:")
            console.log(response);
            console.log(response.data.authorities);
            console.log(response.data.authorities[0].authority);
            setAuth({
                    isAuth: true,
                    user: {
                        firstname: response.data.firstname,
                        authority: response.data.authorities[0].authority
                        // authorities: {
                        //     authority: response.data.authorities[0].authority
                        // }
                    }
                }
            );

            navigate('/recipes');
        } catch (e) {
            console.error(e);
        }
    }

    function logout() {
        console.log("Gebruiker is uitgelogd!");
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null
        });
        navigate('/login');
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        // firstname: auth.user.firstname,
        // authority: auth.user.authority,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
