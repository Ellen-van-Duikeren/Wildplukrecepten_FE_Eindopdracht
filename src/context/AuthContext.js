import React from 'react';

export const AuthContext = React.createContext({});

function AuthContextProvider ({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: "",
        role: ""
    });
    const navigate = useNavigate();




    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        role: auth.role
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>);
}

export default AuthContextProvider;