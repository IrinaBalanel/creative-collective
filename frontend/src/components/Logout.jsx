import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useContext} from "react";
import { UserContext } from "../context/UserContext";

export default function Logout() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/logout', {}, { withCredentials: true });
            const loggedOutuser = response.data.user;
            
            logout();
            console.log("User Context after log in:", user);
            
            if (loggedOutuser.role === "admin") {
                navigate("/admin/login");
                console.log("Admin logged out");
            } else if (loggedOutuser.role === "provider"){
                navigate('/login', { state: { fromProvider: true } });
                console.log("Provider logged out");
            } else if(loggedOutuser.role === "client"){
                navigate('/login');
                console.log("Client logged out");
            }
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Error logging out');
        }
    };  

    return (
        <div id="logout">
            <button onClick={handleLogout}>Logout</button>
            {error && <p>{error}</p>}
        </div>
        
    );
}
