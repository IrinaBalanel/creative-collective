import Logout from "./Logout";
import ProfileButton from "./ProfileButton";
import {Link} from "react-router-dom"

export default function SideNav(){
    return(
        <div id="side-nav">
            <ProfileButton/>
            <div>
                <Link to="/admin/dashboard">Dashboard</Link>
            </div>
            <div>
                <Link to="/admin/management-clients">Client Management</Link>
            </div>
            <div>
                <Link to="/admin/management-providers">Provider Management</Link>
            </div>
            <Logout/>
        </div>
    )
        

}