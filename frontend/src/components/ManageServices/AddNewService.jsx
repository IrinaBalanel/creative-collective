import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewService({ provider_id, onServiceAdded, isEditing, setIsEditing, onCancel }) {
    const [newService, setNewService] = useState({
        service_name: '',
        service_description: '',
        service_price: '',
        service_duration: '',
        service_thumbnail_url: '',
        service_location: '',
        calendly_event_url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Debugging to see if the values exist before sending
        console.log("New Service Data:", newService);

        // Convert service_price and service_duration to numbers
        const convertedServicePrice = parseFloat(newService.service_price);
        const convertedServiceDuration = parseFloat(newService.service_duration);
        console.log(convertedServicePrice, convertedServiceDuration);

        const serviceData = {
            ...newService,
            service_price: convertedServicePrice,
            service_duration: convertedServiceDuration
        };
        console.log("Service Data with converted decimals:", serviceData);

        try {
            const response = await axios.post(`http://localhost:8000/provider/profile-customization/add-service/submit`, {serviceData, provider_id});
            onServiceAdded(response.data.newService);  // Trigger the update in ManageServices
            console.log(response.data.newService)
            setNewService({  // Reset form
                service_name: '',
                service_description: '',
                service_price: '',
                service_duration: '',
                service_thumbnail_url: '',
                service_location: '',
                calendly_event_url: ''
            });

            
            // setIsEditing(false);

        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    return (
        <>
            {!isEditing ? (
                <div>
                    <button onClick={() => setIsEditing(true)}>Add New Service</button>
                </div>
            ) : (
                <div>
                    
                    <form id="service-update-form" onSubmit={handleSubmit}>
                        <div id="preview-pic-container">
                            <img className="preview-pic" src={newService.service_thumbnail_url} alt="Image Preview" />
                            <div className="image-url-container"><input className="input " type="text" name="service_thumbnail_url" placeholder="Thumbnail URL" value={newService.service_thumbnail_url} onChange={handleChange} required/></div>
                        </div>
                        <div className="udpate-inputs">
                            <p style={{color: "red"}}>* All fields are required.</p>
                            <div className="input"><input type="text" name="service_name" placeholder="Service Name" value={newService.service_name} onChange={handleChange} required /></div>
                            <div className="input">
                                <input type="text" name="service_price" placeholder="Price, e.g. 50" value={newService.service_price} onChange={handleChange} required />
                                <input type="text" name="service_duration" placeholder="Duration, e.g. 1.5" value={newService.service_duration} onChange={handleChange} required />
                            </div>
                            <div className="input">
                                <input type="text" name="service_location" placeholder="Address" value={newService.service_location} onChange={handleChange} required/>
                            </div>
                            <textarea name="service_description" placeholder="Service Description (up to 255 characters)" maxLength={255} value={newService.service_description} onChange={handleChange} required/>
                            <div className="input calendly-input">
                                <input type="text" name="calendly_event_url" placeholder="Calendly URL" value={newService.calendly_event_url} onChange={handleChange} required/>
                                <div id="get-calendly-url-container">
                                    <h4 className="get-calendly-url-text">
                                        <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                        </svg>
                                        How to get Calendly event URL? 
                                    </h4>
                                    <span className="get-calendly-url-tooltip">
                                        <p><strong>1.</strong>	Sign up at <strong>calendly.com</strong> (or log in if you have an account).</p>
                                        <p><strong>2.</strong>	Click <strong>“New Event Type”</strong> and set up your service. Name your event (e.g., “Photography Session”). Choose the duration and your availability. Add address where the service will be provided. Click “Save & Close” when you're done.</p>
                                        <p><strong>3.</strong>	On the dashboard, click <strong>“Share”</strong> next to your event and copy the link.</p>
                                        <p><strong>4.</strong>	Go back to your <strong>Provider Page Customization</strong> on Creative Collective and paste the copied link into the Calendly event URL field.</p>
                                        <p><strong>5.  That's it! Clients can now book with you directly.</strong></p>
                                    </span>
                                    
                                </div>
                            </div>
                            <div className="btns-update add-margin-top">
                                <button type="button" onClick={onCancel}>Cancel</button>
                                <button type="submit">Submit</button>
                                
                            </div>
                            
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}