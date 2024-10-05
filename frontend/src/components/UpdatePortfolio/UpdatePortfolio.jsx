
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "./UpdatePortfolio.css"

export default function UpdatePortfolio({ initialImages = [], user_id }){
    const [isEditing, setIsEditing] = useState(false);  // edit/view mode
    // const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState(initialImages); 
    
    // axios.defaults.withCredentials = true; //for token auth
    // UseEffect to set initial images only when initialImages changes
    useEffect(() => {
        // Only set state if initialImages has changed
        if (initialImages.length !== imageUrls.length) {
            setImageUrls(initialImages);
        }
    }, [initialImages]); // Add initialImages as a dependency


    // adds a new image input
    // const handleAddImage = () => {
    //     setImageUrls([...imageUrls, ""]);  // adds a new empty input field
    // };

    // handles input changes for each image URL
    const handleImageChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value; // updates image URL at the specific index
        setImageUrls(newImageUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Provider in UpdateProviderPage", providerData)

        const validUrls = imageUrls.filter((url) => url.trim() !== ""); // only non-empty URLs

        const portfolioData = {
            portfolio: validUrls  // Only send portfolio data from this component
        };
        try {

            const response = await axios.post(`http://localhost:8000/provider/profile-customization/${user_id}/submit`, portfolioData);
            if (response.data.message === "Updated successfully") {
                console.log('Provider info updated successfully');
                setIsEditing(false);
                // navigate(`/profile-customization/${user_id}`);
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
        setImageUrls(initialImages); // resets unsaved changes
    };

    return(
        <div className="portfolio-section">
            <div className="customization-head">
                <div className="customization-text">
                    <h2>Portfolio</h2>
                    <p>Show off your best work to attract clients! Upload a portfolio of your past projects so they can see the quality of your services. Ensure it’s a true reflection of your creativity and expertise.</p>
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
                        <p>No images in the portfolio yet.</p>
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
                            // Map through existing images and display them in input fields
        
                            <div key={index} className='portfolio-item portfolio-item-margin'>
                                <div className="portfolio-input-container">
                                    <label><strong>{`Image ${index + 1}`}</strong></label>
                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        value={url}  // Show the current URL in the input
                                        onChange={(e) => handleImageChange(index, e.target.value)}  // Update the corresponding URL
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
                                    onChange={(e) => handleImageChange(imageUrls.length, e.target.value)}  // Handle new image URL
                                />
                            </div>
                            {/* <img src={url} alt={`Portfolio ${index + 1}`} style={{ width: '200px', height: 'auto', margin: '10px' }} /> */}
                        </div>
                    </div>
                    <div className="btns-update add-margin-top">
                        {/* <button type="button" onClick={handleAddImage}>Add new image</button> */}
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                    
                </form>
            )}

        </div>
            

        
    )
}
