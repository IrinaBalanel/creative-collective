import "./BecomeProvider.css"
import {Link} from "react-router-dom"

export default function BecomeProvider(){
    return(
        <div id="become-provider">
            <h2>Are you a creative professional?</h2>
            <p>Share your expertise and boost your brand on Creative Collective!</p>
            <div className="become-provider-instructions">
                <div className="demo-provider">
                    <div id="messenger"><img src="./messenger.png" alt="service provider's message" aria-label="Hey there! I'm Issac Davis, a stylist on Creative Collective! | leveled up my business — now it's your turn! Join the Collective today!"/></div>
                    <div className="img-container">
                        <img src="./provider.png" alt="Portrait of a service provider"/>
                    </div>
                </div>
                <div className="steps">
                    <div className="step">
                        {/* <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg> */}
                        
                        <h3><i className="bi bi-1-circle"></i>Register an Account</h3>
                        <p>Create an account and customize your provider page and portfolio.</p>
                    </div>
                    <div className="step">
                        {/* <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434"/>
                        </svg> */}
                        <h3><i className="bi bi-2-circle"></i>Link Your Calendly</h3>
                        <p>Sync your availability by linking your Calendly account for seamless bookings.</p>
                    </div>
                    <div className="step">
                        {/* <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434"/>
                        </svg> */}
                        <h3><i className="bi bi-3-circle"></i>Set Up Your Services</h3>
                        <p>Add details like duration, price, and location, so the clients can find you and book.</p>
                    </div>
                    <div className="step">
                        {/* <svg role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                        </svg> */}
                        <h3><i className="bi bi-4-circle"></i>Grow Your Business </h3>
                        <p>Receive your first bookings and manage everything in one place.</p>
                    </div>
                    
                </div>
                
            </div>
            
            <Link to="/login" state={{ fromProvider: true }} id="btn-become-provider" className="btn-link">Join as Provider</Link>
        </div>
    )
}