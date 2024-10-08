import {useState, useEffect} from "react";
import axios from "axios";
import "./UpdatePortfolio.css"
import { isValidUrl } from '../../functions';

export default function UpdatePortfolio({ initialImages = [], user_id }){
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrls, setImageUrls] = useState(initialImages); 
    const [errorMessages, setErrorMessages] = useState([]); 
    
    useEffect(() => {
        if (initialImages.length !== imageUrls.length) { // sets state if initialImages changed
            setImageUrls(initialImages);
        }
    }, [initialImages]);


    // handles input changes for each image URL
    const handleImageChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value; // updates image URL at the specific index
        setImageUrls(newImageUrls);
        
        // Url validation
        if (isValidUrl(value)) {
            setErrorMessages(prevErrors => prevErrors.filter((_, i) => i !== index));  // clears the error for this URL
        } else {
            setErrorMessages(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = `Invalid URL at position ${index + 1}`;
                return newErrors;
            });
        }
        
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log("Provider in UpdateProviderPage", providerData)

    //     const validUrls = isValidUrl(imageUrls.filter((url) => url.trim() !== "")); // only non-empty URLs
    //     if (!validUrls){
    //         setErrorMessage("Url is invalid")
    //         return;
    //     }

    //     const portfolioData = {
    //         portfolio: validUrls  // Only send portfolio data from this component
    //     };
    //     try {

    //         const response = await axios.post(`http://localhost:8000/provider/profile-customization/update-info-portfolio/${user_id}/submit`, portfolioData,  { withCredentials: true });
    //         console.log(response.data.updatedProvider);
    //         if (response.data.message === "Updated successfully") {
    //             console.log('Provider info updated successfully');
    //             setIsEditing(false);
    //             // navigate(`/profile-customization/${user_id}`);
    //             // window.location.reload();
    //             setErrorMessage("")
    //         } else {
    //             console.error('Failed to update provider:', response.data.message);
    //         }
            
    //     } catch (error) {
    //         console.error('Error updating provider info:', error);
    //     }

    // };



    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages([]);

        const nonEmptyUrls = imageUrls.filter((url) => url.trim() !== ""); // validates all non-empty URLs
        let errors = [];

        nonEmptyUrls.forEach((url, index) => {
            if (!isValidUrl(url)) {
                errors[index] = `Before submission change Invalid URL at position ${index + 1}`;
            }
        });

        if (errors.length > 0) {
            setErrorMessages(errors);
            return;  // prevents form submission if there are invalid urls
        }

        const portfolioData = {
            portfolio: nonEmptyUrls  // only sends valid portfolio data
        };

        try {
            const response = await axios.post(`http://localhost:8000/provider/profile-customization/update-info-portfolio/${user_id}/submit`, portfolioData, { withCredentials: true }
            );
            console.log(response.data.updatedProvider);
            if (response.data.message === "Updated successfully") {
                setIsEditing(false);
                setErrorMessages([]);
            } else {
                console.error('Failed to update provider:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating provider info:', error);
        }
    };
    const handleCancel = () => {
        setIsEditing(false);  // back to view mode
        setImageUrls(initialImages); // resets unsaved changes
        setErrorMessages([]);
    };

    return(
        <div className="portfolio-section">
            <div className="customization-head">
                <div className="customization-text">
                    <h2>Portfolio</h2>
                    <p>Show off your best work to attract clients! Upload a portfolio of your past projects so they can see the quality of your services. Ensure it's a true reflection of your creativity and expertise.</p>
                </div>
                {!isEditing ? (
                    <div><button onClick={() => setIsEditing(true)}>Update</button></div>
                ) : (
                    <div></div>
                )}
            </div>
            
            
            {!isEditing ? (
                // View Mode
                <div className="portfolio-container">
                    {imageUrls.length === 0 || imageUrls.every(url => !url.trim()) ? (
                        <p><i>No images in the portfolio yet.</i></p>
                    ) : (
                        imageUrls.map((url, index) => (
                            // renders non-empty URLs
                            url && <div key={index} className="portfolio-item"><img src={url} alt={`Portfolio ${index + 1}`} role="demonstration"/></div>
                            
                        ))
                    )}
                </div>
            ) : (
                // Edit Mode
                <form className="update-portfolio-form" onSubmit={handleSubmit}>
                    <div className="portfolio-items">
                        {imageUrls.map((url, index) => (
        
                            <div key={index} className='portfolio-item portfolio-item-margin'>
                                <div className="portfolio-input-container">
                                    <label><strong>{`Image ${index + 1}`}</strong></label>
                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        value={url}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                    />
                                </div>
                                <img src={url} alt={`Portfolio ${index + 1}`} role="demonstration" style={{ width: '250px', height: 'auto' }} />
                            </div>
                                
    
                            
                        ))}

                        {/* Always show one extra empty input field */}
                        <div className='portfolio-item portfolio-item-margin'>
                            <div className="portfolio-input-container">
                                <label><strong>{`Image ${imageUrls.length + 1}`}</strong></label>
                                <input
                                    type="text"
                                    placeholder="New image URL"
                                    value=""
                                    onChange={(e) => handleImageChange(imageUrls.length, e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <p style={{color: "red"}}>{errorMessages}</p>
                    <div className="btns-update add-margin-top">
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                    
                </form>
            )}

        </div>
    )
}