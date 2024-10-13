const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
        service_name: { 
        type: String, 
        required: true 
    },
    service_description: { 
        type: String,
        maxlength: 255,
        required: true 
    },
    service_price: { 
        type: mongoose.Schema.Types.Decimal128, 
        required: true 
    },
    service_duration: { 
        type: mongoose.Schema.Types.Decimal128, 
        required: true 
    },
    service_thumbnail_url: { 
        type: String, 
        required: true 
    },
    service_location: { 
        type: String, 
        required: true 
    },
    calendly_event_url: { 
        type: String, 
        required: true
    },
    provider_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Provider",  // Reference to the providers table
        required: true 
    }
});

const Service = mongoose.model('Service', ServiceSchema);

//SEED TABLE
// const seedServices = async () => {
// 	const services = [
// 		{ 
//             service_name: "Photoshoot consultation", 
//             service_description: "Lorem ipsum dolor sit amet consectetur. Ultrices accumsan cras blandit euismod felis sit scelerisque porttitor fames. Amet cursus libero ligula tellus tristique enim cras nisl. Vestibulum sapien neque etiam risus aliquam lacus pellentesque.", 
//             service_price: 50.00, 
//             service_duration: 1.00, 
//             service_thumbnail_url: "https://images.unsplash.com/photo-1667058870475-ec3a4464f6f6?q=80&w=4700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
//             service_location: "Online", 
//             calendly_event_url: "https://calendly.com/irina-cowork/30min", 
//             provider_id:"66f1e735fbd5ddfab25fd62b"
//         },
//         { 
//             service_name: "Studio Portrait Photoshoot", 
//             service_description: "Lorem ipsum dolor sit amet consectetur. Ultrices accumsan cras blandit euismod felis sit scelerisque porttitor fames. Amet cursus libero ligula tellus tristique enim cras nisl. Vestibulum sapien neque etiam risus aliquam lacus pellentesque. Cursus mauris egestas facilisis fermentum id. Enim aenean cursus odio sed tellus est. Malesuada felis diam sit.", 
//             service_price: 80.00, 
//             service_duration: 1.5, 
//             service_thumbnail_url: "https://images.pexels.com/photos/7206507/pexels-photo-7206507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
//             service_location: "25, Selby Street, Toronto, Canada", 
//             calendly_event_url: "https://calendly.com/irina-cowork/30min", 
//             provider_id:"66f1e735fbd5ddfab25fd62b"
//         },
// 	];
  
// try {
// 	const existingServices = await Service.find();

// 	// Check the length of the fetched documents
// 	if (existingServices.length === 0) {
// 		await Service.insertMany(services);
// 		console.log("Services seeded successfully");
// 	} else {
// 		console.log("Services already exist, no need to seed.");
// 	}
// } catch (error) {
// 	console.error("Error seeding services:", error);
// }
// };

  
// seedServices();



module.exports = Service;
