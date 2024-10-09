import {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import SideNav from "../../components/SideNav/SideNav";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import AdminProfileButton from "../../components/AdminProfileButton";
import "../public/Register.css" 
import { isPhoneNumberValid} from '../../functions';

export default function NewUser(){
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("client");
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages([]); //resets the errors array on submit

        let errors = [];

        let passRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!passRegEx.test(password) || !passRegEx.test(confirmPassword)){
            errors.push("Password should contain at least 8 characters, one letter, and one number.");
        }

        if(password !==confirmPassword){
            errors.push("Passwords don't match.");
        }

        if(!isPhoneNumberValid(phone)){
            errors.push("Invalid phone number.");
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
            return; //doesn't submit form if there are any errors
        }

        console.log(fName, lName, email, phone, password, role);

        try {
            const response = await axios.post('http://localhost:8000/admin/new-user/submit', {
                firstName: fName,
                lastName: lName, 
                email, 
                phone,
                password, 
                role
            },  { withCredentials: true });
            // console.log(response);
            const user = response.data.user; // the user object from the data object

            console.log("Registered user: ", user);

            // redirects to different home pages depending on the role
            if (user.role === "client") {
                navigate("/admin/management-clients");
                console.log("Success:", user);
            } else if (user.role === "provider") {
                navigate("/admin/management-providers");
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
        <>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <h1 className="centered-header">Create new user</h1>
                <form onSubmit={handleSubmit} className="form user">
                    {errorMessages.length > 0 && (
                        <ul style={{ color: "red" }}>
                            {errorMessages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    )}
                    <div className="btn-radio">
                        <label>
                            <input 
                                type="radio" 
                                id="client"
                                value="client"
                                checked={role === "client"}
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
                            }}
                            defaultCountry="CA"
                        />
                    </div>
                    <div className="input">
                        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                        <input type="password" id="password-confirm" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                    </div>
                    <div className="btns">
                        <Link to="/admin/management-clients" className="btn-link">Cancel</Link>
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
                
            </main>
            
        </>
    )

}