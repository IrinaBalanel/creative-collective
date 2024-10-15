import {useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LogoBlack from "../../components/LogoBlack";
import { UserContext } from "../../context/UserContext";
import { baseUrl } from "../../config";

export default function AdminLogin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserContext); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/auth/admin-login`, {email, password}, { withCredentials: true }); //withCredentials ensures the cookie is sent with the request to catch it on backend
            
            const data = response.data;  // the whole data object
            const user = data.user;      // the user object from the data object
            console.log(user.role)

            login(user);
            
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
        <div id="login">
            <LogoBlack/>
            <h1>Admin Login</h1>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <form onSubmit={handleSubmit} className="form">
                <div className="input">
                    <input type="email" id="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="input">
                    <input type="password" id="password" placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <button type="submit">Login</button>
            </form>
            
        </div>
    )

}