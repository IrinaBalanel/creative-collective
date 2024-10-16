import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import "./UserManagement.css"
import AdminProfileButton from "../../components/AdminProfileButton";
import { capitalizeFirstLetter } from "../../functions";
import { baseUrl } from "../../config";

export default function Clients(){
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getClients = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${baseUrl}/admin/management-clients`,  { withCredentials: true });
                const data = response.data;
                setClients(data);
                setIsLoading(false);
                // console.log(data)
                console.log("Response from fetching clients", data)
            } catch (error) {
                console.log(error);
                setError("Error fetching clients");
                setIsLoading(false);
            }
        }
        getClients();
    }, []);
    
    
    const handleUnblock = async (clientId) => {
        try {
            console.log("client id", clientId);
            const response = await axios.post(`${baseUrl}/admin/unblock-user/${clientId}/submit`, {}, { withCredentials: true });
            // alert(response.data.message);
            console.log("updatedUser ", response)
            const updatedUser = response.data.user;
            // console.log("Response from front handle block", response.data.user)

            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.user_id._id === clientId
                        ? {
                            ...client,  // keeps all other client properties
                            user_id: {
                                ...client.user_id,
                                status: updatedUser.status,  // updates only the status
                                blockReason: updatedUser.blockReason  // updates only the blockReason
                            }
                        }
                        : client // returns other clients unchanged
                )
            );

            console.log("After handle block", updatedUser)

        } catch (error) {
            console.log(error);
            alert("Failed to unblock the client");
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
                    <h1>Client Management</h1>
                    <Link to="/admin/management-clients/new-user" className="side-button"><button>Create new</button></Link>
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
                                clients.map((client) => (
                                    <tr key={client._id}>
                                        <td>{client.first_name} {client.last_name}</td>
                                        <td>{client.user_id.email}</td>
                                        <td>{client.phone_number}</td>
                                        {client.user_id.status === "blocked" ? (
                                            <td style={{color: "red", fontWeight: 500}}>{capitalizeFirstLetter(client.user_id.status)}</td>
                                        ) : (
                                            <td style={{color: "green", fontWeight: 500}}>{capitalizeFirstLetter(client.user_id.status)}</td>
                                        )}
                                        {client.user_id.blockReason === null ? (
                                            <td>N/A</td>
                                            ) : (
                                            <td className="block-reason-col">{client.user_id.blockReason}</td>
                                        )}
                                        <td id="actions-col">
                                            <div className="actions-col">
                                                <Link to={`/admin/management-clients/update-client/${client._id}`}><button aria-label="Edit" title="Edit"><i className="bi bi-pencil-fill"></i></button></Link>
                                                {/* Conditional button rendering if the user is blocked */}
                                                {client.user_id.status === "active" ? (
                                                    <Link to={`/admin/management-clients/block-user/${client.user_id._id}`}>
                                                        <button aria-label="Block" title="Block"><i className="bi bi-ban"></i></button>
                                                    </Link>
                                                ) : (
                                                    <button onClick={() => handleUnblock(client.user_id._id)} aria-label="Unblock" title="Unblock"><i className="bi bi-check-circle-fill"></i></button>
                                                )}
                                                <Link to={`/admin/management-clients/delete-user/${client.user_id._id}`}><button aria-label="Delete" title="Delete"><i className="bi bi-trash3-fill"></i></button></Link>
                                            </div>
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