import "./ProviderServices.css"
import {Link, Navigate, useNavigate} from "react-router-dom"
import { PopupButton } from "react-calendly";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function ProviderServices({ services }){

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleBookAppointment = (calendlyUrl) => {
        if (!user || user.role !== "client") {
            navigate("/login");
        }
    };

    return(
        <div className="services"> 
            <h2>Services</h2>
            <div className="service-cards">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-container">
                            <img className="service-img" key={index} src={service.service_thumbnail_url} alt={`Portfolio ${index}`} />
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
                            {/* <div className="btn-container"><Link className="btn" to={service.calendly_event_url}>Book appointment</Link></div> */}
                            <div className="btn-container">
                                {/* <PopupButton className="btn"
                                    url={service.calendly_event_url} 
                                    rootElement={document.getElementById("root")} text="Book appointment"
                                /> */}
                                
                                {!user || user.role !== "client" ? (
                                    <button
                                        className="btn"
                                        onClick={() => handleBookAppointment(service.calendly_event_url)}
                                    >
                                        Book appointment
                                    </button>
                                ) : (
                                    <PopupButton
                                        className="btn"
                                        url={service.calendly_event_url}
                                        rootElement={document.getElementById("root")}
                                        text="Book appointment"
                                    />
                                )}
                                
                            </div>
                        </div>
                        
                    </div>
                    
                ))}
            </div>
        </div>
        
    )
}