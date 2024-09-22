const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
	user_id: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User', 
		required: true 
	},
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	phone_number: { type: String, required: true },
	bio: { type: String, default: null }, 
	creative_type: { 
		type: String, 
		enum: ['Photographer', 'Stylist', 'Makeup Artist', 'Hair Stylist', 'Setting Decorator'],
		default: null
	},
	creative_type_details: { type: String, default: null },
	address: { type: String, default: null },
	portfolio: { type: [String], default: [] },
	verified: { type: Boolean, default: false }
});
  
const Provider = mongoose.model('Provider', ProviderSchema, "providers");

module.exports = Provider;