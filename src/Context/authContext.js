import { createContext, useContext, useEffect, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setUser(JSON.parse(userData));  // Set user data if available
        }
        setLoading(false);  // Set loading state to false once the check is done
    }, []);

    const login = (userdata, token) => {
        console.log("Logged in with:", userdata, token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userdata));
        setUser(userdata); 
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ user, logout, login, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
