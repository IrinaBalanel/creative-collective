import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import "./UserManagement.css"
import AdminProfileButton from "../../components/AdminProfileButton";

export default function Clients(){
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admin/management-clients',  { withCredentials: true });
                const data = response.data;
                setClients(data);
                console.log(data)
            } catch (error) {
                console.log(error);
                setError("Error");
            }
        }
        getClients();
    }, []);

    const handleUnblock = async (clientId) => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/unblock-user/${clientId}/submit`,  { withCredentials: true });
            alert(response.data.message);
            const updatedUser = response.data.user;
            console.log("Response from front handle block", response.data.user)

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
            console.error('Error unblocking client:', error);
            console.log(error);
            alert("Failed to unblock the client");
        }
    };

    // const formatId = (id) => {
    //     return id.length > 5 ? `${id.substring(0, 5)}...` : id;
    // };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <div className="inline">
                    <h1>Client Management</h1>
                    <Link to="/admin/management-clients/new-user" className="side-button"><button>Create new</button></Link>
                </div>
                <table className="table">
                    <thead className="head">
                        <tr>
                            {/* <th>Client ID</th> */}
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
                                    {/* <td className="id-col">{formatId(client._id)}</td> */}
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
                                    <td>
                                        <div className="actions-col">
                                            <Link to={`/admin/management-clients/update-client/${client._id}`}><button>Update</button></Link>
                                            {/* Conditional button rendering if the user is blocked */}
                                            {client.user_id.status === "active" ? (
                                                <Link to={`/admin/management-clients/block-user/${client.user_id._id}`}>
                                                    <button>Block</button>
                                                </Link>
                                            ) : (
                                                <button onClick={() => handleUnblock(client.user_id._id)}>Unblock</button>
                                            )}
                                            <Link to={`/admin/management-clients/delete-user/${client.user_id._id}`}><button>Delete</button></Link>
                                        </div>
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