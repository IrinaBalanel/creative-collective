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
	creative_category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProviderCategory', 
        default: null
    },
	creative_category_details: { type: String, default: null },
	location: { type: String, default: null },
	portfolio: { type: [String], default: [] },
	isSearchable: { 
        type: Boolean, 
        default: false
    },
	verified: { type: Boolean, default: false }
});
  
const Provider = mongoose.model('Provider', ProviderSchema, "providers");

module.exports = Provider;