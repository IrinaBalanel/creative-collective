// import {Link} from "react-router-dom"
import Logout from "../../components/Logout"
import axios from "axios";
import Header from "../../components/Header/Header";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import { useParams } from 'react-router-dom';
import {useState, useEffect, useContext} from "react";
import { baseUrl } from "../../config";

export default function Favorites() {
	const [favoriteProfs, setFavoriteProfs] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { user_id } = useParams();

    // removes provider from favorites array
    const removeFromFavorites = (providerId) => {
        setFavoriteProfs(prevFavorites => prevFavorites.filter(prof => prof._id !== providerId));
    };

	useEffect(() => {
		const getFavorites = async () => {
			console.log("User id before sending request: ", user_id);
			try {
				setIsLoading(true);
				const response = await axios.get(`${baseUrl}/client/my-favorite-professionals/${user_id}`, {withCredentials: true});
				console.log(response.data);
				setFavoriteProfs(response.data.favorite_professionals);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setError("Error");
				setIsLoading(false);
			}
		}
		getFavorites();
	}, [user_id]);


	// useEffect(() => {
	// 	const getCategories = async () => {
			
	// 		try {
	// 			const response = await axios.get(`http://localhost:8000/professionals/${category}`, {withCredentials: true});
				
	// 			const data = response.data;
	// 			console.log(data);
	// 			setProfessionals(data);
	// 			if(!professionals){
	// 				setError("No professionals found")
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 			setError("Error");
	// 		}
	// 	}
	// 	getProfessionals();
	// }, [category]);

  	return(
		<>
			<Header/>
			<main id="main">
				<h1>My Favorite Professionals</h1>
				{!isLoading ? (
				<div className="prof-list">
					{error ? (
						<p><i>Error fetching favorite professionals.</i></p>
					) : (
						<></>
					)}
					{favoriteProfs.length > 0 ? (
						favoriteProfs.map((professional) => (
							<ProviderCard 
							key={professional._id} 
							professional={professional} 
							providerId={professional._id}
							category={professional.creative_category_id.category} 
							onRemove={removeFromFavorites}
							isFavorite={true}  // Pass as a favorite
							/>
						))
					) : (
						<p><i>No favorite professionals found.</i></p>
					)}
				</div>
				) : (
					<p><i>Loading favorite professionals...</i></p>
				)}
			</main>
		
		</>
    
  	)
}