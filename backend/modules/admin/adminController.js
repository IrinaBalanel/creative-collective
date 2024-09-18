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
          select: 'email role'  // specific fields
        })
        .exec();
        // console.log(clients);
        return clients; 
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createNewUser(firstName, lastName, email, password, role){
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
                last_name: lastName
            });
            await newClient.save();
        } else if (role.toLowerCase() === "provider") {
            const newProvider = new Provider({
                user_id: user._id,
                first_name: firstName,
                last_name: lastName
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
    createNewUser
};