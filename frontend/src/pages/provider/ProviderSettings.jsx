import SideNav from "../../components/SideNav/SideNav";
import ProfileButton from "../../components/ProfileButton"
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"

export default function ProviderSettings(){
    const { user_id } = useParams(); 
    const [token, setToken] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchToken = async () => {
            try {
                console.log("Provider user_id: ", user_id);
                const response = await axios.get(`http://localhost:8000/provider/settings/${user_id}/token`, {withCredentials: true});
                setToken(response.data.provider.calendly_token);
                //console.log("Provider data: ", response.data);
                //console.log("Token: ", response.data.provider.calendly_token);

                
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };
        if (user_id) {
            fetchToken();
        }
    }, [user_id]);


    const handleCancel = () => {
        setIsEditing(false);  // back to view mode
        setToken( token || '');
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setToken(value)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("before sending", token);

        try {
            const response = await axios.post(`http://localhost:8000/provider/settings/${user_id}/token/submit`, {token},  { withCredentials: true });
            //console.log(response.data.newToken.calendly_token);
            setToken(response.data.newToken.calendly_token);
            setIsEditing(false);
            
        } catch (error) {
            console.error('Error: ', error);
            setError("Something went wrong. Please try again.")
            
        }
    };



    return (
        <>
            <SideNav/>
            <main className="main">
                <ProfileButton/>
                <h1 className="dashboard-header-one" style={{textAlign:"center"}}>Settings</h1>
                <div className="pers-info customization-head">
                    <div className="pers-info customization-text">
                        <h2>Calendly Personal Access Token</h2>
                        <p>This token acts as a key and allows the app to access your Calendly data. Personal tokens don't usually expire unless revoked. If you revoke the token, any our attempts to use the old token will fail and some of the website's functionalities will not be  accessible to you.</p>
                    </div>
                    {!isEditing ? (
                        <div><button onClick={() => setIsEditing(true)}>Set Token</button></div>
                    ) : (
                        null
                    )}
                </div>
                {!isEditing ? (
                    // View Mode
                    <>
                        {token ? (
                            <div className="token-container">
                                <p className="hover-text-token"><i className="bi bi-search"></i><strong><i>Hover over here to see the token: </i></strong></p>
                                <p className="token">{token}</p>
                            </div>  
                        ) : (
                            <p><i>No token submitted yet.</i></p>
                        )}
                        
                        
                    </>
                    
                ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit}>
                        <p style={{ color: 'red' }}>{error}</p>
                        <div className="input image-url-container">
                            <input type="text" id="token" placeholder="Calendly Token" name="calendly_token" value={token || ""} onChange={handleChange} required/>
                        </div>
                        <div className="btns-update">
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                )}
                
                
            </main>
        </>

        
    )
}