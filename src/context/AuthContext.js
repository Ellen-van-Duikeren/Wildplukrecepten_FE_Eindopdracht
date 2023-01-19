import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            if (Math.floor(Date.now() / 1000) < decodedToken.exp) {
                console.log("De gebruiker is NOG STEEDS ingelogd.")
                void fetchUserData(storedToken, decodedToken.sub);
            }
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);


    function login(token) {
        console.log(token)
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        void fetchUserData(token, decodedToken.sub, "/recipes")
    }

    async function fetchUserData(token, id, redirect) {
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
                    },
                    status: "done"
                }
            );
            if (redirect) {
                navigate(redirect);
            }
        } catch (e) {
            console.error(e);
        }
    }

    function logout(e) {
        e.preventDefault();
        console.log("Gebruiker is uitgelogd!");
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        navigate('/login');
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
