import SideNav from "../../components/SideNav/SideNav";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import {Link} from "react-router-dom"
import ProfileButton from "../../components/ProfileButton"
import { UserContext } from '../../context/UserContext';

export default function ProviderDashboard(){
    
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>;
    }
    console.log("This is my user context ", user);
    // const userId = user._id;
    // const [provider, setProvider] = useState({});

    // useEffect(() => {
    //     const getUserwithProvider = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8000/provider/dashboard/${userId}`, {
    //                 withCredentials: true 
    //             });
    //             if (response.data.provider) {
    //                 setProvider(response.data.provider);
    //                 console.log("User with provider info: ", response.data.provider);
    //             }
    //         } catch (error) {
    //             console.error("Token verification failed:", error);
    //             // logout(); // if token verification fails, log out the user
    //         }
    //     };
    //     if (userId) {
    //         getUserwithProvider();
    //     }
        
    // }, [userId]);

    return (
        <>
            <SideNav/>
            <main className="main">
                <ProfileButton/>
                <h1>Welcome to your Dashboard!</h1>
                <p>Thanks for joining Creative Collective! Here, you can manage all your appointments, profile page, services, portfolio and client interactions in one convenient place.</p>
                <h2>1. Link Your Calendly Account</h2>
                <p>Go to <strong>Calendly Account Settings - Integrations - API & Webhooks - Create Personal Access Token.</strong> Copy the token and enter it here. This lets us sync your availability. <Link to="/settings">Link Calendly now!</Link></p>
                <h2>2. Set Up Your Services</h2>
                <p>Set up your profile, portfolio, and services by adding key details like name, description, price, duration, and location. Make sure to create the same services on Calendly and ensure they match for a seamless booking experience. <Link to={`/profile-customization/${user._id}`}>Let's Customize!</Link></p>
                <h2>3. View Your Appointments</h2>
                <p>Your Upcoming Appointments will show here automatically. You'll see client names, booked services, and times, all synced with Calendly. <Link to="/appointments">View Upcoming Appointments.</Link></p>
            </main>


        </>
        
    )
}