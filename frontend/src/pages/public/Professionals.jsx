import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./Professionals.css"
import ProviderCard from "../../components/ProviderCard/ProviderCard"
import { useParams, useLocation } from 'react-router-dom';
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import { capitalizeFirstLetter } from "../../functions";
import { UserContext } from "../../context/UserContext";
import { baseUrl } from "../../config";

export default function Professionals({ title }){
    const { category } = useParams();
    const [professionals, setProfessionals] = useState([]);
    const [error, setError] = useState(null); 
    const [favoriteIds, setFavoriteIds] = useState([]); // Store favorite provider IDs
	const { user } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        const getProfessionals = async () => {
            console.log("base url", baseUrl);
            try {
                let response;
                if(category){
                    response = await axios.get(`${baseUrl}/professionals/${category}`);
                } else{
                    response = await axios.get(`${baseUrl}/professionals`);
                }
                
                const data = response.data;
                //console.log(data);
                setProfessionals(data);
                if(!professionals){
                    setError("No professionals found")
                }
            } catch (error) {
                console.log(error);
                setError("Error");
            }
        }
        getProfessionals();
    }, [category]);

    // Conditional rendering for the title
    const renderTitle = () => {
        if (category) {
            return <h1>{capitalizeFirstLetter(category)}</h1>;
        } else if (title) {
            return <h1>{title}</h1>;
        }
    };

    // Fetch user's favorite provider IDs
    useEffect(() => {
        const getFavoriteIds = async () => {
            // if (!user || !user._id) {
            //     console.error("User ID is undefined.");
            //     return;
            // }
            try {
                const response = await axios.get(`${baseUrl}/client/my-favorite-professionals/${user._id}`, { withCredentials: true });
                console.log("user's favorite provider IDs", response.data.favorite_professionals);
                setFavoriteIds(response.data.favorite_professionals.map(fav => fav._id));
            } catch (error) {
                console.log(error);
                //setError("Error fetching favorite professionals");
            }
        };
        if (user && user._id) {
            getFavoriteIds();
        }
    }, [user, location]);

    if (error) return <div>{error}</div>;
    return(
        <>
            <Header/>
            <main id="main">
                <div id="prof">
                    {renderTitle()}
                    <div className="prof-list">
                        {professionals.length > 0 ? (
                            professionals.map((professional) => (
                                <ProviderCard 
                                key={professional._id} 
                                professional={professional} 
                                providerId={professional._id}
                                isFavorite={favoriteIds.includes(professional._id)}
                                />
                            ))
                        ) : (
                            <p><i>No professionals found.</i></p>
                        )}
                    </div>
                    
                </div>
            </main>
            <Footer/>
        </>
        
    )
}