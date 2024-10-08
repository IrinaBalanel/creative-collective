import { useState } from 'react';
import AddNewService from './AddNewService';
import UpdateService from './UpdateService';
import "./ManageServices.css"

export default function ManageServices({ initialServices, provider_id}) {
    const [services, setServices] = useState(initialServices);
    const [isAddingNew, setIsAddingNew] = useState(false);  // tracks add mode
    const [editingIndex, setEditingIndex] = useState(null);  // tracks which service is being edited

    console.log("Services from MAnageServices: ", services)

    const handleServiceAdded = (newService) => {
        setServices([...services, newService]);
        setIsAddingNew(false);  // exits add mode
    };

    const handleServiceUpdated = (updatedService, index) => {
        const updatedServices = [...services];
        updatedServices[index] = updatedService;
        setServices(updatedServices);
        setEditingIndex(null);  // exits edit mode
    };

    const handleCancelAdd = () => {
        setIsAddingNew(false);  //cancels adding mode
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);  // cancels editing mode
    };

    const handleServiceDeleted = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);  // removs the service at the given index
        setServices(updatedServices);
    };

    return (
        <div className="manage-services">
            <div className="customization-head">
                <div className="customization-text">
                    <h2>Services</h2>
                    <p>List the services you offer and upload relevant images to give clients a clear idea of what they can expect. Add multiple services to match your full range of expertise. Integrate your Calendly URL to let clients book your services with ease.</p>
                </div>

                {!isAddingNew && (  // show button only if not already adding a service
                    <div>
                        <button onClick={() => setIsAddingNew(true)}>Add New</button>
                    </div>
                )}
            </div>
            {/* Add New Service */}
            {isAddingNew && (
                <AddNewService
                    provider_id={provider_id}
                    onServiceAdded={handleServiceAdded}
                    isEditing={isAddingNew}
                    setIsEditing={setIsAddingNew}
                    onCancel={handleCancelAdd}
                />
            )}
            {!services || services.length === 0 ? (
                <p><i>No images in the portfolio yet.</i></p>
            ) : (
                <div className="service-cards">
                    {/* Existing Services */}
                    {services.map((service, index) => (
                        <div key={service._id} id="service-update">
                            <UpdateService
                                provider_id={provider_id}
                                service={service}
                                index={index}
                                isEditing={editingIndex === index}
                                setIsEditing={() => setEditingIndex(index)}
                                onServiceUpdated={handleServiceUpdated}
                                onServiceDeleted={handleServiceDeleted}
                                onCancel={handleCancelEdit}
                            />
                        </div>
                    ))}
                </div>
            )}
            
            
        </div>
    );
}