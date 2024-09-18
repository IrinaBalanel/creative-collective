
import Logout from "../../components/Logout";
import axios from "axios";
export default function ProviderDashboard(){

    axios.defaults.withCredentials = true; //for token auth

    return (
        <div>
            <h1>Provider Dashboard</h1>
            <Logout/>

        </div>
        
    )
}