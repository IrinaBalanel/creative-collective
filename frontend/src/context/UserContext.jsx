import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const UserContext = createContext();
import { baseUrl } from '../config';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true); // explicitly track loading state
    const navigate = useNavigate();
    const login = (userData) => {
        setUser(userData);
        setLoading(false);
        console.log("User Context has been set after log in: ", user);
    };
    const logout = () => {
        if (user.role === "admin") {
            navigate("/admin/login");
            console.log("Admin logged out");
        } else if (user.role === "provider"){
            navigate("/login", { state: { fromProvider: true } });
            console.log("Provider logged out");
        } else if(user.role === "client"){
            navigate("/login");
            console.log("Client logged out");
        }
        setUser(null);
        setLoading(false);
        console.log("User Context has been set after log out: ", user);
    };
    
    // checks for the token and verifies it when page loads
    useEffect(() => {
        const verifyUserToken = async () => {
            try {
                const response = await axios.get(`${baseUrl}/auth/verify-token`, {
                    withCredentials: true 
                });
                if (response.data.user) {
                    setUser(response.data.user);
                    setLoading(false);
                    //console.log("User verified with context: ", response.data.user);
                } else{
                    console.log(response.data.message);
                    setUser(null);
                }
    
            } catch (error) {
                console.error("Token verification failed:", error);
                setUser(null); 

            } finally {
                setLoading(false);  // should always stop loading when the verification attempt completes
            }
        };
    
        verifyUserToken();
    }, []);

    // tracks the user state and outputs to the console when it changes
    useEffect(() => {
        console.log("User state has changed:", user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};