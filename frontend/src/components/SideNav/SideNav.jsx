import Logout from "../Logout";
import LogoWhite from "../LogoWhite";
import {Link} from "react-router-dom"
import {useContext} from "react";
import "./SideNav.css"
import { UserContext } from "../../context/UserContext";

export default function SideNav(){
    const { user } = useContext(UserContext);
    //console.log(user._id);
    return(
        <header>
            {!user || user.role === "client" ? (
                <Navigate to="/"/>
            ) : (
                <nav id="side-nav">
                    {user && user.role==="admin" && (
                        <>
                            <Link to="/admin/dashboard"><LogoWhite/></Link>
                            <div className="side-nav-item">
                                <Link to="/admin/dashboard"><i aria-hidden="true" className="bi bi-clipboard-data"></i>Dashboard</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to="/admin/management-clients"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Client Management</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to="/admin/management-providers"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Provider Management</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to="/admin/form-messages"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Messages & Inquiries</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to="/admin/provider-verification"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Provider Verification</Link>
                            </div>
                        </>
                    )}

                    {user && user.role==="provider" && (
                        <>
                            <Link to="/dashboard"><LogoWhite/></Link>
                            <div className="side-nav-item">
                                <Link to="/dashboard"><i aria-hidden="true" className="bi bi-clipboard-data"></i>Dashboard</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to={`/profile-customization/${user._id}`}><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Profile Customization</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to="/appointments"><i aria-hidden="true" className="bi bi-card-list"></i>Appointments</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to={`/verification/${user._id}`}><i aria-hidden="true" className="bi bi-card-list"></i>Credentials Verification</Link>
                            </div>
                            <div className="side-nav-item">
                                <Link to="/settings"><i aria-hidden="true" className="bi bi-gear-wide-connected"></i>Settings</Link>
                            </div>
                        </>
                    )}
                    <Logout/>
                    <div style={{color: "white", fontWeight: 400, fontSize: "0.8em", textAlign: "center", alignSelf:"center"}}><p>version 1.0</p></div>
                </nav>
            )}
            
            
        </header>

    )
        

}


{/* {user && user.role==="admin" ? (
    <>
        <Link to="/admin/dashboard"><LogoWhite/></Link>
        <div className="side-nav-item">
            <Link to="/admin/dashboard"><i aria-hidden="true" className="bi bi-clipboard-data"></i>Dashboard</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/admin/management-clients"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Client Management</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/admin/management-providers"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Provider Management</Link>
        </div>
    </>
) : (
    <>
        <Link to="/dashboard"><LogoWhite/></Link>
        <div className="side-nav-item">
            <Link to="/dashboard"><i aria-hidden="true" className="bi bi-clipboard-data"></i>Dashboard</Link>
        </div>
        <div className="side-nav-item">
            <Link to={`/profile-customization/${user._id}`}><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Profile Customization</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/appointments"><i aria-hidden="true" className="bi bi-card-list"></i>Appointments</Link>
        </div>
        <div className="side-nav-item">
            <Link to="/settings"><i aria-hidden="true" className="bi bi-gear-wide-connected"></i>Settings</Link>
        </div>
    </>
)} */}