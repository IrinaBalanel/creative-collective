import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import ProviderInfo from "../../components/ProviderInfo/ProviderInfo"
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom"
import ProviderPortfolio from "../../components/ProviderPortfolio/ProviderPortfolio";
import ProviderServices from "../../components/ProviderServices/ProviderServices";
import { baseUrl } from "../../config";

export default function ProviderDetails(){

    const { category, id } = useParams();
    const [providerData, setProviderData] = useState();
    const [error, setError] = useState(null); 

    useEffect(() => {
        const getProviderData = async () => {
            
            try {
                const response = await axios.get(`${baseUrl}/professionals/${category}/${id}`);
                const data = response.data;
                // console.log(data);
                console.log(data.socials);
                setProviderData(data);
                if(!providerData){
                    setError("No professional found")
                }
            } catch (error) {
                console.log(error);
                setError("Error");
            }
        }
        getProviderData();
    }, [category, id]);

    
    return(
        <>
            <Header/>
            <main id="main">
                {providerData ? (
                    <>
                        <ProviderInfo
                            firstName={providerData.first_name} 
                            lastName={providerData.last_name}
                            specialization={providerData.creative_category_details}
                            location={providerData.location}
                            bio={providerData.bio}
                            phone={providerData.phone_number} 
                            email={providerData.user_id.email} 
                            verified={providerData.verified}
                            profileImage={providerData.profile_image}
                            socials={providerData.socials}
                        />
  
                        {providerData.portfolio && providerData.portfolio.length > 0 && (
                            <ProviderPortfolio
                                images={providerData.portfolio}
                            />
                        ) }

                        {providerData.services && providerData.services.length > 0 ? (
                            <ProviderServices
                                services={providerData.services}
                            />
                        ) : (
                            <Navigate to="/professionals"/>
                        )}
                    </>    
                ) : (
                    <p style={{ color: "red" }}>{error}</p>         
                )}



                
            </main>
            <Footer/>
        </>
        
    )
}