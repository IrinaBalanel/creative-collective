import {useState, useContext} from "react";
import {Link, useLocation} from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import LogoBlack from "../../components/LogoBlack";
import { baseUrl } from "../../config";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    const { login } = useContext(UserContext); 
    const location = useLocation(); // gets the current route location
    const isProvider = location.state?.fromProvider || false;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages([]); //resets the errors array on submit
        try {
            const response = await axios.post(`${baseUrl}/auth/login`, {email, password}, { withCredentials: true });
            
            if (response.data.errors) {
                setErrorMessages(response.data.errors);
                return;
            }
            
            const user = response.data.user;
            console.log(user.role);  
            
            login(user); // updates context with user data
            console.log("User Context after log in:", user);
            
            // redirects to different home pages depending on the role
            if (user.role === "client") {
                navigate("/");
                console.log("Success:", data);
            } else if (user.role === "provider") {
                navigate("/dashboard");
                console.log("Success:", data);
            }

        } catch (error) {
            //console.log(error)
            
            // backend errors 
            let backendErrors = [];
            
            if (error.response && error.response.data && error.response.data.errors) {
                backendErrors = error.response.data.errors;  // backend errors like user already exists
            } else {
                backendErrors.push("Something went wrong. Please try again.");
            }

            // display error messages
            setErrorMessages(backendErrors);
        }
    };

    return(
        <div id="login">
            <Link to="/"><LogoBlack/></Link>
            {/* Conditionally render the title */}
            {isProvider ? (
                <h1>Login to Provider Dashboard</h1>
            ) : (
                <h1>Login</h1>
            )}
            {errorMessages.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errorMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit} className="form">
                <div className="input">
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="input">
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <button type="submit">Login</button>
            </form>
            <div>
                {/* <Link to="/password-recovery">Forgot your password?</Link> */}
                <h2>Don't have an account yet?</h2>
                <Link to="/register">Create new account</Link>
            </div>
            
        </div>
    )

}