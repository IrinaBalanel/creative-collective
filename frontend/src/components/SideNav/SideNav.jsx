import Logout from "../Logout";
import LogoWhite from "../LogoWhite";
import {Link} from "react-router-dom"
import {useContext} from "react";
import "./SideNav.css"
import { UserContext } from "../../context/UserContext";

export default function SideNav(){
    const { user } = useContext(UserContext);
    //console.log(user.role);
    return(
        <header>
            <nav id="side-nav">
                {user && user.role==="admin" ? (
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
                            {/* <Link to={`/profile-customization/${user._id}`}><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Profile Customization</Link> */}
                            <Link to="/profile-customization"><i aria-hidden="true" className="bi bi-person-lines-fill"></i>Profile Customization</Link>
                        </div>
                    </>
                )}
                <Logout/>
            </nav>
        </header>

    )
        

}