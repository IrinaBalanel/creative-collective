import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from "../../components/SideNav/SideNav";
export default function ConfirmDeleteUser(){

    const { id } = useParams();  // Get user ID from the URL params
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/admin/delete-user/${id}`);
                const data = response.data;
                console.log(data);
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
            const response = await axios.post(`http://localhost:8000/admin/delete-user/${id}/submit`);
            setMessage(response.data.message); 
            alert("User deleted successfully");
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
                <h1>Are you sure you want to delete {user.email}?</h1>
                <button onClick={handleDelete}>Confirm delete</button>
                <p style={{ color: "red" }}>{message}</p>
            </main>
            
        </>
    )
}
