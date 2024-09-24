import {useState} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import LogoBlack from "../../components/LogoBlack";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true; //for token auth

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages([]); //resets the errors array on submit if there is no more errors
        
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {email, password}, { withCredentials: true });
            
            if (response.data.errors) {
                setErrorMessages(response.data.errors);
                return;
            }
            
            const user = response.data.user;
            console.log(user);  
            
            // redirects to different home pages depending on the role
            if (user.role === "client") {
                navigate("/home");
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
            <LogoBlack/>
            <h1>Login</h1>
            {/* <p style={{ color: "red" }}>{errorMessage}</p> */}
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
                <Link to="/password-recovery">Forgot your password?</Link>
                <h2>Don't have an account yet?</h2>
                <Link to="/register">Create new account</Link>
            </div>
        </div>
    )

}