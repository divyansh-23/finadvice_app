import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [userType, setUserType] = useState(null)
    const login = user => {
        setUser(user);
        setUserType(user['user']['role']);
    }

    const logout = () => {
        setUser(null);
        setUserType(null);
    }
    return <AuthContext.Provider value={ {user, userType, login, logout}} >
                {children}
            </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}