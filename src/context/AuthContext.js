import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_Decode from "jwt-decode";
import {fetchUser} from "../helperfunctions/axiosFunctions";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);
    const [userState, setUserState] = useState({user: null, status: "pending"});
    const navigate = useNavigate();

    async function fetchUserData(token) {
        const decoded = jwt_Decode(token);
        const username = decoded.sub;
        try {
            const result = await fetchUser(username)
            console.log(result)
            const data = result.data;
            // delete data['password'];
            setUserState({
                user: data,
                status: "done",
            });
        } catch (e) {
            console.error(e)
        }
        setIsLoading(false);
    }
    //
    // useEffect(() => {
    //     let mounted = true;
    //     const token = localStorage.getItem('token')
    //     if (token !== null && userState.user === null) {
    //         if (mounted) {
    //             fetchUserData(token);
    //         }
    //     } else {
    //         setUserState({
    //             user: null,
    //             status: "done"
    //         });
    //     }
    //     return () => (mounted = false);
    // }, []);
    //
    async function loginFunction(token) {
        localStorage.setItem('token', token);
        await fetchUserData(token);
        navigate("/recipes");
    }

    function logoutFunction() {
        localStorage.clear();
        setUserState({user: null, status: "done"});
        navigate("/");
    }

    const data = {
        ...userState,
        login: loginFunction,
        logout: logoutFunction,
        isLoading
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;