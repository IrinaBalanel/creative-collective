
const Client = require("../../models/Client");
const User = require("../../models/User");
const Provider = require("../../models/Provider");
const bcrypt = require("bcryptjs");
const FormMessage = require("../../models/FormMessage");
const Credential = require("../../models/Credential");


/////////////////////////USER MANAGEMENT/////////////////////////
//////////CLIENT/////////
async function getClients() {
    try {
        const clients = await Client.find()
        .populate({
            path: "user_id",  // foreign key
            select: "email password role status blockReason",  // specific fields
        })
        .exec();
        // console.log(clients);
        const filteredClients = clients.filter(client => client.user_id !== null);
        // console.log(filteredClients);
        return filteredClients; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getClientsByStatus(statuses) {
    try {
        const clients = await Client.find()
        .populate({
            path: "user_id",  // foreign key
            select: "email password role status blockReason",  // specific fields
            match: { status: { $in: statuses } }
        })
        .exec();
        // console.log(clients);
        const filteredClients = clients.filter(client => client.user_id !== null);
        // console.log(filteredClients);
        return filteredClients; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getClientById(id) {
    try {
        const client = await Client.findById(id)
        .populate({
          path: "user_id",  // foreign key
          select: "email"  // specific fields
        })
        .exec();
        //console.log(client);
        return client; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// UPDATE CLIENT
async function updateClient(id, clientData, userData) {
    try{
        const updatedClient = await Client.findByIdAndUpdate(id, {
            first_name: clientData.first_name,
            last_name: clientData.last_name,
            phone_number: clientData.phone_number
        }, { new: true });

        // updates user info using the user_id from client
        const updatedUser = await User.findByIdAndUpdate(updatedClient.user_id, {
            email: userData.email
        }, { new: true });

        return { updatedClient, updatedUser };

    } catch (error) {
        console.error("Error updating client and user:", error);
        throw error;
    }
}

//////////PROVIDER/////////
async function getProviders() {
    try {
        const providers = await Provider.find()
        .populate({
            path: "user_id",  // foreign key
            select: "email password role status blockReason",  // specific fields
        })
        .exec();
        // console.log(providers);
        const filteredClients = providers.filter(provider => provider.user_id !== null);
        // console.log(filteredClients);
        return filteredClients; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProvidersByStatus(statuses) {
    try {
        const providers = await Provider.find()
        .populate({
            path: "user_id",  // foreign key
            select: "email password role status blockReason",  // specific fields
            match: { status: { $in: statuses } }
        })
        .exec();
        // console.log(clients);
        const filteredClients = providers.filter(provider => provider.user_id !== null);
        // console.log(filteredClients);
        return filteredClients; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getProviderById(id) {
    try {
        const provider = await Provider.findById(id)
        .populate({
          path: "user_id",  // foreign key
          select: "email"  // specific fields
        })
        .exec();
        //console.log(provider);
        return provider; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// UPDATE PROVIDER
async function updateProvider(id, providerData, userData) {
    try{
        const updatedProvider = await Provider.findByIdAndUpdate(id, {
            first_name: providerData.first_name,
            last_name: providerData.last_name,
            phone_number: providerData.phone_number
        }, { new: true });

        // updates user info using the user_id from provider
        const updatedUser = await User.findByIdAndUpdate(updatedProvider.user_id, {
            email: userData.email
        }, { new: true });
        return { updatedProvider, updatedUser };

    } catch (error) {
        console.error(error);
        throw error;
    }
}

//////////USER/////////
// CREATE USER
async function createNewUser(firstName, lastName, email, phone, password, role){
    const errors = [];  // array to store error messages
    try{
        //checks if the user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            errors.push("User with this email already exists.");
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const hashedPassword = await bcrypt.hash(password, 10); // if there"s no such user, hash the password to store in db

        // creates a new user with hashed password
        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });
        const user = await newUser.save();

        // saves new user"s info in the clients or providers table depending on the role
        if (role.toLowerCase() === "client") {
            const newClient = new Client({
                user_id: user._id,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone
            });
            await newClient.save();
        } else if (role.toLowerCase() === "provider") {
            const newProvider = new Provider({
                user_id: user._id,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone
            });
            await newProvider.save();
        }
        //console.log(user); 
        return user;
   
    } catch (error){
        throw new Error(error.message);
    }
}


// SOFT DELETE
async function getUserById(id) {
    try {
        const user = await User.findById(id)
        //console.log("User: ", user);
        return user; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteUser(id) {
    try{
        const deletedUser = await User.findByIdAndUpdate(
            id, {
                status: "deleted"
            },
            { new: true }
        )
        //console.log("Deleted user: ", deletedUser)
        return deletedUser; 

    } catch (error) {
        console.error(error);
        throw error;
    }
}


// BLOCK & UNBLOCK
async function blockUser(id, blockReason) {
    try{
        const blockedUser = await User.findByIdAndUpdate(
            id, 
            {
                status: "blocked",
                blockReason: blockReason || "No reason provided"
            },
            { new: true }
        )
        //console.log(blockedUser);
        return blockedUser; 

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function unblockUser(id) {
    try{
        const unblockedUser = await User.findByIdAndUpdate(
            id, 
            {
                status: "active",
                blockReason: null
            },
            { new: true }
        )
        //console.log("Unblocked user from function", unblockedUser)
        return unblockedUser; 

    } catch (error) {
        console.error(error);
        throw error;
    }
}

///////////////////////// FORM MESSAGES MANAGEMENT/////////////////////////
async function getFormMessages() {
    try {
        const messages = await FormMessage.find()
        // console.log(messages);
        const filteredMessages = messages.filter(message => message.isRead === false);
        //console.log(filteredMessages);
        return filteredMessages; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function setMsgRead(id) {
    try {
        const message = await FormMessage.findByIdAndUpdate(
            id, 
            {
                isRead: true
            },
            { new: true }
        )
        //console.log(message);
        return message; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

///////////////////////// PROVIDER VERIFICATION /////////////////////////
async function getVerificationRequests() {
    try {
        const requests = await Credential.find()
        .populate({
            path: "provider_id",  // foreign key
            select: "first_name last_name"  // specific fields
        })
        .populate({
            path: "category_id",  // foreign key
            select: "category"  // specific fields
        })
        // console.log(requests);
        const filteredRequests = requests.filter(request => request.status === "pending");
        //console.log(filteredRequests);
        return filteredRequests; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function approveVerifRequest(provider_id, credential_id) {
    try {
        const request = await Credential.findByIdAndUpdate(
            {_id: credential_id}, 
            {
                status: "approved"
            },
            { new: true }
        )
        const verifiedProvider = await Provider.findByIdAndUpdate(
            {_id: provider_id}, 
            {
                verified: true
            },
            { new: true }
        )
        //console.log(request, verifiedProvider);
        return {request, verifiedProvider}; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getCredentialById (credential_id) {
    try {
        const credential = await Credential.findById(credential_id)
        .populate({
            path: "provider_id",
            select: "first_name last_name verified"
        })
        .populate({
            path: "category_id",
            select: "category"
        })
        .exec();

        if (!credential || credential.provider_id === null || credential.creative_category_id === null) {
            return { message: "Credentials not found" };
        }
        //console.log("credentials info:", credentials);
        return credential;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function rejectVerifRequest(provider_id, credential_id, feedback) {
    try {
        const request = await Credential.findByIdAndUpdate(
            {_id: credential_id}, 
            {
                status: "rejected",
                review_feedback: feedback
            },
            { new: true }
        )
        const verifiedProvider = await Provider.findByIdAndUpdate(
            {_id: provider_id}, 
            {
                verified: false
            },
            { new: true }
        )
        //console.log(request, verifiedProvider);
        return {request, verifiedProvider}; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getClients,
    getClientsByStatus,
    getClientById,
    updateClient,

    createNewUser,
    getUserById,
    blockUser,
    unblockUser,
    deleteUser,

    getProviders,
    getProvidersByStatus,
    getProviderById,
    updateProvider,

    getFormMessages,
    setMsgRead,

    getVerificationRequests,
    approveVerifRequest,
    getCredentialById,
    rejectVerifRequest
};