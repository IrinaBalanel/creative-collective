import "./Header.css"
import LogoWhite from "../LogoWhite"
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <header id="header">
            <Link to="/"><LogoWhite/></Link>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/professionals">Professionals</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#contact">Contact</Link>
                    </li>
                </ul>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/login" className="btn-light">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
                   
                
            </nav>
        </header>
    )
        
    
}