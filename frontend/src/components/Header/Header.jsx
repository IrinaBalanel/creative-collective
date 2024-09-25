import "./Header.css"
import LogoWhite from "../LogoWhite"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react";
import axios from "axios";
import {capitalizeFirstLetter} from "../../functions"

export default function Header(){
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null); 


    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/');
                const data = response.data;
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.log(error);
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
                    {/* <li className="nav-item">
                        <Link to="/professionals">Professionals</Link>
                    </li> */}
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