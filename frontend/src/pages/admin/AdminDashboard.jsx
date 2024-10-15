import SideNav from "../../components/SideNav/SideNav"
import AdminProfileButton from "../../components/AdminProfileButton";
import { useState, useContext, useEffect } from "react";
import {Link} from "react-router-dom"
import ProfileButton from "../../components/ProfileButton"
import { UserContext } from '../../context/UserContext';

export default function AdminDashboard(){
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>;
    }
    console.log("This is my user context ", user);
    return (
        <>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <div className="provider-dashboard">
                    <h1 className="dashboard-header-one" style={{textAlign:"center"}}>Admin Dashboard</h1>
                    <p style={{textAlign:"center", margin: "0 130px 30px"}}>Thanks for joining Creative Collective! Here, you can manage all your appointments, profile page, services, portfolio and client interactions in one convenient place.</p>
                    <div className="dashboard-items">
                        <div className="dashboard-item">
                            <h2><i aria-hidden="true" className="bi bi-1-circle"></i>Manage Clients and Providers</h2>
                            <p>Oversee client and provider accounts effortlessly. <strong>Create, update, delete, or block accounts as needed,</strong> ensuring efficient management and smooth platform operations directly from the dashboard.</p>
                            <div className="btns-manage">
                                <Link to="/admin/management-clients" className="btn-link">Clients</Link>
                                <Link to="/admin/management-providers" className="btn-link">Providers</Link>
                            </div>
                            
                        </div>
                        <div className="dashboard-item">
                            <h2><i aria-hidden="true" className="bi bi-2-circle"></i>Respond to Messages and Inquiries</h2>
                            <p>Manage messages and inquiries from guests and users directly through the dashboard. <strong>Address questions and concerns efficiently</strong> to maintain clear and responsive communication with your users.</p>
                            <Link to="/admin/form-messages" className="btn-link">Start Responding</Link>
                        </div>
                        <div className="dashboard-item">
                            <h2><i aria-hidden="true" className="bi bi-3-circle"></i>Verify Providers' Credentials</h2>
                            <p>Carefully <strong>check the validity and completeness of the providers' documents</strong>. Approve or reject, providing a reason for rejection to maintain transparency and integrity on Creative Collective.</p>
                            <Link to="/admin/provider-verification" className="btn-link">Start Verifying</Link>
                        </div>
                    </div>
                </div>
            </main>
            
            
        </>
        
        
    )
}