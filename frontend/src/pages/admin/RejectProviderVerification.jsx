import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams, Link, UNSAFE_DataRouterStateContext } from 'react-router-dom';
import SideNav from "../../components/SideNav/SideNav";
import AdminProfileButton from "../../components/AdminProfileButton";

export default function RejectProviderVerification(){

    const { provider_id, credential_id} = useParams();
    const [credential, setCredential] = useState({});
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    // const [message, setMessage] = useState("");
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/admin/provider-verification/reject-credential/${credential_id}`, { withCredentials: true });
                const data = response.data;
                setCredential(data);
                console.log("Credential to reject", data);
                
            } catch (error) {
                console.log(error);
                // setError("Error fetching data");
            }
        }
        getUser();
    }, [credential_id]);
    
    const handleReject = async (provider_id, credential_id) => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/provider-verification/${provider_id}/reject-credential/${credential_id}/submit`, {feedback},  { withCredentials: true });
            
            console.log(response)
            navigate("/admin/provider-verification");
            // setMessage(response.data.message); 
            // alert("User blocked successfully");

            // //redirect back depeding on the role of the blocked user
            // if(user.role==="client"){
            //     navigate("/admin/management-clients");
            // }
            // if(user.role==="provider"){
            //     navigate("/admin/management-providers");
            // }
        } catch (error) {
            console.error("Error ", error);
            // if (error.response && error.response.data) {
            //     setMessage(error.response.data.message);
            // } else {
            //     setMessage("An error occurred while blocking the user");
            // }
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
                    {/* <h1>Do you want to reject credentials of {credential.provider_id.first_name} {credential.provider_id.last_name}?</h1> */}
                    {credential.provider_id ? ( // Check if provider_id exists
                        <h1>Do you want to reject credentials of {credential.provider_id.first_name} {credential.provider_id.last_name}?</h1>
                    ) : (
                        <h1>Loading...</h1> // Optional loading state
                    )}
                    <p>Please provide feedback for rejection:</p>
                    <textarea className="txt-block-reason"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter the reason for rejection..."
                        maxLength={255}
                        required
                    />
                    <div className="btns block">
                        <Link to="/admin/provider-verification" className="btn-link">Cancel</Link>
                        <button onClick={() => handleReject(credential.provider_id._id, credential._id)}>Reject</button>
                    </div>
                    {/* <p style={{ color: "red" }}>{message}</p> */}
                </div>
                
            </main>
        </>
        
    )
}