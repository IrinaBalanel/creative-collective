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
	profile_image: { type: String, default: null }, 
	bio: { type: String, maxlength: 255, default: null }, 
	creative_category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProviderCategory', 
        default: null
    },
	creative_category_details: { type: String, default: null },
	location: { type: String, default: null },
	socials: { 
        instagram: { 
            type: String, 
            default: null
        },
        facebook: { 
            type: String, 
            default: null
        },
        tiktok: { 
            type: String, 
            default: null
        },
        linkedin: { 
            type: String, 
            default: null
        }
    },
	portfolio: { type: [String], default: [] },
	verified: { type: Boolean, default: false },
	calendly_token: { type: String, default: null}
});
//virtual population should be used before the Provider model is compiled with mongoose.model().
ProviderSchema.virtual('services', {
    ref: 'Service',
    localField: '_id',
    foreignField: 'provider_id',
});

// enables virtual fields when converting to JSON
ProviderSchema.set('toObject', { virtuals: true });
ProviderSchema.set('toJSON', { virtuals: true });

const Provider = mongoose.model('Provider', ProviderSchema, "providers");

module.exports = Provider;