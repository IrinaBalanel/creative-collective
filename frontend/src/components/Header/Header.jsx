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
                    <Link to="/" role="menulink"><li className="nav-item">
                        Home
                    </li></Link>
                    <Link className="btn-dropdown">
                        <li className="nav-item dropdown">
                            Professionals <i aria-label="dropdown button" className="bi bi-caret-down-fill" role="dropdown"></i>
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
                    </Link>
                    <Link smooth to="/#contact" role="menulink">
                        <li className="nav-item">
                        Contact
                        </li>
                    </Link>

                    {user && user.role === "client" && (
                        <>
                            <Link to={`/profile/${user._id}`} role="menulink">
                                <li className="nav-item">
                                    My Favorites
                                </li>
                            </Link>
                            {/* <li className="nav-item logout-small-menu">
                                
                            </li> */}
                            <Logout/>
                        </>
                        
                    )}
                    {user && user.role === "provider" && (
                        <>
                            <Link to="/admin/login" role="menulink">
                                <li className="nav-item">
                                    Admin
                                </li>
                            </Link>
                            <Link to="/login" state={{ fromProvider: true }} role="menulink">
                                <li className="nav-item provider-access-link">
                                    Already a Provider?
                                </li>
                            </Link>
                            <Link to="/login" className="btn-light" role="menulink"> 
                                <li className="nav-item">
                                    Login
                                </li>
                            </Link>
                        </>
                        
                    )}
                    {user && user.role === "admin" && (
                        <>
                            <Link to="/admin/login" role="menulink">
                                <li className="nav-item">
                                    Admin
                                </li>
                            </Link>
                            <Link to="/login" state={{ fromProvider: true }} role="menulink">
                                <li className="nav-item provider-access-link">
                                    Already a Provider?
                                </li>
                            </Link>
                            <Link to="/login" className="btn-light" role="menulink"> 
                                <li className="nav-item">
                                    Login
                                </li>
                            </Link>
                        </>
                        
                    )}

                    {!user && (
                        <>
                            <Link to="/admin/login" role="menulink">
                                <li className="nav-item">
                                    Admin
                                </li>
                            </Link>
                            <Link to="/login" state={{ fromProvider: true }} role="menulink">
                                <li className="nav-item provider-access-link">
                                    Already a Provider?
                                </li>
                            </Link>
                            <Link to="/login" className="btn-light" role="menulink"> 
                                <li className="nav-item">
                                    Login
                                </li>
                            </Link>
                            {/* <li className="nav-item">
                                <Link to="/admin/login" role="menulink">Admin</Link>
                            </li>
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }} role="menulink">Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light" role="menulink">Login</Link>
                            </li> */}
                        </>
                        
                    )}
                    
                </ul>
                
                   
                
            </nav>
        </header>
    )
}