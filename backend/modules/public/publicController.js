const Client = require("../../models/Client");
const User = require("../../models/User");
const Provider = require("../../models/Provider");
const ProviderCategory = require("../../models/ProviderCategory");

async function getCategories() {
    try {
        // Fetch all users from the database
        const categories = await ProviderCategory.find()
        //console.log(categories);
        return categories; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllProfessionals() {
    try {
        // Fetch all users from the database
        const professionals = await Provider.find()
        console.log(professionals);
        return professionals; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProfessionalsByCat(category) {
    try {
        // Fetch all users from the database
        const professionals = await Provider.find()
        .populate({
            path: "creative_category_id",
            select: "category",
            match: { category: {$in: category}}
        })
        .exec();
        const filteredProfessionals = professionals.filter(prof => prof.creative_category_id !== null);
        console.log(filteredProfessionals);
        return filteredProfessionals; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getCategories,
    getAllProfessionals,
    getProfessionalsByCat
}