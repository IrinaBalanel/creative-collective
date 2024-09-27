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
        // Fetches all users from the database
        const professionals = await Provider.find()
        //console.log(professionals);
        return professionals; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProfessionalsByCat(category) {
    try {
        const professionals = await Provider.find()
        .populate({
            path: "creative_category_id",
            select: "category",
            match: { category: {$in: category}}
        })
        .populate({
            path: "user_id",
            match: { status: 'active' }, // returns users with status 'active'
            select: 'status'
        })
        .exec();
        // Filters providers without a valid category or an active user
        const filteredProfessionals = professionals.filter(prof => prof.creative_category_id !== null && prof.user_id !== null);
        //console.log(filteredProfessionals);
        return filteredProfessionals; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProfessionalByCatAndId(category, id) {
    try {
        const professional = await Provider.findById(id)
        .populate({
            path: "creative_category_id",
            select: "category",
            match: { category: category}
        })
        .populate({
            path: "user_id",
            match: { status: 'active' }, // returns users with status 'active'
            select: 'status email'
        })
        .exec();
        // Filters providers without a valid category or an active user
        if (!professional || professional.creative_category_id === null || professional.user_id === null) {
            return null; // Return null if no valid category or active user
        }
        console.log(professional);
        return professional; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    getCategories,
    getAllProfessionals,
    getProfessionalsByCat,
    getProfessionalByCatAndId
}