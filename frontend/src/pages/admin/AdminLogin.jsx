import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true; //for token auth

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/admin-login', {email, password}, { withCredentials: true }); //withCredentials ensures the cookie is sent with the request to catch it on backend
            
            const data = response.data;  // the whole data object
            const user = data.user;      // the user object from the data object
            //OR { user } = response.data; // which is one object named user from the response of the data object
            //console.log(user)
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                setErrorMessage("Unauthorized access.");
            }
        } catch (error) {
            setErrorMessage("Invalid email or password");
        }
    };

    return(
        <div>
            <h1>Admin Login</h1>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <button type="submit">Login</button>
            </form>
            
        </div>
    )

}