const Client = require("../../models/Client");
const User = require("../../models/User");
const Provider = require("../../models/Provider");
const ProviderCategory = require("../../models/ProviderCategory");
const FormMessage = require("../../models/FormMessage");

async function getCategories() {
    try {
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
        const professionals = await Provider.find()
        .populate('creative_category_id', 'category') // populates creative_category_id with its category field
        .populate('services')
        .populate({
            path: "user_id",
            match: { status: 'active' }, // returns users with status 'active'
            select: 'status'
        })
        .exec();
        const filteredProfessionals = professionals.filter(prof => prof.creative_category_id !== null && prof.services.length > 0 && prof.user_id !== null);
        //console.log(professionals);
        return filteredProfessionals; 
        
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
        .populate('services')
        .populate({
            path: "user_id",
            match: { status: 'active' }, // returns users with status 'active'
            select: 'status'
        })
        .exec();
        const filteredProfessionals = professionals.filter(prof => prof.creative_category_id !== null && prof.services.length > 0 && prof.user_id !== null);
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
        .populate("services")
        .exec();
        
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

// CONTACT FORM
async function contactUs(formData) {
    try {
        const newMessage = await FormMessage.create(
            {
                full_name: formData.full_name,
                email: formData.email,
                message: formData.message,
            }
        );
        
        //console.log("Message added:", newMessage);
        return { newMessage };
        
        
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

module.exports = {
    getCategories,
    
    getAllProfessionals,
    getProfessionalsByCat,
    getProfessionalByCatAndId,

    contactUs
}