import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // check token in localStorage on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    
    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider}