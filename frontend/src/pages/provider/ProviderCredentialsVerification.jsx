import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import SideNav from "../../components/SideNav/SideNav";
import ProfileButton from "../../components/ProfileButton"
import { isValidUrl, formatDate, cutS, capitalizeFirstLetter} from '../../functions';
import {useContext} from "react";
import { UserContext } from "../../context/UserContext";
import { baseUrl } from "../../config";

export default function ProviderCredentialsVerification(){
    const [isEditing, setIsEditing] = useState(false);  // edit/view mode
    const { user } = useContext(UserContext);
    //console.log("User id from context", user._id);
    const [errorMessage, setErrorMessage] = useState(); 
    const [providerId, setProviderId] = useState(null);
    const [categoryId, setCategoryId] = useState();
    const [credentialsAttempts, setCredentialsAttempts] = useState([]);
   
    const [file, setFile] = useState("");


    // useEffect(() => {
    //     const getProviderData = async () => {
    //         //console.log("User id from context for fetching provider with credentials", user._id);
    //         if (!user || !user._id) {
    //             console.error("User ID is undefined.");
    //             return;
    //         }
    //         try {
    //             const response = await axios.get(`http://localhost:8000/provider/fetch-provider/${user._id}`,  { withCredentials: true });
    //             const data = response.data;
    //             //console.log(data);
    //             setProviderId(data._id);
    //             setCategoryId(data.creative_category_id._id);
    //             console.log("provider: ", data._id);
    //             // console.log("category: ", data.creative_category_id._id);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getProviderData();
    // }, [user._id]);

    // useEffect(() => {
    //     const getCredentialAttempts = async () => {
    //         //console.log("Provider id for fetching credentials list", providerId);
    //         if (!providerId) {
    //             //console.log("Provider ID is not defined, skipping API call.");
    //             return;
    //         }
    //         try {
    //             const response = await axios.get(`http://localhost:8000/provider/credentials-verification/attempts-list/${providerId}`,  { withCredentials: true });
    //             const data = response.data;
    //             setCredentialsAttempts(data);
    //             //console.log("credentials list: ", data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getCredentialAttempts();
    // }, [providerId]);

    useEffect(() => {
        const getProviderAndCredentials = async () => {
            console.log("User id from context for fetching provider with credentials", user._id);
            if (!user || !user._id) {
                //console.error("User ID is undefined.");
                return;
            }
            try {
                // Fetch provider data
                const providerResponse = await axios.get(`${baseUrl}/provider/fetch-provider/${user._id}`, { withCredentials: true });
                const providerData = providerResponse.data;
                setProviderId(providerData._id);
                //console.log("provider: ", providerData._id);
                setCategoryId(providerData.creative_category_id._id);
    
                // Fetch credentials attempts
                const credentialsResponse = await axios.get(`${baseUrl}/provider/credentials-verification/attempts-list/${providerData._id}`, { withCredentials: true });
                const credentialsData = credentialsResponse.data;
                setCredentialsAttempts(credentialsData);
    
            } catch (error) {
                console.log(error);
            }
        };
        getProviderAndCredentials();
    }, [user._id]);

    const handleCancel = () => {
        setIsEditing(false);  // back to view mode
        setFile("");
        setErrorMessage("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentialData = {
            category_id: categoryId,
            provider_id: providerId,
            file: file
        }
        console.log("before sending request for verififcation", credentialData);

        try {
            const response = await axios.post(`${baseUrl}/provider/credentials-verification/submit`, {credentialData},  { withCredentials: true });
            console.log(response.data);
            if (response.data.message === "Verification was added successfully") {
                const newCredential = response.data.newVerification;
                console.log("New Credential from backend:", newCredential);
                // updates the displayed credentials after adding the new one
                setCredentialsAttempts((prevAttempts) => [
                    ...prevAttempts,
                    {
                        _id: newCredential._id,
                        provider_id: newCredential.provider_id,
                        category_id: newCredential.category_id,
                        file: newCredential.file,
                        submitted_at: newCredential.submitted_at,
                        status: newCredential.status,
                        review_feedback: newCredential.review_feedback,
                    }
                ]);

                setFile("");
                setIsEditing(false);
            } else {
                console.log("Failed to submit verification:", response.data.message);
            }
            
        } catch (error) {
            console.log("Error: ", error);
            
        }
    };



    const handleChange = (e) => {
        const { value } = e.target;
        setFile(value);
        // Validate url
        if (!isValidUrl(value)) {
            setErrorMessage( "Invalid image URL format");
        } else {
            setErrorMessage("");
        }
        
    };
    return(
        <>
        <SideNav/>
        <main className='main'>
            
            <ProfileButton/>
            <h1 className="dashboard-header-one" style={{textAlign:"center"}}>Credentials Verification</h1>
            <div id="credentials-verification-section">
                <div className="customization-head">
                    <div className="pers-info customization-text">
                        <h2>How to get Verified?</h2>
                        <p>To become a verified service provider, send your professional credentials proving your credibility and competency. 
                        The document will be evaluated by admin. If it is approved, the 'verified' badge will become visible on your provider's page.</p>
                    </div>
                    {!isEditing ? (
                        <div><button onClick={() => setIsEditing(true)}>Apply</button></div>
                    ) : (
                        <div></div>
                    )}
                </div>
                
                
                {!isEditing ? (
                    // View Mode
                    <>
                        {credentialsAttempts.length > 0 ? (
                        
                            <table className="table">
                                <thead className="head">
                                    <tr>
                                        <th>Name</th>
                                        <th>Profession</th>
                                        <th>File</th>
                                        <th>Submitted At</th>
                                        <th>Status</th>
                                        <th>Feedback</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    {Array.isArray(credentialsAttempts) && credentialsAttempts.map((attempt) => (
                                        <tr key={attempt._id}>
                                            <td>{attempt.provider_id.first_name} {attempt.provider_id.last_name}</td>
                                            <td>{capitalizeFirstLetter(cutS(attempt.category_id.category))}</td>
                                            <td><a href={attempt.file} target="_blank"><i className="bi bi-paperclip"></i>View file</a></td>
                                            <td>{formatDate(attempt.submitted_at)}</td>
                                            {attempt.status === "approved" && (
                                                <td style={{color: "green", fontWeight: 500}}>{capitalizeFirstLetter(attempt.status)}</td>
                                            )}
                                            {attempt.status === "rejected" && (
                                                <td style={{color: "red", fontWeight: 500}}>{capitalizeFirstLetter(attempt.status)}</td>
                                            )}
                                            {attempt.status === "pending" && (
                                                <td style={{color: "blue", fontWeight: 500}}>{capitalizeFirstLetter(attempt.status)}</td>
                                            )}
                                            
                                            
                                            {attempt.review_feedback === null ? (
                                            <td>N/A</td>
                                                ) : (
                                                <td className="block-reason-col">{attempt.review_feedback}</td>
                                            )}
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            
                            </table>
                        ) : (
                            <p><i>No submitted credentials yet.</i></p>
                        )}
                    </>
                    
                ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit}>
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                        <div id="preview-pic-container" className="credentials-container">
                            <img src={file} alt="File Preview" required/>
                            <div className="input image-url-container">
                                <input type="text" id="file" placeholder="File URL" name="file" onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className="btns-update">
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                )}

            </div>
        </main>   
        </>
        
    )
}
