import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState, useContext} from "react";
// import { UserContext } from "../context/UserContext";

export default function Logout() {
    const navigate = useNavigate();
    // const { logout } = useContext(UserContext);

    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/logout', {}, { withCredentials: true });
            const user = response.data.user;
            if (user.role === "admin") {
                navigate("/admin/login");
                console.log("Admin logged out");
            } else if (user.role === "provider" || user.role === "client"){
                navigate('/login');
                console.log("User logged out");
            } else if(user.role === "client"){
                navigate('/');
                console.log("User logged out");
            }
            // logout();
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
