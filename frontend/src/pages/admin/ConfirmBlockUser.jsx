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
            alert("User blocked successfully");

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
                <h1>Are you sure you want to block {user.email}?</h1>
                <div className="block-reason-area">
                    <p>Please provide the reason of blocking:</p>
                    <textarea className="txt-block-reason"
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                        placeholder="Enter the reason of blocking this user..."
                    />
                </div>
                <div className="btns block">
                    {/* //redirect back depeding on the role of the blocked user */}
                    {user.role == "provider" ? (
                        <Link to="/admin/management-providers">Cancel</Link>
                    ) : user.role == "client" ? (
                        <Link to="/admin/management-clients">Cancel</Link>
                    ) : <Link to="/admin/dashboard">Cancel</Link>}
                    <button onClick={handleBlock}>Confirm block</button>
                </div>
                <p style={{ color: "red" }}>{message}</p>
            </main>
            

        </>
    )
}