import SideNav from "../../components/SideNav/SideNav";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import UpdateProviderInfo from "../../components/UpdateProviderInfo/UpdateProviderInfo";

export default function ProviderPageCustom(){

    axios.defaults.withCredentials = true; //for token auth
    const { user_id } = useParams(); 
    const [providerData, setProviderData] = useState(null);
    const [categories, setCategories] = useState([]); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const providerResponse = await axios.get(`http://localhost:8000/provider/profile-customization/${user_id}`, {
                    withCredentials: true,
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                // Fetch categories data
                const categoriesResponse = await axios.get('http://localhost:8000/provider/categories');

                setProviderData(providerResponse.data);
                setCategories(categoriesResponse.data);
                
                console.log(providerResponse.data);
                console.log(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching provider data:', error);
                setError('Failed to fetch provider data');
            }
        };
        if (user_id) {
            fetchProviderData();
        }
    }, [user_id]);
    if (!providerData) {
        return <p>No provider data found.</p>;
    }
    if (error) return <p>{error}</p>;
    return(
        <>
            <SideNav/>
            <main className="main">
                <h1>Profile Page Customization</h1>
                <UpdateProviderInfo
                    provider={providerData}
                    user_id={providerData.user_id._id}
                    categories={categories}
                    
                />
                
                {/* {providerData ? (
                    <>
                        
                            
  
                        
                    </>    
                ) : (
                    <p style={{ color: "red" }}>{error}</p>         
                )} */}



                
            </main>
            
        </>
        

        
    )
}
