import { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in the user
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token); // Store token if needed
    };

    // Function to log out the user
    // const logout = () => {
    //     setUser(null); // Clear user from context
    //     localStorage.removeItem("token"); // Clear token
    // };
    // Check for the token and verify it on page load
    useEffect(() => {
        const verifyUserToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auth/verify-token', {
                    withCredentials: true 
                });
                if (response.data.user) {
                    setUser(response.data.user);
                    console.log(response.data.user);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                // logout(); // if token verification fails, log out the user
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