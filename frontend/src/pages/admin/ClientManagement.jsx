import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import "./UserManagement.css"


export default function Clients(){
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null); 

    axios.defaults.withCredentials = true; //for token auth

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admin/management-clients',  { withCredentials: true });
                const data = response.data;
                // console.log("success 001");
                // console.log(data);
                // console.log(data.message);
                // console.log(data.status);

                //add this to every page that calls api
                // if(data.status && data.status == "unauthorized")
                // {
                //     // Rediredct to login page
                //     console.log("REDIRECT");
                // }
                setClients(data);
            } catch (error) {
                console.log('error 001');
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

    const formatId = (id) => {
        return id.length > 5 ? `${id.substring(0, 5)}...` : id;
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <main className="main">
                <div className="inline">
                    <h1>Client Management</h1>
                    <Link to="/admin/management-clients/new-user" className="side-button"><button>Create new</button></Link>
                </div>
                <table className="table">
                    <thead className="head">
                        <tr>
                            <th>Client ID</th>
                            <th>Name</th>
                            {/* <th>Last name</th> */}
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
                                    <td className="id-col">{formatId(client._id)}</td>
                                    <td>{client.first_name} {client.last_name}</td>
                                    {/* <td></td> */}
                                    <td>{client.user_id.email}</td>
                                    <td>{client.phone_number}</td>
                                    <td>{client.user_id.status}</td>
                                    {client.user_id.blockReason === null ? (
                                    <td>N/A</td>
                                        ) : (
                                        <td className="block-reason-col">{client.user_id.blockReason}</td>
                                    )}
                                    <td className="actions-col">
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
            </main>
        </div>
        
        
    )
}