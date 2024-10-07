import { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token); // stores token
        console.log("token", userData.token);
    };
    
    // checks for the token and verifies it when page loads
    useEffect(() => {
        const verifyUserToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auth/verify-token', {
                    withCredentials: true 
                });
                if (response.data.user) {
                    setUser(response.data.user);
                    console.log("User context: ", response.data.user);
                }
            } catch (error) {
                console.error("Token verification failed:", error);

            }
        };
    
        verifyUserToken();
    }, []);
    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    );
};