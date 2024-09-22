const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // references the User collection
        required: true
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    favorite_professionals: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider', // references the Provider collection
        default: []
    }]
});
    
const Client = mongoose.model("Client", ClientSchema, "clients");

module.exports = Client;