import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav";


export default function Providers(){
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState(null); 

    axios.defaults.withCredentials = true; //for token auth

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

    // Handle unblocking 
    const handleUnblock = async (providerId) => {
        try {
            const response = await axios.post(`http://localhost:8000/admin/unblock-user/${providerId}/submit`);
            alert(response.data.message);
            
            // Update the status in the local state
            setProviders((prevProviders) =>
                prevProviders.map((provider) =>
                    provider._id === providerId ? { ...provider, status: 'active' } : provider
            )
            );
            window.location.reload();
        } catch (error) {
            console.error('Error unblocking provider:', error);
            alert("Failed to unblock the provider");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <main className="main">
                <h1>Provider Management</h1>
                <Link to="/admin/management-providers/new-user"><button>Create new</button></Link>
                <table id="providers-table">
                    <thead>
                        <tr>
                            <th>Provider ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Block Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="providers-list">
                        {
                            providers.map((provider) => (
                                <tr key={provider._id}>
                                    <td>{provider._id}</td>
                                    <td>{provider.first_name}</td>
                                    <td>{provider.last_name}</td>
                                    <td>{provider.user_id.email}</td>
                                    <td>{provider.phone_number}</td>
                                    <td>{provider.user_id.status}</td>
                                    {provider.user_id.blockReason === null ? (
                                    <td>N/A</td>
                                        ) : (
                                        <td>{provider.user_id.blockReason}</td>
                                    )}
                                    <td>
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