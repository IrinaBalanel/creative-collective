import {useState, useEffect} from "react";
import axios from "axios";
import "./FindByCat.css";
import {Link} from "react-router-dom"
import {capitalizeFirstLetter} from "../../functions"

export default function FindByCat(){
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

    return (
        <div id="categories">
            <h2>Find the perfect talent by category</h2>
            <p>Explore a variety of creative professionals by category, all in one place</p>
            <div className="categories">
                {
                    categories.map((category) => (
                        <Link to={`/professionals/${category.category}`} key={category._id} className="category">
                            <div className="img-container">
                                <img src={category.image_url} alt={category.category} role="presentation"/>
                            </div>
                            <h3>{capitalizeFirstLetter(category.category)}</h3>
                        </Link>
                    ))
                }
            </div>
                
        </div>
    )
}