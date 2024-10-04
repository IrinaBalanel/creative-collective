import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"

export default function UpdateService({ provider_id, service, index, onServiceUpdated, onServiceDeleted, isEditing, setIsEditing, onCancel }) {
    const [serviceData, setServiceData] = useState({
        ...service,
        service_price: service.service_price?.$numberDecimal || service.service_price || '',
        service_duration: service.service_duration?.$numberDecimal || service.service_duration || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Convert price and duration back to Decimal128 format
        const convertedServicePrice = parseFloat(serviceData.service_price);
        const convertedServiceDuration = parseFloat(serviceData.service_duration);

        const updatedServiceData = {
            ...serviceData,
            service_price: convertedServicePrice,
            service_duration: convertedServiceDuration
        };

        try {
            const response = await axios.post(`http://localhost:8000/provider/profile-customization/update-service/${service._id}/submit`, {serviceData: updatedServiceData, provider_id});
            if (response.data.message === "Service updated successfully") {
                onServiceUpdated(response.data.updatedService, index);  // Trigger the update in ManageServices
                setIsEditing(false);
            }
            console.log(response.data.serviceData)
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };


    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/provider/profile-customization/delete-service/${service._id}/submit`);
            if (response.data.message === "Service deleted successfully") {
                onServiceDeleted(index);  // Trigger the update in ManageServices
            }
            console.log(response.data.serviceData)
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };
    

    return (
        <>
            {!isEditing ? (
                <div id="service-update">
                    <div className="service-card">
                        <div className="service-container">
                            <img className="service-img" src={service.service_thumbnail_url} alt="" />
                            <div className="overlay">
                                <div className="service-text">
                                    <p className="service-desc">{service.service_description}</p>
                                    <p className="service-dur">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
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
                    
                    
                </div>
            ) : (
                <div>
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="service_name" value={serviceData.service_name || ''} onChange={handleChange} required />
                        <textarea name="service_description" value={serviceData.service_description || ''} placeholder="Service Description (up to 255 characters)" maxLength={255} onChange={handleChange} required />
                        <input type="text" name="service_price" value={serviceData.service_price} onChange={handleChange} required />
                        <input type="text" name="service_duration" value={serviceData.service_duration} onChange={handleChange} required />
                        <input type="text" name="service_thumbnail_url" value={serviceData.service_thumbnail_url || ''} onChange={handleChange} required/>
                        <input type="text" name="service_location" value={serviceData.service_location || ''} onChange={handleChange} required/>
                        <input type="text" name="calendly_event_url" value={serviceData.calendly_event_url || ''} onChange={handleChange} required/>
                        <button type="submit">Update Service</button>
                    </form>
                    <h4 className="get-calendly-url">How to get Calendly event URL?</h4>
                </div>
            )}
        </>
    );
}