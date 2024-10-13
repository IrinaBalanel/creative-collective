import "./Header.css"
import LogoWhite from "../LogoWhite"
// import {Link} from "react-router-dom"
import {HashLink as Link} from "react-router-hash-link"
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {capitalizeFirstLetter} from "../../functions"
import { UserContext } from "../../context/UserContext";
import Logout from "../Logout";

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
                <button type="button" className={`menu-toggle ${menuVisible ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <ul className={`nav-list ${menuVisible ? 'show' : ''}`}>
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="btn-dropdown">Professionals <i aria-label="dropdown button" className="bi bi-caret-down-fill"></i></Link>
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
                    </li>
                    <li className="nav-item">
                        <Link smooth to="/#contact">Contact</Link>
                    </li>

                    {user && user.role === "client" && (
                        <>
                            <li className="nav-item">
                                <Link to={`/profile/${user._id}`} className="">My Favorites</Link>
                            </li>
                            {/* <li className="nav-item logout-small-menu">
                                
                            </li> */}
                            <Logout/>
                        </>
                        
                    )}
                    {user && user.role === "provider" && (
                        <>
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }} >Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light">Login</Link>
                            </li>
                        </>
                        
                    )}
                    {user && user.role === "admin" && (
                        <>
                            <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }}>Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light">Login</Link>
                            </li>
                        </>
                        
                    )}

                    {!user && (
                        <>
                        <li className="nav-item provider-access-link">
                                <Link to="/login" state={{ fromProvider: true }}>Already a Provider?</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn-light">Login</Link>
                            </li>
                        </>
                        
                    )}
                    
                </ul>
                
                   
                
            </nav>
        </header>
    )
}