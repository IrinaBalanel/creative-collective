import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import SideNav from "../../components/SideNav/SideNav";
import AdminProfileButton from "../../components/AdminProfileButton";

export default function ConfirmDeleteUser(){

    const { id } = useParams();
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/admin/delete-user/${id}`,  { withCredentials: true });
                const data = response.data;
                console.log("Fetched user: ", data);
                setUser(data);
            } catch (error) {
                console.log(error);
                setError("Error fetching data");
            }
        }
        getUser();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/delete-user/${id}/submit`,  { withCredentials: true });
            setMessage(response.data.message); 
            console.log("Deleted user: ", response.data.user);
            alert("User deleted successfully");
            
            //redirects back depeding on the role of the deleted user
            if(user.role==="client"){
                navigate("/admin/management-clients");
            }
            if(user.role==="provider"){
                navigate("/admin/management-providers");
            }
            
        } catch (error) {
            console.error("Error blocking user: ", error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An error occurred while blocking the user");
            }
        }
    };

    return (
        <>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <div className="confirm-delete">
                    <h1>Are you sure you want to delete {user.email}?</h1>
                    <div className="btns confirm-delete-btns">
                        {/* redirects back depeding on the role of the deleted user */}
                        {user.role == "provider" ? (
                            <Link to="/admin/management-providers">Cancel</Link>
                        ) : user.role == "client" ? (
                            <Link to="/admin/management-clients">Cancel</Link>
                        ) : <Link to="/admin/dashboard">Cancel</Link>}
                        <button onClick={handleDelete}>Confirm delete</button>
                    </div>
                    
                    <p style={{ color: "red" }}>{message}</p>
                </div>
                
            </main>
            
        </>
    )
}
