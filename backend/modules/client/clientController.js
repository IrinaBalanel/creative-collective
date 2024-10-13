const mongoose = require("mongoose");
const Provider = require("../../models/Provider");
const ProviderCategory = require("../../models/ProviderCategory");
const User = require("../../models/User");
const Client = require("../../models/Client");



async function getFavProfByUserId (userId) {
    try {
        const client = await Client.findOne({ user_id: userId }, "favorite_professionals")
        .populate({
            path: "favorite_professionals",
            populate: {
                path: "creative_category_id",
                select: "category",
                model: "ProviderCategory"
            }
        })
        // .populate("favorite_professionals")
        .exec();
        if (!client || client.user_id === null) {
            return { message: "Client not found" };
        }
        //console.log("Client info:", client);
        return client;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function addFavoriteProvider (userId, providerId) {
    try {

        const providerObjectId = new mongoose.Types.ObjectId(providerId);
        const updatedClient = await Client.findOneAndUpdate(
            { user_id: userId },
            { $addToSet: { favorite_professionals: providerObjectId } }, //$addToSet operator doesn"t replace prev value, it adds a new one to the array only if the value is not already present.
            { new: true }
        ).populate("favorite_professionals");

        if (!updatedClient) {
            console.log("Client not found:", updatedClient); 
        }
        return updatedClient;
    } catch (error) {
        console.error("Error adding favorite provider:", error);
        throw error;
    }
};

async function removeFavoriteProvider (userId, providerId) {
    try {

        const updatedClient = await Client.findOneAndUpdate(
            { user_id: userId },
            { $pull: { favorite_professionals: providerId } },  // $pull removes the provider from the array
            { new: true }
        ).populate("favorite_professionals");

        if (!updatedClient) {
            console.log("Client not found:", updatedClient); 
        }
        return updatedClient;
    } catch (error) {
        console.error("Error adding favorite provider:", error);
        throw error;
    }
};



module.exports = {
    getFavProfByUserId,
    addFavoriteProvider,
    removeFavoriteProvider
}