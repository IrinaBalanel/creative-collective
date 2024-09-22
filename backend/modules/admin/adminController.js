// const User = require("../../models/User");
const Client = require("../../models/Client");
const User = require("../../models/User");
const Provider = require("../../models/Provider");
const bcrypt = require('bcryptjs');

// Controller to fetch users and render the admin page
async function getClients() {
    try {
        // Fetch all users from the database
        const clients = await Client.find()
        .populate({
          path: 'user_id',  // foreign key
          select: 'email password role'  // specific fields
        })
        .exec();
        // console.log(clients);
        return clients; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getClientById(id) {
    try {
        // Fetch all users from the database
        const client = await Client.findById(id)
        .populate({
          path: 'user_id',  // foreign key
          select: 'email'  // specific fields
        })
        .exec();
        console.log(client);
        return client; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateClient(id, clientData, userData) {
    try{
        const updatedClient = await Client.findByIdAndUpdate(id, {
            first_name: clientData.first_name,
            last_name: clientData.last_name,
            phone_number: clientData.phone_number
        }, { new: true });

        // Update the User information using the user_id from Client
        const updatedUser = await User.findByIdAndUpdate(updatedClient.user_id, {
            email: userData.email
        }, { new: true });

        return { updatedClient, updatedUser };

    } catch (error) {
        console.error('Error updating client and user:', error);
        throw error;
    }
    

    //hash the password to update
}

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

        const hashedPassword = await bcrypt.hash(password, 10); // if there's no such user, hash the password to store in db

        // creates a new user with hashed password
        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });
        const user = await newUser.save();

        // saves new user's info in the clients or providers table depending on the role
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

        console.log(user); 

        return user;
   
    } catch (error){
        throw new Error(error.message);
    }
}

module.exports = {
    getClients, 
    getClientById,
    updateClient,
    createNewUser
};