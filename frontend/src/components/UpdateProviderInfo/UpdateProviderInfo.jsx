import "./UpdateProviderInfo.css"
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {capitalizeFirstLetter, cutS} from "../../functions"
import { isValidUrl, isPhoneNumberValid} from '../../functions';

export default function UpdateProviderInfo({ provider, user_id, categories, onProviderUpdated}){
    const [isEditing, setIsEditing] = useState(false);  // edit/view mode
    const [errorMessages, setErrorMessages] = useState({}); 

    const [providerData, setProviderData] = useState({
        first_name: provider.first_name || '',
        last_name: provider.last_name || '',
        creative_category_id: provider.creative_category_id?._id || '',
        creative_category_details: provider.creative_category_details || '',
        profile_image: provider.profile_image || '',
        bio: provider.bio || '',
        phone_number: provider.phone_number || '',
        location: provider.location || ''
    });
    

    const [localUserId, setLocalUserId] = useState(user_id); // stores user_id separately to save it to make it always available

    // so user_id is always set in case it's lost in the form
    useEffect(() => {
        if (user_id && !localUserId) {
            setLocalUserId(user_id);
        }
    }, [user_id, localUserId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProviderData({ ...providerData, [name]: value });
        // Validate url
        if (name === "profile_image") {
            if (!isValidUrl(value)) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    profile_image: "Invalid image URL format"
                }));
            } else {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    profile_image: ""
                }));
            }
        }

        
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setProviderData({ ...providerData, creative_category_id: selectedCategoryId});
    };

    // Separate handler for phone input
    const handlePhoneChange = (value) => {
        setProviderData((prevState) => ({
            ...prevState,
            phone_number: value  // updates phone_number field directly
        }));

        // Validate phone number on change
        if (!isPhoneNumberValid(value)) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                phone_number: "Invalid phone number"
            }));
        } else {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                phone_number: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Provider in UpdateProviderPage before sending request", providerData.creative_category_id)
        // if any fields have error messages with actual values
        
        const hasErrors = Object.values(errorMessages).some((msg) => msg);
        if (hasErrors) {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/provider/profile-customization/update-info-portfolio/${localUserId}/submit`, providerData,  { withCredentials: true });
            if (response.data.message === "Updated successfully") {
                console.log(response.data.updatedProvider);
                const updatedProviderData = response.data.updatedProvider;  // New updated data from the response
                setProviderData(updatedProviderData); 
                
                onProviderUpdated(updatedProviderData);
                console.log("Provider in UpdateProviderPage after receiving response", updatedProviderData.creative_category_id)
                setIsEditing(false);
                // window.location.reload();
            } else {
                console.error('Failed to update provider:', response.data.message);
            }
            
        } catch (error) {
            console.error('Error updating provider info:', error);
            
        }
    };



    const handleCancel = () => {
        setIsEditing(false);  // back to view mode
        setErrorMessages({});
        // Resets form data to the original
        setProviderData({
            first_name: provider.first_name || '',
            last_name: provider.last_name || '',
            creative_category_id: provider.creative_category_id?._id || '',
            creative_category_details: provider.creative_category_details || '',
            profile_image: provider.profile_image || '',
            bio: provider.bio || '',
            phone_number: provider.phone_number || '',
            location: provider.location || ''
        });
    };

    return(
        <div className="pers-info">
            <div className="pers-info customization-head">
                <div className="pers-info customization-text">
                    <h2>Personal Information</h2>
                    <p>Keep your profile updated so clients can easily find and book you. Share your essential details to showcase who you are and your specialties. Use your bio to highlight your style, experience, and what makes you unique.</p>
                </div>
                {!isEditing ? (
                    <div><button onClick={() => setIsEditing(true)}>Update</button></div>
                ) : (
                    <div></div>
                )}
            </div>
            
            
            {!isEditing ? (
                // View Mode
                <>
                    <div className="personal-info view">
                        <div id="profile-pic"><img src={provider.profile_image} alt={`${provider.first_name} ${provider.last_name}`}/></div>
                        <div>
                            <p><strong>Name:</strong> {provider.first_name} {provider.last_name}</p>
                            <p><strong>Profession:</strong> {capitalizeFirstLetter(cutS(provider.creative_category_id.category))}</p>
                            <p><strong>Specialization:</strong> {provider.creative_category_details}</p>
                            <p><strong>Phone Number:</strong> {provider.phone_number}</p>
                            <p><strong>Location:</strong> {provider.location}</p>
                            <p><strong>Bio:</strong> {provider.bio}</p>
                        </div>
                    </div>
                    
                </>
                
            ) : (
                // Edit Mode
                <form id="update-form" onSubmit={handleSubmit}>
                    <div id="preview-pic-container">
                        <img className="preview-pic" src={providerData.profile_image} alt="Image Preview" required/>
                        <div className="input image-url-container">
                            <input type="text" id="profileImage" placeholder="Profile Image URL" name="profile_image" value={providerData.profile_image} onChange={handleChange} required/>
            
                        </div>
                    </div>
                    
                    <div className="udpate-inputs">
                        <p style={{color: "red"}}>* All fields are required.</p>
                        {/* error messages */}
                        <div className="error-list">
                            {Object.entries(errorMessages).map(([key, message]) => (
                                message && <p key={key} style={{ color: 'red' }}>{message}</p>
                            ))}
                        </div>
                        <div className="input">
                            <input type="text" id="fName" placeholder="First Name" name="first_name" value={providerData.first_name} onChange={handleChange} required/>
                            <input type="text" id="lName" placeholder="Last Name"  name="last_name" value={providerData.last_name} onChange={handleChange} required/>
                        </div>
                        <div className="input">
                            <select 
                                id="creative_category" 
                                name="creative_category_id" 
                                value={providerData.creative_category_id?._id || providerData.creative_category_id || ''}  // Ensure correct value is set
                                onChange={handleCategoryChange} 
                                required
                            >
                                <option value="" disabled>Select Profession</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {capitalizeFirstLetter(cutS(category.category))}
                                    </option>
                                ))}
                            </select>
                            <input type="text" id="specialization" placeholder="Specialization"  name="creative_category_details" value={providerData.creative_category_details} onChange={handleChange} required/>
                        </div>
                        <div className="input">
                            <PhoneInput
                                id="phone"
                                placeholder="999-999-9999"
                                name="phone_number" value={providerData.phone_number} onChange={handlePhoneChange}
                                defaultCountry="CA"
                                required
                            />
                            <input type="text" id="location" placeholder="e.g., Toronto, Canada" name="location" value={providerData.location} onChange={handleChange} required/>
                        </div>
                        <div className="input">
                            <textarea id="bio" placeholder="Tell the clients about yourself... (up to 255 characters)"  name="bio" maxLength={255} value={providerData.bio} onChange={handleChange} required/>
                        </div>
                        <div className="btns-update">
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
            )}

        </div>
            

        
    )
}
