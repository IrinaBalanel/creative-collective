import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./Professionals.css"
import ProviderCard from "../../components/ProviderCard/ProviderCard"
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import { capitalizeFirstLetter } from "../../functions";

export default function Professionals({ title }){
    const { category } = useParams();
    const [professionals, setProfessionals] = useState([]);
    const [error, setError] = useState(null); 


    useEffect(() => {
        const getProfessionals = async () => {
            
            try {
                let response;
                if(category){
                    response = await axios.get(`http://localhost:8000/professionals/${category}`);
                } else{
                    response = await axios.get('http://localhost:8000/professionals');
                }
                
                const data = response.data;
                console.log(data);
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
                                <ProviderCard key={professional._id} professional={professional} />
                            ))
                        ) : (
                            <p>No professionals found</p>
                        )}
                    </div>
                    
                </div>
            </main>
            <Footer/>
        </>
        
    )
}