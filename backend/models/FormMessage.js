const mongoose = require("mongoose");

const FormMessageSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, maxlength: 255, required: true },
    isRead: { type: Boolean, default: false}
});
    
const FormMessage = mongoose.model("FormMessage", FormMessageSchema, "form_messages");

module.exports = FormMessage;