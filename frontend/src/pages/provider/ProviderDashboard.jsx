import SideNav from "../../components/SideNav/SideNav";
import axios from "axios";

export default function ProviderDashboard(){

    // axios.defaults.withCredentials = true; //for token auth

    return (
        <>
            <SideNav/>
            <main className="main">
                <h1>Provider Dashboard</h1>
            </main>


        </>
        
    )
}