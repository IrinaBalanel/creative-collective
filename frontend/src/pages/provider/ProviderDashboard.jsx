import SideNav from "../../components/SideNav/SideNav";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import {Link} from "react-router-dom"
import ProfileButton from "../../components/ProfileButton"
import { UserContext } from '../../context/UserContext';
import "./ProviderDashboard.css"

export default function ProviderDashboard(){
    
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>;
    }
    console.log("This is my user context ", user);

    return (
        <>
            <SideNav/>
            <main className="main">
                <ProfileButton/>
                <div className="provider-dashboard">
                    <h1 className="dashboard-header-one" style={{textAlign:"center"}}>Welcome to Provider Dashboard!</h1>
                    <p style={{textAlign:"center", margin: "0 130px 30px"}}>Thanks for joining Creative Collective! Here, you can manage all your appointments, profile page, services, portfolio and client interactions in one convenient place.</p>
                    <div className="dashboard-items">
                        <div className="dashboard-item">
                            <h2><i aria-hidden="true" className="bi bi-1-circle"></i>Link Calendly Account</h2>
                            <p>Go to <strong>Calendly Account Settings - Integrations - API & Webhooks - Create Personal Access Token.</strong> Copy the token and enter it here. This lets us sync your booked appointments.</p>
                            <Link to={`/settings/${user._id}`} className="btn-link">Link Calendly</Link>
                        </div>
                        <div className="dashboard-item">
                            <h2><i aria-hidden="true" className="bi bi-2-circle"></i>Set Up Services</h2>
                            <p>Set up your profile, portfolio, and services. <strong>Create the same services on Calendly and ensure they match</strong> for a seamless booking experience for your future clients.</p>
                            <Link to={`/profile-customization/${user._id}`} className="btn-link">Customize Profile</Link>
                        </div>
                        <div className="dashboard-item">
                            <h2><i aria-hidden="true" className="bi bi-3-circle"></i>View Appointments</h2>
                            <p>To help you stay on schedule, <strong>we'll automatically display Your Upcoming Appointments</strong>. You'll see booked services, locations, and times, all synced from Calendly.</p>
                            <Link to={`/appointments/${user._id}`} className="btn-link">View Appointments</Link>
                        </div>
                    </div>
                </div>
            </main>


        </>
        
    )
}