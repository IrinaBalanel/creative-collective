import SideNav from "../../components/SideNav/SideNav";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import UpdateProviderInfo from "../../components/UpdateProviderInfo/UpdateProviderInfo";
import UpdatePortfolio from "../../components/UpdatePortfolio/UpdatePortfolio";
import ManageServices from "../../components/ManageServices/ManageServices";
import ProfileButton from "../../components/ProfileButton"
import UpdateSocials from "../../components/UpdateSocials/UpdateSocials";
import { baseUrl } from "../../config";

export default function ProviderPageCustom(){

    axios.defaults.withCredentials = true; //for token auth
    const { user_id } = useParams(); 
    const [providerData, setProviderData] = useState(null);
    const [categories, setCategories] = useState([]); 
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [services, setServices] = useState([]);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const providerResponse = await axios.get(`${baseUrl}/provider/profile-customization/${user_id}`, {
                    withCredentials: true,
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                // Fetch categories data
                const categoriesResponse = await axios.get(`${baseUrl}/provider/categories`,  { withCredentials: true });

                setProviderData(providerResponse.data);
                setCategories(categoriesResponse.data);
                setPortfolioImages(providerResponse.data.portfolio);
                setServices(providerResponse.data.services);

                console.log("Personal info: ", providerResponse.data);
                console.log("Categories: ", categoriesResponse.data);
                console.log("Portfolio: ", providerResponse.data.portfolio);
                console.log("Services: ", providerResponse.data.services);
                console.log("User id: ", providerResponse.data.user_id._id);

                
            } catch (error) {
                console.log("Error fetching provider data:", error);
            }
        };
        if (user_id) {
            fetchProviderData();
        }
    }, [user_id]);
    // if (!providerData) {
    //     return <div>Loading...</div>;
    // }
    // if (error) return <p>{error}</p>;

    const handleProviderUpdate = (updatedProvider) => {
        setProviderData(updatedProvider);  // updates the parent state with the new provider data
    };

    return(
        <>
            <SideNav/>
            <main className="main">
                <ProfileButton/>
                <div id="page-custom">
                    <h1 className="dashboard-header-one">Profile Page Customization</h1>
                    {providerData ? (
                        <>
                            <UpdateProviderInfo
                                provider={providerData}
                                user_id={providerData.user_id._id}
                                categories={categories}
                                onProviderUpdated={handleProviderUpdate}
                            />

                            <UpdateSocials
                                user_id={providerData.user_id._id}
                                socials={providerData.socials}
                            />

                            <ManageServices
                                user_id={providerData.user_id._id}
                                provider_id={providerData._id}
                                initialServices={services}
                                
                            />
                            
                            <UpdatePortfolio
                                user_id={providerData.user_id._id}
                                initialImages={portfolioImages}
                            />
                        </>
                    ) : (
                        <p><i>Loading profile page...</i></p>
                    )}
                </div>
                


                
            </main>
            
        </>
        

        
    )
}
