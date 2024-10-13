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

export default function ProfileButton(){

    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>;
    }
    //console.log("This is my user context ", user);
    const userId = user._id;
    const [provider, setProvider] = useState({});

    useEffect(() => {
        const getUserwithProvider = async () => {
            try {
                const response = await axios.get(`${baseUrl}/provider/dashboard/${userId}`, {
                    withCredentials: true 
                });
                if (response.data.provider) {
                    setProvider(response.data.provider);
                    //console.log("User with provider info: ", response.data.provider);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        };
        if (userId) {
            getUserwithProvider();
        }
        
    }, [userId]);

    return (
        <div className="profile-btn">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <div>
                {provider._id ? (
                    <>
                        <strong>{provider.first_name} {provider.last_name}</strong>
                        <p>{user.email}</p>
                    </>
                    
                ) : (
                    <>
                        <strong>Admin</strong>
                        <p>{user.email}</p>
                    </>
                    
                )}
            </div>    
        </div>
        
        
    )
}