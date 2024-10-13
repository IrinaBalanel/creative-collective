import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import SideNav from "../../components/SideNav/SideNav";
import AdminProfileButton from "../../components/AdminProfileButton";

export default function ConfirmBlockUser(){

    const { id } = useParams();
    const [user, setUser] = useState("");
    const [blockReason, setBlockReason] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/admin/block-user/${id}`,  { withCredentials: true });
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

    const handleBlock = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/block-user/${id}/submit`, {
                blockReason: blockReason,
            },  { withCredentials: true });
            setMessage(response.data.message); 
            // alert("User blocked successfully");

            //redirect back depeding on the role of the blocked user
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
                <div className="block-reason-area">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16" color="red">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                    </svg>
                    <h1>Are you sure you want to block {user.email}?</h1>
                    <p>Please provide the reason of blocking:</p>
                    <textarea className="txt-block-reason"
                        value={blockReason}
                        maxLength={255}
                        onChange={(e) => setBlockReason(e.target.value)}
                        placeholder="Enter the reason of blocking this user..."
                    />
                    <div className="btns block">
                        {/* //redirect back depeding on the role of the blocked user */}
                        {user.role == "provider" ? (
                            <Link to="/admin/management-providers" className="btn-link">Cancel</Link>
                        ) : user.role == "client" ? (
                            <Link to="/admin/management-clients" className="btn-link">Cancel</Link>
                        ) : <Link to="/admin/dashboard" className="btn-link">Cancel</Link>}
                        <button onClick={handleBlock}>Block</button>
                    </div>
                    <p style={{ color: "red" }}>{message}</p>
                </div>
            </main>
        </>
    )
}