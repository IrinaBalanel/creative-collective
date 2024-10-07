import SideNav from "../../components/SideNav/SideNav"
import AdminProfileButton from "../../components/AdminProfileButton";

export default function AdminDashboard(){

    return (
        <>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <h1>Admin Dashboard</h1>
            </main>
            
            
        </>
        
        
    )
}