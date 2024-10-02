const Provider = require("../../models/Provider");
const ProviderCategory = require("../../models/ProviderCategory");
const User = require("../../models/User");
const mongoose = require("mongoose");

async function getProviderByUserId (userId) {
    try {
        const provider = await Provider.findOne({ user_id: userId })
        .populate({
            path: 'user_id',
            select: 'email password role status blockReason createdAt'
        })
        .populate({
            path: 'creative_category_id',
            select: 'category'
        });
        
        if (!provider) {
            return { message: 'Provider not found' };
        }

        console.log('Provider info:', provider);
        return provider;
    } catch (error) {
        console.error('Error fetching provider:', error);
        throw error;
    }
};

// UPDATE PROVIDER
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

async function updateProvider(user_id, providerData) {
    try{
        console.log(providerData);
        
        // Check if user_id is a valid ObjectId string
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error('Invalid user_id format');
        }
        // Convert the user_id string to ObjectId
        const objectId = new mongoose.Types.ObjectId(user_id);

        const categoryObjectId = new mongoose.Types.ObjectId(providerData.creative_category_id);
        const updatedProvider = await Provider.findOneAndUpdate(
            { user_id: objectId },
            {
                first_name: providerData.first_name,
                last_name: providerData.last_name,
                creative_category_id: categoryObjectId,
                creative_category_details: providerData.creative_category_details,
                profile_image: providerData.profile_image,
                bio: providerData.bio,
                phone_number: providerData.phone_number,
                location: providerData.location,
            }, 
            { new: true });

        if (!updatedProvider) {
            return { message: 'Provider not found' };
        }

        return { updatedProvider };

    } catch (error) {
        console.error('Error updating client and user:', error);
        throw error;
    }
}




module.exports = {
    getProviderByUserId,
    updateProvider,
    getCategories
}