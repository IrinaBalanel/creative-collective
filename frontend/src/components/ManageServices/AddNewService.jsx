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

        try {
            const response = await axios.post(`http://localhost:8000/provider/profile-customization/add-service/submit`, {newService: serviceData, provider_id});
            onServiceAdded(response.data.newService);  // Trigger the update in ManageServices
            
            setNewService({  // Reset form
                service_name: '',
                service_description: '',
                service_price: '',
                service_duration: '',
                service_thumbnail_url: '',
                service_location: '',
                calendly_event_url: ''
            });

            setIsEditing(false);

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
                            <div><input className="input image-url-container" type="text" name="service_thumbnail_url" placeholder="Thumbnail URL" value={newService.service_thumbnail_url} onChange={handleChange} required/></div>
                        </div>
                        <div className="udpate-inputs">
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
                                <h4 className="get-calendly-url">How to get Calendly event URL?</h4>
                            </div>
                            <div className="btns-update">
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