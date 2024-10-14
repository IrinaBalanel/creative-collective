import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import ProfileButton from "../../components/ProfileButton"
import { formatDate, cutS, capitalizeFirstLetter} from '../../functions';
import { baseUrl } from "../../config";

export default function ProviderVerification(){
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getVerificationRequests = async () => {
            
            try {
                const response = await axios.get(`${baseUrl}/admin/provider-verification`,  { withCredentials: true });
                const data = response.data;
                setRequests(data);
                console.log(data);
            } catch (error) {
                console.log(error);
                setError("Error fetching data");
            }
        }
        getVerificationRequests();
    }, []);


    const handleApprove = async (provider_id, credential_id) => {

        try {
            const response = await axios.post(`${baseUrl}/admin/provider-verification/${provider_id}/approve-credential/${credential_id}/submit`, {},  { withCredentials: true });
            console.log(response.data);
            if(!response.data){
                setError("Something went wrong.")
            }
            setRequests((prevRequests) => prevRequests.filter(request => request._id !== credential_id));
        } catch (error) {
            console.log("Error updating credential info:", error);
            alert("Failed to approve credentials");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <>
        <SideNav/>
        <main className='main'>
            <ProfileButton/>
            <h1>Providers Verification</h1>
            <p style={{color: "red"}}>{error}</p>
            { requests.length > 0 ? (
                    <table className="table">
                        <thead className="head">
                            <tr>
                                <th>Name</th>
                                <th>Profession</th>
                                <th>File</th>
                                <th>Submitted At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="list">
                            {
                                Array.isArray(requests) && requests.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.provider_id.first_name} {request.provider_id.last_name}</td>
                                        <td>{capitalizeFirstLetter(cutS(request.category_id.category))}</td>
                                        <td><a href={request.file} target="_blank"><i aria-hidden="true" className="bi bi-paperclip"></i>View file</a></td>
                                        <td>{formatDate(request.submitted_at)}</td>
                                        <td className="actions-col">
                                            <button className="approve-btn" onClick={() => handleApprove(request.provider_id._id, request._id)} aria-label="Approve" title="Approve"><i className="bi bi-patch-check-fill"></i></button>
                                            <Link to={`/admin/provider-verification/reject-credential/${request._id}`}>
                                                <button aria-label="Reject" title="Reject"><i className="bi bi-dash-circle-fill"></i></button>
                                            </Link>
                                            
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p><i>No pending requests yet.</i></p>
                )}
        </main>   
        </>
        
    )
}
