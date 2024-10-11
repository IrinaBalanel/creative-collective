import axios from "axios";
import "./ContactForm.css";
import {useState} from "react";
import {Link} from "react-router-dom"


export default function ContactForm(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { 
            full_name: name, 
            email: email, 
            message: message
        };
        try {
            console.log("Form Data:", formData);
            const response = await axios.post(`http://localhost:8000/contact-us-form/submit`, {formData});
            
            console.log('Response from contact us endpoint:', response.data);

            if(response.data.message==="Submitted message successfully"){
                // clears the form fields after submission
                setName('');
                setEmail('');
                setMessage('');
                
                setIsSubmitted(true); // updates the button text to "Submitted"
            }
            if(response.data.error){
                setErrorMessage("Something went wrong. Try again.")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //resets the button if the user starts typing again
    const handleInputChange = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="contact-form-section">
            <div className="contact-form-text">
                <h2 className="contact-form-title">Contact us</h2>
                <p className="contact-form-p">Use the contact form to send us your message or reach out directly via email</p>
                <Link to="mailto:irina.cowork@gmail.com" className="contact-form-email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
                    creative.collective@gmail.com
                </Link>
            </div>
            <form id="contact-form" onSubmit={handleSubmit}>
                <div className="input">
                    {/* <label htmlFor="name">Name<span className="asterisk"> *</span></label> */}
                    <input 
                        type="text" id="name" placeholder="Full Name" 
                        value={name}
                        onChange={(e) => {setName(e.target.value); handleInputChange();}}
                        required 
                    />
                    <input type="email" id="email" placeholder="Email" 
                        value={email}
                        onChange={(e) => {setEmail(e.target.value); handleInputChange();}}
                        required 
                    />
                </div>
                <div className="input">
                    {/* <label htmlFor="message">Message<span className="asterisk"> *</span></label> */}
                    <textarea id="message" placeholder="Leave your message here... (up to 255 characters)" 
                        required
                        maxLength={255}
                        value={message}
                        onChange={(e) => {setMessage(e.target.value); handleInputChange();}}
                    ></textarea>
                </div>
                <div id="submit-btn-container">
                    <button id="btn-submit-msg" type="submit" 
                        className={`btn-filled ${isSubmitted ? 'submitted' : ''}`}
                        disabled={isSubmitted}
                    >
                        {isSubmitted ? 'Submitted!' : 'Submit'}
                    </button>
                </div>
                {errorMessage ? (
                    <p style={{color:"red", textAlign: "center"}}>{errorMessage}</p>
                ) : (
                    null
                )}
                
            </form>
        </div>
        
    )
}