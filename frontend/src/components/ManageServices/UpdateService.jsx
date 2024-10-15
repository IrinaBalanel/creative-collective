import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import { isValidUrl, isValidCalendlyUrl, isValidDecimal} from '../../functions';
import { baseUrl } from '../../config';

export default function UpdateService({ provider_id, service, index, onServiceUpdated, onServiceDeleted, isEditing, setIsEditing, onCancel }) {
    const [serviceData, setServiceData] = useState({
        ...service,
        service_price: service.service_price.$numberDecimal || service.service_price || "",
        service_duration: service.service_duration.$numberDecimal || service.service_duration || "",
    });
    const [errorMessages, setErrorMessages] = useState({}); 

    
    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setServiceData({ ...serviceData, [name]: value });
        
        // Validates decimals
        if (name === "service_price" || name === "service_duration") {
            if (!isValidDecimal(value)) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Please enter a valid decimal number (e.g., 1 or 1.5)."
                }));
            } else {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [name]: ""
                }));
            }
        }
        

        // Validates url
        if (name === "service_thumbnail_url") {
            if (!isValidUrl(value)) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    service_thumbnail_url: "Invalid image URL format"
                }));
            } else {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    service_thumbnail_url: ""
                }));
            }
        }
        
        // Validates Calendly url
        if (name === "calendly_event_url") {
            if (!isValidCalendlyUrl(value)) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    calendly_event_url: "Invalid Calendly URL format"
                }));
            } else {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    calendly_event_url: ""
                }));
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // if any fields have error messages with actual values
        const hasErrors = Object.values(errorMessages).some((msg) => msg);
        if (hasErrors) {
            return;
        }
        // converted price and duration to decimal format
        const convertedServicePrice = parseFloat(serviceData.service_price);
        const convertedServiceDuration = parseFloat(serviceData.service_duration);

        const updatedServiceData = {
            ...serviceData,
            service_price: convertedServicePrice,
            service_duration: convertedServiceDuration
        };
        
        try {
            const response = await axios.post(`${baseUrl}/provider/profile-customization/update-service/${service._id}/submit`, {serviceData: updatedServiceData, provider_id}, { withCredentials: true });
            if (response.data.message === "Service updated successfully") {
                onServiceUpdated(response.data.updatedService, index);  // triggers update in ManageServices
                console.log("Response mess: ", response.data.message)
                console.log("Updates Service on frontend", response.data.updatedService)
                setErrorMessages({});
            }
            
        } catch (error) {
            console.error('Error updating service:', error);
           
        }
    };

    const handleCancel = () => {
        // resets form data to the original service data
        setServiceData({
            ...service,
            service_price: service.service_price.$numberDecimal || service.service_price || '',
            service_duration: service.service_duration.$numberDecimal || service.service_duration || '',
        });
        onCancel(); // exits the editing mode by calling parent method
        setErrorMessages({});

    };
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/provider/profile-customization/delete-service/${service._id}/submit`,  { withCredentials: true });
            if (response.data.message === "Service deleted successfully") {
                onServiceDeleted(index);  // triggers update in ManageServices
            }
            console.log(response.data.serviceData)
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };
    


    return (
        <>
            {!isEditing ? (
                <div className="service-card">
                    <div className="service-container">
                        <img className="service-img" src={service.service_thumbnail_url} alt="" />
                        <div className="overlay">
                            <div className="service-text">
                                <p className="service-desc">{service.service_description}</p>
                                <p className="service-dur">
                                    <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                                    </svg>
                                    {parseFloat(service.service_duration.$numberDecimal)} h
                                </p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="service-card-info">
                        <div className="service-card-head">
                            <h3 className="service-name">{service.service_name}</h3>
                            <div className="service-price">${parseFloat(service.service_price.$numberDecimal)}</div>
                        </div>
                        <div className="service-loc">
                            <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                            </svg>
                            {service.service_location}
                        </div>
                        <div className="btn-container"><Link className="btn" to={service.calendly_event_url} target="_blank">View booking page</Link></div>
                        <div className="service-management-btns">
                            <button className="btn" onClick={() => setIsEditing(true)}>Update Service</button>
                            <button className="btn" onClick={handleDelete}>Delete Service</button>
                        </div>
                    </div>
                </div>
                    
                    

            ) : (
                <div>
                    <form id="service-update-form" onSubmit={handleSubmit}>
                        <div id="preview-pic-container">
                            <img className="preview-pic" src={serviceData.service_thumbnail_url} alt="Image Preview" />
                            <div className="image-url-container"><input type="text" name="service_thumbnail_url" value={serviceData.service_thumbnail_url || ''} placeholder="Thumbnail URL" onChange={handleChange} required/></div>
                        </div>
                        <div className="udpate-inputs">
                            <p style={{color: "#12009D", fontWeight: 500}}>* All fields are required.</p>
                            <div className="error-list">
                                {Object.entries(errorMessages).map(([key, message]) => (
                                    message && <p key={key} style={{ color: 'red' }}>{message}</p>
                                ))}
                            </div>
                            <div className="input"><input type="text" name="service_name" value={serviceData.service_name || ''} placeholder="Service Name" onChange={handleChange} required /></div>
                            <div className="inline-inputs">
                                <input type="text" name="service_price" value={serviceData.service_price} placeholder="Price, e.g. 50" onChange={handleChange} required />
                                <input type="text" name="service_duration" value={serviceData.service_duration} placeholder="Duration, e.g. 1.5" onChange={handleChange} required />
                            </div>
                            <div className="input">
                                <input type="text" name="service_location" value={serviceData.service_location || ''} placeholder="Address" onChange={handleChange} required/>
                            </div>
                            <textarea name="service_description" value={serviceData.service_description || ''} placeholder="Service Description (up to 255 characters)" maxLength={255} onChange={handleChange} required />
                            <div className="calendly-input">
                                <input type="text" name="calendly_event_url" value={serviceData.calendly_event_url || ''} placeholder="Calendly URL" onChange={handleChange} required/>
                                <div id="get-calendly-url-container">
                                    <h4 className="get-calendly-url-text" aria-describedby="calendly-tooltip" tabIndex={0}>
                                        <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                        </svg>
                                        How to get Calendly event URL? 
                                    </h4>
                                    <span id="calendly-tooltip" className="get-calendly-url-tooltip" role="tooltip">
                                        <p><strong>1.</strong>	Sign up at <strong>calendly.com</strong> (or log in if you have an account).</p>
                                        <p><strong>2.</strong>	Click <strong>“New Event Type”</strong> and set up your service. Name your event (e.g., “Photography Session”). Choose the duration and your availability. Add address where the service will be provided. Click “Save & Close” when you're done.</p>
                                        <p><strong>3.</strong>	On the dashboard, click <strong>“Share”</strong> next to your event and copy the link.</p>
                                        <p><strong>4.</strong>	Go back to your <strong>Provider Page Customization</strong> on Creative Collective and paste the copied link into the Calendly event URL field.</p>
                                        <p><strong>5.  That's it! Clients can now book with you directly.</strong></p>
                                    </span>
                                </div>
                            </div>
                            <div className="btns-update add-margin-top">
                                <button type="button" onClick={handleCancel}>Cancel</button>
                                <button type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}