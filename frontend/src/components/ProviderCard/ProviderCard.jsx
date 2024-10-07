import {Link} from "react-router-dom"
import "./ProviderCard.css"

export default function ProviderCard({ professional }){
    return(
        <> 
            <Link style={{textDecoration: 0, color:"black"}} to={`/professionals/${professional.creative_category_id.category}/${professional._id}`}>
                <div className="prof-card" key={professional._id}>
                    
                    <div className="img-container">
                        <img src={professional.profile_image} alt={`${professional.first_name} ${professional.last_name}`} role="presentation"/>
                    </div>
                    {professional.verified ? (
                        <div className="badge-provider-card">
                            <span className="verified">
                                <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                </svg>Verified Provider
                                <span className="tooltiptext">
                                    <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                    </svg>
                                    A provider gets verified when their credentials are reviewed and approved by Creative Collective, confirming they meet professional qualifications.
                                </span>
                            </span>
                        </div>
                    ) : null}
                    <div className="info-container">
                        <h2>{professional.first_name} {professional.last_name}</h2>
                        <p id="special-height">{professional.creative_category_details}</p>
                        <div className="prof-card-bottom">
                            <p className="location">
                                <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                {professional.location}
                            </p>
                            <div className="btn-container"><Link className="btn" to={`/professionals/${professional.creative_category_id.category}/${professional._id}`}>Services</Link></div>
                        </div>
                        
                    </div>
                    <div className="fav">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                    </div>
                    
                    
                </div>
            </Link>
        </>
        
    )
}