import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from "../../components/SideNav";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function EditProvider(){
    const { id } = useParams();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        user_id: {
            email: ''
        }
    });

    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/admin/update-provider/${id}`);
                const data = response.data;
                console.log(data);
                setUser({
                    first_name: response.data.first_name || '',
                    last_name: response.data.last_name || '',
                    phone_number: response.data.phone_number || '',
                    user_id: {
                        email: response.data.user_id.email || ''
                    },
                });
            } catch (error) {
                console.log(error);
                setError('Error fetching user data');
            }
        }
        getUsers();
    }, [id]);
    


    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // If the name is "email", update the nested user_id object
        if (name === "email") {
            setUser((prevState) => ({
                ...prevState,
                user_id: {
                    ...prevState.user_id,
                    email: value  // Update the email inside user_id
                }
            }));
        } else {
            // Otherwise, update other fields normally
            setUser((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    


    // Separate handler for phone input
    const handlePhoneChange = (value) => {
        setUser((prevState) => ({
            ...prevState,
            phone_number: value  // Update phone_number field directly
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages([]); //resets the errors array on submit if there is no more errors

        let errors = [];

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
            const response = await axios.post(`http://localhost:8000/admin/update-provider/${id}/submit`, { providerData, userData });
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
            <h1>Update Provider</h1>
            {/* <p style={{ color: "red" }}>{errorMessage}</p> */}
            {errorMessages.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errorMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="fName" placeholder="First Name" name="first_name" value={user.first_name} onChange={handleChange} required/>
                    <input type="text" id="lName" placeholder="Last Name"  name="last_name" value={user.last_name} onChange={handleChange} required/>
                </div>
                <div>
                    <input type="email" id="email" placeholder="Email" name="email" value={user.user_id.email} onChange={handleChange} required/>
                    <div id="phone-input">
                        <PhoneInput
                            id="phone"
                            placeholder="999-999-9999"
                            name="phone_number" value={user.phone_number} onChange={handlePhoneChange}
                            defaultCountry="CA"
                        />
                    </div>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )

}