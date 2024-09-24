import Logout from "../Logout";
import LogoWhite from "../LogoWhite";
import {Link} from "react-router-dom"
import "./SideNav.css"

export default function SideNav(){
    return(
        <header>
            <nav id="side-nav">
                <Link to="/admin/dashboard"><LogoWhite/></Link>
                <div className="side-nav-item">
                    <Link to="/admin/dashboard"><i className="bi bi-clipboard-data"></i>Dashboard</Link>
                </div>
                <div className="side-nav-item">
                    <Link to="/admin/management-clients"><i className="bi bi-person-lines-fill"></i>Client Management</Link>
                </div>
                <div className="side-nav-item">
                    <Link to="/admin/management-providers"><i className="bi bi-person-lines-fill"></i>Provider Management</Link>
                </div>
                <Logout/>
            </nav>
        </header>

    )
        

}