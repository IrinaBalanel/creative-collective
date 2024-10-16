const Provider = require("../../models/Provider");
const ProviderCategory = require("../../models/ProviderCategory");
const User = require("../../models/User");
const Service = require("../../models/Service");
const Credential = require("../../models/Credential");
const mongoose = require("mongoose");
const axios = require("axios");

async function getProviderByUserId (userId) {
    try {
        const provider = await Provider.findOne({ user_id: userId })
        .populate({
            path: "user_id",
            select: "email password role status blockReason createdAt"
        })
        .populate({
            path: "creative_category_id",
            select: "category"
        })
        .populate("services")
        .exec();
        if (!provider || provider.user_id === null) {
            return { message: "Provider not found" };
        }

        //console.log("Provider info:", provider);
        return provider;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


async function getCategories() {
    try {
        const categories = await ProviderCategory.find()
        //console.log(categories);
        if (!categories) {
            return { message: "Categories not found" };
        }
        return categories; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

///////////////////////// PROVIDER PAGE CUSTOMIZATION /////////////////////////
//UPDATE PROVIDER PERSONAL INFO AND PORTFOLIO
async function updateProvider(user_id, providerData) {
    try{
        // console.log(providerData);
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error("Invalid provider_id format");
        }
        // converts the user_id string to ObjectId
        const objectId = new mongoose.Types.ObjectId(user_id);

        // Convert the creative_category_id to ObjectId if it"s provided as a string or object
        if (providerData.creative_category_id && providerData.creative_category_id._id) {
            if (!mongoose.Types.ObjectId.isValid(providerData.creative_category_id._id)) {
                throw new Error("Invalid creative_category_id format");
            }
            providerData.creative_category_id = new mongoose.Types.ObjectId(providerData.creative_category_id._id);
        } else if (typeof providerData.creative_category_id === "string") {
            if (!mongoose.Types.ObjectId.isValid(providerData.creative_category_id)) {
                throw new Error("Invalid creative_category_id format");
            }
            providerData.creative_category_id = new mongoose.Types.ObjectId(providerData.creative_category_id);
        }

        //const categoryObjectId = new mongoose.Types.ObjectId(providerData.creative_category_id);
        // const updatedProvider = await Provider.findOneAndUpdate(
        //     { user_id: objectId },
        //     {
        //         first_name: providerData.first_name,
        //         last_name: providerData.last_name,
        //         creative_category_id: categoryObjectId,
        //         creative_category_details: providerData.creative_category_details,
        //         profile_image: providerData.profile_image,
        //         bio: providerData.bio,
        //         phone_number: providerData.phone_number,
        //         location: providerData.location,
        //         portfolio: providerData.portfolio
        //     }, 
        //     { new: true }
        // );

        // update object (conditionally add fields only if they exist in providerData)
        // console.log(providerData.creative_category_id);
        const updateFields = {};
        if (providerData.first_name) updateFields.first_name = providerData.first_name;
        if (providerData.last_name) updateFields.last_name = providerData.last_name;
        if (providerData.creative_category_id) updateFields.creative_category_id = new mongoose.Types.ObjectId(providerData.creative_category_id);
        if (providerData.creative_category_details) updateFields.creative_category_details = providerData.creative_category_details;
        if (providerData.profile_image) updateFields.profile_image = providerData.profile_image;
        if (providerData.bio) updateFields.bio = providerData.bio;
        if (providerData.phone_number) updateFields.phone_number = providerData.phone_number;
        if (providerData.location) updateFields.location = providerData.location;
        if (providerData.portfolio) updateFields.portfolio = providerData.portfolio;
        
        // updates only the fields that are included
        const updatedProvider = await Provider.findOneAndUpdate(
            { user_id: objectId },
            updateFields,
            { new: true }  // Return the updated document
        ).populate("creative_category_id");

        if (!updatedProvider) {
            return { message: "Provider not found or failed to update" };
        }
        // console.log("Updated category id ", updatedProvider.creative_category_id);
        //console.log("Updated provider pers info ", updatedProvider);
        return { updatedProvider };

    } catch (error) {
        console.error(error);
        throw error;
    }
}

///////////////////////// SERVICES /////////////////////////
//ADD NEW SERVICE
async function addNewService(provider_id, serviceData) {
    try{
        //console.log("Service Data from function ", serviceData);
        //console.log("Provider ID ", provider_id);
        
        if (!mongoose.Types.ObjectId.isValid(provider_id)) {
            throw new Error("Invalid provider_id format");
        }
        const providerId = new mongoose.Types.ObjectId(provider_id);
        
        const price = serviceData.service_price;
        const duration = serviceData.service_duration;

        //console.log("service_price (before conversion):", price, "typeof:", typeof price);
        //console.log("service_duration (before conversion):", duration, "typeof:", typeof duration);

        // checks if the service_price and service_duration are valid numbers
        if (!price || isNaN(price)) {
            throw new Error("Invalid service_price value");
        }

        if (!duration || isNaN(duration)) {
            throw new Error("Invalid service_duration value");
        }
        
        // validation against missing fields or undefined
        if (!serviceData.service_name || !serviceData.service_description || !serviceData.service_thumbnail_url || !serviceData.service_location || !serviceData.calendly_event_url) {
            throw new Error("Missing required fields");
        }
        //console.log("My submitted new service: ", serviceData.service_description);

        const newService = await Service.create(
            {
                provider_id: providerId,
                service_name: serviceData.service_name,
                service_description: serviceData.service_description,
                service_price: mongoose.Types.Decimal128.fromString(price.toString()),  // Convert to Decimal128
                service_duration: mongoose.Types.Decimal128.fromString(duration.toString()),
                service_thumbnail_url: serviceData.service_thumbnail_url,
                service_location: serviceData.service_location,
                calendly_event_url: serviceData.calendly_event_url
            }
        );
        //console.log(newService);
        return { newService };
    } catch(error) {
        console.error(error);
        throw error;

    }
}
// UPDATE SERVICE
async function updateService(provider_id, service_id, serviceData) {
    try{
        // console.log("Provider ID ", provider_id);
        // console.log("Service ID ", service_id);
        // console.log("Service data ", serviceData);
        
        // converts the user_id string to ObjectId
        const providerId = new mongoose.Types.ObjectId(provider_id);
        const serviceId = new mongoose.Types.ObjectId(service_id);

        const price = serviceData.service_price;
        const duration = serviceData.service_duration;

        // console.log("service_price (before conversion):", price, "typeof:", typeof price);
        // console.log("service_duration (before conversion):", duration, "typeof:", typeof duration);

        // checks if valid numbers
        if (!price || isNaN(price)) {
            throw new Error("Invalid service_price value");
        }
        if (!duration || isNaN(duration)) {
            throw new Error("Invalid service_duration value");
        }

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            {
                provider_id: providerId,
                service_name: serviceData.service_name,
                service_description: serviceData.service_description,
                service_price: mongoose.Types.Decimal128.fromString(price.toString()),  // converts to Decimal128
                service_duration: mongoose.Types.Decimal128.fromString(duration.toString()),
                service_thumbnail_url: serviceData.service_thumbnail_url,
                service_location: serviceData.service_location,
                calendly_event_url: serviceData.calendly_event_url
            },
            { new: true }
        );
        if (!updatedService) {
            throw new Error("Service not found or failed to update");
        }

        //console.log(updatedService);
        return { updatedService };
    } catch(error) {
        console.error(error);
        throw error;

    }
}


// DELETE SERVICE
async function deleteService(service_id) {
    try{
        // console.log("Service ID ", service_id);

        const deletedService = await Service.findByIdAndDelete(service_id);
        if (!deletedService) {
            throw new Error("Service not found or failed to delete");
        }
        //console.log(deletedService);
        return { deletedService };
    } catch(error) {
        console.error(error);
        throw error;

    }
}


// UPDATE PROVIDER SOCIALS
async function updateProviderSocials(user_id, socials) {

    //console.log(socials);
    try {
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new Error("Invalid provider_id format");
        }
        
        const objectId = new mongoose.Types.ObjectId(user_id);

        const updateFields = {
            "socials.instagram": socials.instagram || "",
            "socials.linkedin": socials.linkedin || "",
            "socials.facebook": socials.facebook || "",
            "socials.tiktok": socials.tiktok || ""
        };

        const updatedProvider = await Provider.findOneAndUpdate(
            { user_id: objectId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedProvider) {
            return { message: "Provider not found or failed to update" };
        }

        //console.log("Updated provider socials ", updatedProvider);
        return { updatedProvider };

    } catch (error) {
        console.error(error);
        throw error;
    }
}

///////////////////////// PROVIDER VERIFICATION /////////////////////////
async function submitCredentialVerification(credentialData) {
    try{
        //console.log("credentialData from function ", credentialData);

        const providerId = new mongoose.Types.ObjectId(credentialData.provider_id);
        const categoryId = new mongoose.Types.ObjectId(credentialData.category_id);

        const newVerification = await Credential.create(
            {
                provider_id: providerId,
                category_id: categoryId,
                file: credentialData.file
            }
        );
        const populatedVerification = await Credential.findById(newVerification._id)
        .populate("provider_id")  // Populate provider details
        .populate("category_id");  // Populate category details

        //console.log(populatedVerification);
        return { newVerification: populatedVerification };
    } catch(error) {
        console.error(error);
        throw error;

    }
}

async function getCredentialsByProviderId (providerId) {
    console.log("Provider id from function credemrials", providerId);
    try {
        const credentials = await Credential.find({provider_id : providerId})
        .populate({
            path: "provider_id",
            select: "first_name last_name verified"
        })
        .populate({
            path: "category_id",
            select: "category"
        })
        .exec();
        if (!credentials || credentials.provider_id === null || credentials.creative_category_id === null) {
            return { message: "Credentials not found" };
        }

        //console.log("credentials info:", credentials);
        return credentials;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

////// CALENDLY API ////////
async function getProviderTokenByUserId (userId) {
    try {
        const provider = await Provider.findOne(
            { user_id: userId } , "calendly_token"
        )
        if (!provider || provider.user_id === null) {
            return { message: "Provider not found" };
        }
        //console.log("Provider info:", provider);
        return provider;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function submitToken(userId, token) {
    try{
        const newToken = await Provider.findOneAndUpdate(

            {user_id: userId},
            {calendly_token: token},
            { new: true }
        );
        return { newToken };
    } catch(error) {
        console.error(error);
        throw error;

    }
}


// Calendly current user using the provider's token
async function fetchCalendlyUserInfo(token) {
    try {
        const response = await axios.get("https://api.calendly.com/users/me", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const user = response.data.resource;
        return user;
    } catch (error) {
      console.error("Error fetching Calendly user info:", error);
      throw error;
    }
}
  
// Calendly scheduled events
async function fetchCalendlyEvents(token, userUri) {
    try {
        const response = await axios.get("https://api.calendly.com/scheduled_events", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                user: userUri,
                sort: 'start_time:asc',
            }
        });
        const events = response.data.collection;
        return events;
    } catch (error) {
      console.error("Error fetching Calendly events:", error);
      throw error;
    }
}

module.exports = {
    getProviderByUserId,
    updateProvider,
    getCategories,

    addNewService,
    updateService,
    deleteService,

    updateProviderSocials,

    submitCredentialVerification,
    getCredentialsByProviderId,

    getProviderTokenByUserId,
    submitToken,
    fetchCalendlyUserInfo,
    fetchCalendlyEvents
}