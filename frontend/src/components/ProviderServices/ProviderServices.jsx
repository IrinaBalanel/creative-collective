import "./ProviderServices.css"
import {Link} from "react-router-dom"

export default function ProviderServices({ services }){
    return(
        <> 
            <h1>services</h1>
            <div className="services">
                {services.map((service, index) => (
                    <div key={index}>
                        {/* <img key={index} src={service} alt={`Portfolio ${index}`} /> */}
                        <div>{service.service_name}</div>
                        <div>{service.service_description}</div>
                        <div>Location: {service.service_location}</div>
                        <div>Duration: {parseFloat(service.service_duration.$numberDecimal)} h</div>
                        <div>Price: ${parseFloat(service.service_price.$numberDecimal)}</div>
                        <Link to={service.calendly_event_url}>Book appointment</Link>
                    </div>
                    
                ))}
            </div>
        </>
        
    )
}