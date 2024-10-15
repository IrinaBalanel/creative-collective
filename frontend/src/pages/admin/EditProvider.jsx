import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import SideNav from "../../components/SideNav/SideNav";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import AdminProfileButton from "../../components/AdminProfileButton";
import { isPhoneNumberValid} from '../../functions';
import { baseUrl } from "../../config";

export default function EditProvider(){
    const { id } = useParams();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        user_id: {
            email: ""
        }
    });

    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/update-provider/${id}`,  { withCredentials: true });
                const data = response.data;
                console.log(data);
                setUser({
                    first_name: response.data.first_name || "",
                    last_name: response.data.last_name || "",
                    phone_number: response.data.phone_number || "",
                    user_id: {
                        email: response.data.user_id.email || ""
                    },
                });
            } catch (error) {
                console.log(error);
                setError("Error fetching user data");
            }
        }
        getUsers();
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // If the name is "email", updates user_id object
        if (name === "email") {
            setUser((prevState) => ({
                ...prevState,
                user_id: {
                    ...prevState.user_id,
                    email: value  // updates the email inside user_id
                }
            }));
        } else {
            // else updates other fields normally
            setUser((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    const handlePhoneChange = (value) => {
        setUser((prevState) => ({
            ...prevState,
            phone_number: value  // updates phone_number field directly
        }));

    };
    console.log("Errors: ", errorMessages);
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages([]); //resets the errors array on submit

        let errors = [];

        if (!isPhoneNumberValid(user.phone_number)) {
            errors.push("Invalid phone number.");
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
            return; //doesn't submit form if there are any errors
        }



        const providerData = {
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
        };

        const userData = {
            email: user.user_id.email,
        };

        try {
            const response = await axios.post(`${baseUrl}/admin/update-provider/${id}/submit`, { providerData, userData },  { withCredentials: true });
            console.log(response.data);

            navigate("/admin/management-providers");

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
    }

    return(
        <div>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <h1 className="centered-header">Update Provider</h1>
                <form onSubmit={handleSubmit} className="form user">
                    {errorMessages.length > 0 && (
                        <ul style={{ color: "red" }}>
                            {errorMessages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    )}
                    <div className="input">
                        <input type="text" id="fName" placeholder="First Name" aria-label="First Name" name="first_name" value={user.first_name} onChange={handleChange} required/>
                        <input type="text" id="lName" placeholder="Last Name"  aria-label="Last Name" name="last_name" value={user.last_name} onChange={handleChange} required/>
                    </div>
                    <div className="input">
                        <input type="email" id="email" placeholder="Email" aria-label="Email" name="email" value={user.user_id.email} onChange={handleChange} required/>
                        <PhoneInput
                            id="phone"
                            aria-label="Phone"
                            placeholder="999-999-9999"
                            name="phone_number" value={user.phone_number} onChange={handlePhoneChange}
                            defaultCountry="CA"
                        />
                        
                    </div>
                    <div className="btns">
                        <Link to="/admin/management-providers" className="btn-link">Cancel</Link>
                        <button type="submit">Update</button>
                    </div>
                    
                </form>
            </main>
        </div>
    )

}