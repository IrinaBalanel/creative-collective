import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import AdminProfileButton from "../../components/AdminProfileButton";
import "./UserManagement.css"

export default function Providers(){
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getProviders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admin/management-providers',  { withCredentials: true });
                const data = response.data;
                console.log(data);
                setProviders(data);
            } catch (error) {
                console.log(error);
                setError("Error");
            }
        }
        getProviders();
    }, []);

    const handleUnblock = async (providerId) => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/unblock-user/${providerId}/submit`, {}, { withCredentials: true });
            console.log("Response from front handle block", response.data)
            alert(response.data.message);
            
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

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <main className="main">

                <AdminProfileButton/>
                <div className="inline">
                    <h1>Provider Management</h1>
                    <Link to="/admin/management-providers/new-user"><button>Create new</button></Link>
                </div>
                
                <table className="table">
                    <thead className="head">
                        <tr>
                            {/* <th>Provider ID</th> */}
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
                            providers.map((provider) => (
                                <tr key={provider._id}>
                                    {/* <td className="id-col">{formatId(provider._id)}</td> */}
                                    {/* <td className="id-col">{provider._id}</td> */}
                                    <td>{provider.first_name} {provider.last_name}</td>
                                    {/* <td></td> */}
                                    <td>{provider.user_id.email}</td>
                                    <td>{provider.phone_number}</td>
                                    <td>{provider.user_id.status}</td>
                                    {provider.user_id.blockReason === null ? (
                                    <td>N/A</td>
                                        ) : (
                                        <td className="block-reason-col">{provider.user_id.blockReason}</td>
                                    )}
                                    <td className="actions-col">
                                        <Link to={`/admin/management-providers/update-provider/${provider._id}`}><button>Update</button></Link>
                                        {/* Conditional button rendering if the user is blocked */}
                                        {provider.user_id.status === "active" ? (
                                            <Link to={`/admin/management-providers/block-user/${provider.user_id._id}`}>
                                                <button>Block</button>
                                            </Link>
                                        ) : (
                                            <button onClick={() => handleUnblock(provider.user_id._id)}>Unblock</button>
                                        )}
                                        <Link to={`/admin/management-providers/delete-user/${provider.user_id._id}`}><button>Delete</button></Link>
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