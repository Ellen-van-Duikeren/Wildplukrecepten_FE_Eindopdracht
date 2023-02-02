import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();


    useEffect(() => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // when token then fetchUserData
                const decodedToken = jwtDecode(storedToken)
                if (Math.floor(Date.now() / 1000) < decodedToken.exp) {
                    void fetchUserData(storedToken, decodedToken.sub);
                }
            } else {
                // when no token set status done and render app
                setAuth({
                    ...auth,
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        }, []
    );


    function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        void fetchUserData(token, decodedToken.sub, "/recipes");
    }


    async function fetchUserData(token, id, redirect) {
        try {
            const response = await axios.get(`http://localhost:8081/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    firstname: response.data.firstname,
                    authority: response.data.authorities[0].authority
                },
                status: "done"
            });
            // if someone refreshes the page, other than profile page, the page will refresh on the same page
            if (redirect) {
                navigate(redirect);
            }
        } catch (e) {
            console.error(e);
            setAuth({
                ...auth,
                status: "done",
            })
        }
    }


    function logout() {
        localStorage.removeItem("token");
        navigate('/login');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        });
    }


    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
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
