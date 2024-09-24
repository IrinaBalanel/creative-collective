const Client = require("../../models/Client");
const User = require("../../models/User");
const Provider = require("../../models/Provider");
const ProviderCategory = require("../../models/ProviderCategory");

async function getCategories() {
    try {
        // Fetch all users from the database
        const categories = await ProviderCategory.find()
        console.log(categories);
        return categories; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getCategories
}