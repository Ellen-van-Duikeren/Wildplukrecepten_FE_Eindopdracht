import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_Decode from "jwt-decode";
import {fetchUser} from "../helperfunctions/axiosFunctions";
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
     const [auth, setAuth] = useState({
          isAuth: false,
          firstname: "",
          emailadress: "",
          role: ""
     });
     const navigate = useNavigate();

     function login(firstname, emailadress, role) {
          setAuth({isAuth: true, emailadress: emailadress, role: role});
          console.log("Gebruiker " + firstname + " is ingelogd met het emailadres: " + emailadress + " en heeft de rol: " + role + "!");
          navigate('/recipes');
     }

     function logout() {
          setAuth({isAuth: false, emailadress: "", role: ""});
          console.log("Gebruiker is uitgelogd!");
          navigate('/');
     }

     const data = {
          isAuth: auth.isAuth,
          emailadress: auth.emailadress,
          role: auth.role,
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
