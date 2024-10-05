import SideNav from "../../components/SideNav/SideNav";
import axios from "axios";
// import ProfileButton from "../../components/ProfileButton"

export default function ProviderDashboard(){

    // axios.defaults.withCredentials = true; //for token auth

    return (
        <>
            <SideNav/>
            <main className="main">
                {/* <ProfileButton
                    providerFName={providerData.first_name}
                    providerLName={providerData.last_name}
                    providerEmail={providerData.user_id.email}
                /> */}
                <h1>Provider Dashboard</h1>
            </main>


        </>
        
    )
}