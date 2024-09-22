import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav";


export default function Clients(){
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null); 

    axios.defaults.withCredentials = true; //for token auth

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admin/management-clients',  { withCredentials: true });
                const data = response.data;
                console.log(data);
                setClients(data);
            } catch (error) {
                console.log(error);
                setError("Error");
            }
        }
        getClients();
    }, []);

    // Handle unblocking a client
    const handleUnblock = async (clientId) => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/unblock-user/${clientId}/submit`);
            alert(response.data.message);
            
            // Update the client status in the local state
            setClients((prevClients) =>
            prevClients.map((client) =>
                client._id === clientId ? { ...client, status: 'active' } : client
            )
            );
            window.location.reload();
        } catch (error) {
            console.error('Error unblocking client:', error);
            alert("Failed to unblock the client");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <h1>Client Management</h1>
            <Link to="/admin/management-clients/new-user"><button>Create new</button></Link>
            <table id="clients-table">
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Block Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="client-list">
                    {
                        clients.map((client) => (
                            <tr key={client._id}>
                                <td>{client._id}</td>
                                <td>{client.first_name}</td>
                                <td>{client.last_name}</td>
                                <td>{client.user_id.email}</td>
                                <td>{client.phone_number}</td>
                                <td>{client.user_id.status}</td>
                                {client.user_id.blockReason === null ? (
                                   <td>N/A</td>
                                    ) : (
                                    <td>{client.user_id.blockReason}</td>
                                )}
                                <td>
                                    <Link to={`/admin/management-clients/update-client/${client._id}`}><button>Update</button></Link>
                                    {/* <Link to={`/admin/management-clients/block-user/${client.user_id._id}`}><button>Block</button></Link> */}
                                    {/* Conditional button rendering if the user is blocked */}
                                    {client.user_id.status === "active" ? (
                                        <Link to={`/admin/management-clients/block-user/${client.user_id._id}`}>
                                            <button>Block</button>
                                        </Link>
                                    ) : (
                                        <button onClick={() => handleUnblock(client.user_id._id)}>Unblock</button>
                                    )}
                                    <Link to={`/admin/management-clients/delete-user/${client.user_id._id}`}><button>Delete</button></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
        
    )
}