import "./BecomeProvider.css"
import {Link} from "react-router-dom"

export default function BecomeProvider(){
    return(
        <div id="become-provider">
            <h2>Are you a creative professional?</h2>
            <p>Share your expertise and boost your brand on Creative Collective!</p>
            <div className="become-provider-instructions">
                <div className="demo-provider">
                    <div id="messenger"><img src="./messenger.png" alt="Hey there! I'm Issac Davis, a stylist on Creative Collective! I leveled up my business — now it's your turn! Join the Collective today!"/></div>
                    <div className="img-container">
                        <img src="./provider.png" alt="Portrait of Issac Davis, a stylish man wearing a black leather jacket and a fedora hat"/>
                    </div>
                </div>
                <div className="steps">
                    <div className="step">
                        <h3><i className="bi bi-1-circle" aria-hidden="true"></i>Register an Account</h3>
                        <p>Create an account and customize your provider page and portfolio.</p>
                    </div>
                    <div className="step">
                        <h3><i className="bi bi-2-circle" aria-hidden="true"></i>Link Your Calendly</h3>
                        <p>Sync your availability by linking your Calendly account for seamless bookings.</p>
                    </div>
                    <div className="step">
                        <h3><i className="bi bi-3-circle" aria-hidden="true"></i>Set Up Your Services</h3>
                        <p>Add details like duration, price, and location, so the clients can find you and book.</p>
                    </div>
                    <div className="step">
                        <h3><i className="bi bi-4-circle" aria-hidden="true"></i>Grow Your Business </h3>
                        <p>Receive your first bookings and manage everything in one place.</p>
                    </div>
                    
                </div>
            </div>
            <Link to="/login" state={{ fromProvider: true }} id="btn-become-provider" className="btn-link">Join as Provider</Link>
        </div>
    )
}