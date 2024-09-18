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
            const response = await axios.get('http://localhost:8000/admin/management-clients');
            const data = response.data;
            console.log(data);
            setClients(data);
        } catch (error) {
            console.log(error);
            if (error.status == 500) {
                setError("Access denied. You need to login.");
            } else {
                setError("Error");
                console.log("Error ", error);
            }
        }
    }
    getClients();
    }, []);
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <h1>Client Management</h1>
            <Link to="/admin/management-clients/new-user"><button>Create new client</button></Link>
            <table id="clients-table">
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        {/* <th>Password</th> */}
                        <th>Role</th>
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
                                {/* <td>{client.user_id.password}</td> */}
                                <td>{client.user_id.role}</td>
                                <td>
                                    <Link to="/admin/updateclient/"><button>Update</button></Link>
                                    <Link to="/admin/deleteclient/"><button>Delete</button></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
        
    )
}