import "./Header.css"
import LogoWhite from "../LogoWhite"
import {Link} from "react-router-dom"
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {capitalizeFirstLetter} from "../../functions"
import { UserContext } from "../../context/UserContext";
import Logout from "../Logout";

export default function Header(){
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);
    //console.log(user);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/');
                const data = response.data;
                console.log(data);
                setCategories(data);
            } catch (error) {
                //console.log(error);
                setError("Error");
            }
        }
        getCategories();
    }, []);

    return(
        <header id="header">
            <nav className="nav">
                <Link to="/"><LogoWhite/></Link>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <Link className="btn-dropdown">Professionals  <i aria-label="dropdown button" className="bi bi-caret-down-fill"></i></Link>
                            <div className="dropdown-content">
                                <Link to="/professionals">All Professionals</Link>
                                {
                                    categories.map((category) => (
                                        <Link to={`/professionals/${category.category}`} key={category._id}>
                                            {capitalizeFirstLetter(category.category)}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to="/#contact">Contact</Link>
                    </li>

                    {user && user.role === "client" && (
                        <>
                            <li className="nav-item">
                                <Link to="/appointments" className="">Appointments</Link>
                            </li>
                            <li className="nav-item">
                                    <Link to="/profile" className="">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Logout/>
                            </li>
                        </>
                        
                    )}
                    {user && user.role === "provider" && (
                        <ul className="nav-list">
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }} >Are You a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light">Login</Link>
                            </li>
                            
                        </ul>
                        
                    )}
                    {user && user.role === "admin" && (
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to="/login" state={{ fromProvider: true }}>Are You a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light">Login</Link>
                            </li>
                        </ul>
                        
                    )}

                    {!user && (
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to="/login" state={{ fromProvider: true }}>Are You a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light">Login</Link>
                            </li>
                        </ul>
                        
                    )}
                    
                </ul>
                
                   
                
            </nav>
        </header>
    )

}