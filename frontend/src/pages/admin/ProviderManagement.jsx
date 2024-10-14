import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import AdminProfileButton from "../../components/AdminProfileButton";
import "./UserManagement.css"
import { capitalizeFirstLetter } from "../../functions";
import { baseUrl } from "../../config";

export default function Providers(){
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getProviders = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${baseUrl}/admin/management-providers`,  { withCredentials: true });
                const data = response.data;
                console.log(data);
                setProviders(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError("Error fetching providers")
                setIsLoading(false);
            }
        }
        getProviders();
    }, []);

    const handleUnblock = async (providerId) => {
        try {
            const response = await axios.post(`${baseUrl}/admin/unblock-user/${providerId}/submit`, {}, { withCredentials: true });
            console.log("Response from front handle block", response.data)
            // alert(response.data.message);
            
            const updatedUser = response.data.user;
            setProviders((prevProviders) =>
                prevProviders.map((provider) =>
                    provider.user_id._id === providerId
                        ? {
                            ...provider,
                            user_id: {
                                ...provider.user_id,
                                status: updatedUser.status,  // updates only the status
                                blockReason: updatedUser.blockReason  // updates only the blockReason
                            }
                        }
                        : provider
                )
            );
        } catch (error) {
            console.error("Error unblocking provider:", error);
            alert("Failed to unblock the provider");
        }
    };

    // const formatId = (id) => {
    //     return id.length > 5 ? `${id.substring(0, 5)}...` : id;
    // };

    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <div>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <div className="inline">
                    <h1>Provider Management</h1>
                    <Link to="/admin/management-providers/new-user"><button>Create new</button></Link>
                </div>
                {!isLoading ? (
                    <table className="table">
                        {error ? (
                            <p><i>Error fetching data.</i></p>
                        ) : (
                            <></>
                        )}
                        <thead className="head">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Block Reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="list">
                            {
                                providers.map((provider) => (
                                    <tr key={provider._id}>
                                        <td>{provider.first_name} {provider.last_name}</td>
                                        <td>{provider.user_id.email}</td>
                                        <td>{provider.phone_number}</td>
                                        {provider.user_id.status === "blocked" ? (
                                            <td style={{color: "red", fontWeight: 500}}>{capitalizeFirstLetter(provider.user_id.status)}</td>
                                        ) : (
                                            <td style={{color: "green", fontWeight: 500}}>{capitalizeFirstLetter(provider.user_id.status)}</td>
                                        )}

                                        {provider.user_id.blockReason === null ? (
                                        <td>N/A</td>
                                            ) : (
                                            <td className="block-reason-col">{provider.user_id.blockReason}</td>
                                        )}
                                        <td className="actions-col">
                                            <Link to={`/admin/management-providers/update-provider/${provider._id}`}><button aria-label="Edit" title="Edit"><i className="bi bi-pencil-fill"></i></button></Link>
                                            {/* Conditional button rendering if the user is blocked */}
                                            {provider.user_id.status === "active" ? (
                                                <Link to={`/admin/management-providers/block-user/${provider.user_id._id}`}>
                                                    <button aria-label="Block" title="Block"><i className="bi bi-ban"></i></button>
                                                </Link>
                                            ) : (
                                                <button onClick={() => handleUnblock(provider.user_id._id)} aria-label="Unblock" title="Unblock"><i className="bi bi-check-circle-fill"></i></button>
                                            )}
                                            <Link to={`/admin/management-providers/delete-user/${provider.user_id._id}`}><button aria-label="Delete" title="Delete"><i className="bi bi-trash3-fill"></i></button></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
					<p><i>Loading...</i></p>
				)}
            </main>
            
        </div>
        
        
    )
}