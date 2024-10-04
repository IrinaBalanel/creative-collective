import { useState } from 'react';
import AddNewService from './AddNewService';
import UpdateService from './UpdateService';
import "./ManageServices.css"
//user_id
export default function ManageServices({ initialServices, provider_id }) {
    const [services, setServices] = useState(initialServices);
    const [isAddingNew, setIsAddingNew] = useState(false);  // Track add mode
    const [editingIndex, setEditingIndex] = useState(null);  // Track which service is being edited


    // Handle adding a new service
    const handleServiceAdded = (newService) => {
        setServices([...services, newService]);
        setIsAddingNew(false);  // Exit add mode
    };

    // Handle service updates
    const handleServiceUpdated = (updatedService, index) => {
        const updatedServices = [...services];
        updatedServices[index] = updatedService;
        setServices(updatedServices);
        setEditingIndex(null);  // Exit edit mode
    };

    const handleCancelAdd = () => {
        setIsAddingNew(false);  // Cancel adding mode
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);  // Cancel editing mode
    };

    const handleServiceDeleted = (index) => {
        const updatedServices = services.filter((_, i) => i !== index);  // Remove the service at the given index
        setServices(updatedServices);  // Update the state
    };

    return (
        <div className="manage-services">
            <div className="customization-head">
                <div className="customization-text">
                    <h2>Services</h2>
                    <p>List the services you offer and upload relevant images to give clients a clear idea of what they can expect. Add multiple services to match your full range of expertise. Integrate your Calendly URL to let clients book your services with ease.</p>
                </div>
            
                {!isAddingNew && (  // Show "Add New" button only if not already adding a service
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
            <div className="service-cards">
                {/* Existing Services */}
                {services.map((service, index) => (
                    <div key={service._id}>
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
            
        </div>
    );
}