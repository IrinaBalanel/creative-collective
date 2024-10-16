import "./Header.css"
import LogoWhite from "../LogoWhite"
// import {Link} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {capitalizeFirstLetter} from "../../functions"
import { UserContext } from "../../context/UserContext";
import Logout from "../Logout";
import { baseUrl } from "../../config";

export default function Header(){
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);
    //console.log(user);
    const [menuVisible, setMenuVisible] = useState(false);
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}`);
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
                <button type="button" className={`menu-toggle ${menuVisible ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle navigation">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <ul className={`nav-list ${menuVisible ? "show" : ""}`} role="menu">
                    <li className="nav-item">
                        <Link to="/" role="menulink">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="btn-dropdown">Professionals <i aria-label="dropdown button" className="bi bi-caret-down-fill" role="dropdown"></i></Link>
                        <div className="dropdown-content">
                            <Link to="/professionals" role="menulink">All Professionals</Link>
                            {
                                categories.map((category) => (
                                    <Link to={`/professionals/${category.category}`} key={category._id} role="menulink">
                                        {capitalizeFirstLetter(category.category)}
                                    </Link>
                                ))
                            }
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link smooth to="/#contact" role="menulink">Contact</Link>
                    </li>

                    {user && user.role === "client" && (
                        <>
                            <li className="nav-item">
                                <Link to={`/profile/${user._id}`} role="menulink">My Favorites</Link>
                            </li>
                            {/* <li className="nav-item logout-small-menu">
                                
                            </li> */}
                            <Logout/>
                        </>
                        
                    )}
                    {user && user.role === "provider" && (
                        <>
                            <li className="nav-item">
                                <Link to="/admin/login" role="menulink">Admin</Link>
                            </li>
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }} role="menulink">Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light" role="menulink">Login</Link>
                            </li>
                        </>
                        
                    )}
                    {user && user.role === "admin" && (
                        <>
                            <li className="nav-item">
                                <Link to="/admin/login" role="menulink">Admin</Link>
                            </li>
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }} role="menulink">Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light" role="menulink">Login</Link>
                            </li>
                        </>
                        
                    )}

                    {!user && (
                        <>
                            <li className="nav-item">
                                <Link to="/admin/login" role="menulink">Admin</Link>
                            </li>
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }} role="menulink">Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light" role="menulink">Login</Link>
                            </li>
                        </>
                        
                    )}
                    
                </ul>
                
                   
                
            </nav>
        </header>
    )
}