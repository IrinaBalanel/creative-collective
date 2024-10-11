const mongoose = require('mongoose');

const credentialsSchema = new mongoose.Schema({
    provider_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Provider',  // Reference to the providers table
        required: true 
    },

    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProviderCategory',  // Reference to the categories table
        required: true 
    },

    file: { 
        type: String, 
        required: true
    },

    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending',
        required: true 
    },

    review_feedback: { 
        type: String, 
        default: null
    },

    submitted_at: { 
        type: Date, 
        default: Date.now
    }
});

const Credential = mongoose.model('Credential', credentialsSchema);
module.exports = Credential;