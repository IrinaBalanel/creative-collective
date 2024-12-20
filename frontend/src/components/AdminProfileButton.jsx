import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { baseUrl } from '../config';
// export default function ProfileButton({providerFName, providerLName, providerEmail}){

//     return (
//         <div className="profile-btn">
//             <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
//                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
//                 <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
//             </svg>
//             <div>
//                 <strong>{providerFName} {providerLName}</strong>
//                 <p>{providerEmail}</p>
//             </div>    
//         </div>
        
        
//     )
// }

export default function AdminProfileButton(){

    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>;
    }
    //console.log("This is my user context ", user);
    const userId = user._id;
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const getUserAdmin = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/profile/${userId}`, {
                    withCredentials: true 
                });
                if (response.data.admin) {
                    setAdmin(response.data.admin);
                    //console.log("User with provider info: ", response.data.admin);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        };
        if (userId) {
            getUserAdmin();
        }
        
    }, [userId]);

    return (
        <div className="admin-profile-btn">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <div>
                {admin._id ? (
                    <>
                        <strong>Admin</strong>
                        <p>{admin.email}</p>
                    </>
                    
                ) : (
                    <></>
                    
                )}
            </div>    
        </div>
        
        
    )
}