import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import LogoBlack from "../../components/LogoBlack";
import "./Register.css" 

export default function Register(){
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("client");
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true; //for token auth

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages([]); //resets the errors array on submit if there is no more errors

        let errors = [];

        // var phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        // if(!phoneRegEx.test(phone)){
        //     errors.push("Please, provide a valid phone number");
        // }

        var passRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!passRegEx.test(password) || !passRegEx.test(confirmPassword)){
            errors.push("Password should contain at least 8 characters, one letter, and one number.");
        }

        if(password !==confirmPassword){
            errors.push("Passwords don't match.");
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
            return; //doesn't submit form if there are any errors
        }

        console.log(fName, lName, email, phone, password, role);

        try {
            const response = await axios.post('http://localhost:8000/auth/register', {
                firstName: fName,
                lastName: lName, 
                email, 
                phone,
                password, 
                role
            }, { withCredentials: true });
            const user = response.data.user; // the user object from the data object
            //OR { user } = response.data; // which is one object named user from the response of the data object
            console.log("Registered user: ", user);

            // redirects to different home pages depending on the role
            if (user.role === "client") {
                navigate("/home");
                console.log("Success:", user);
            } else if (user.role === "provider") {
                navigate("/dashboard");
                console.log("Success:", user);
            } 

        } catch (error) {
            let backendErrors = [];
            // console.log(backendErrors);

            // backend errors like user already exists
            if (error.response && error.response.data && error.response.data.errors) {
                backendErrors.push(error.response.data.errors);
            } else {
                backendErrors.push("Something went wrong. Please try again.");
            }

            // display all error messages
            setErrorMessages([...errors, ...backendErrors]);
        }
    };

    return(
        <div id="register">
            <LogoBlack/>
            <h1>Register new account</h1>
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
                    <input type="text" id="fName" placeholder="First Name" value={fName} onChange={(e) => setFName(e.target.value)} required></input>
                    <input type="text" id="lName" placeholder="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} required></input>
                </div>
                <div className="input">
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    <PhoneInput
                        id="phone"
                        placeholder="999-999-9999"
                        value={phone}
                        onChange={(value) => {
                            setPhone(value);
                            // handleInputChange();
                        }}
                        // international
                        defaultCountry="CA"
                    />
                </div>
                
                <div className="input">
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                    <input type="password" id="password-confirm" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                </div>
                <div className="btn-radio">
                    <label>
                        <input 
                            type="radio" 
                            id="client"
                            value="client"
                            checked={role === "client"}  // Radio button is checked if the role is "client" 
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Client
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            id="provider" 
                            value="provider"
                            checked={role === "provider"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Provider
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )

}