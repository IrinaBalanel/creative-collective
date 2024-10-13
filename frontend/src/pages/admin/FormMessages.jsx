import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import AdminProfileButton from "../../components/AdminProfileButton";

export default function FormMessages(){
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admin/form-messages',  { withCredentials: true });
                const data = response.data;
                setMessages(data);
                // console.log(data)
                console.log("Response from fetching messages", data)
            } catch (error) {
                console.log(error);
                setError("Error fetching messages");
            }
        }
        getMessages();
    }, []);
    
    const handleRead = async (id) => {
        try {
            console.log("msg id", id);
            const response = await axios.post(`http://localhost:8000/admin/form-messages/mark-read/${id}/submit`, {}, { withCredentials: true });
            // alert(response.data.message);
            //console.log("message response", response)
            const updatedMessage = response.data.message;
            console.log("Response from front mark as read", updatedMessage)

            setMessages((prevMessages) =>
                prevMessages.filter((message) => message._id !== id)
            );

        } catch (error) {
            console.log(error);
            alert("Failed to mark message as read");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <SideNav/>
            <main className="main">
                <AdminProfileButton/>
                <div className="inline">
                    <h1>Messages & Inquiries</h1>
                </div>
                { messages.length > 0 ? (
                    <table className="table">
                        <thead className="head">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th style={{width: "30px"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="list">
                            {
                                messages.map((message) => (
                                    <tr key={message._id}>
                                        <td>{message.full_name}</td>
                                        <td>{message.email}</td>
                                        <td>{message.message}</td>
                                        <td className="actions-col">
                                            <button onClick={() => handleRead(message._id)} aria-label="Mark as read" title="Mark as read"><i className="bi bi-check2-circle"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p><i>No messages yet.</i></p>
                )}
            </main>
        </div>
        
        
    )
}