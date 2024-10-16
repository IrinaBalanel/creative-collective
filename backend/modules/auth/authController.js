const User = require("../../models/User");
const Client = require("../../models/Client");
const Provider = require("../../models/Provider");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function login(email, password){
    const errors = []; // array to store error messages
    try{
        const user = await User.findOne({email}); //checks if the user exists
        console.log("User from login", user);
        // if (!user || user.status == "deleted"){
        //     errors.push("User with this email doesn"t exist");
        // } else if (user && user.status == "blocked") {
        //         errors.push("This account is blocked");
        //     } else if (user && user.role == "admin") {
        //         errors.push("Unauthorized");
        //     } else {
        //         const isMatch = await bcrypt.compare(password, user.password); // compares password value with hash
        //         if(isMatch) {
        //             //token generation
        //             token = jwt.sign(
        //                 {id: user._id, email: user.email, role: user.role}, 
        //                 process.env.JWT_SECRET_KEY, 
        //                 {expiresIn: "1d"}
        //             );
        //             console.log(token); 
        //             console.log(user); 
        //         }else{
        //             errors.push("Invalid password"); 
        //         }
        //     }
        // if (errors.length > 0) {
        //     return { errors };
        // }
        if (!user || user.status === "deleted") {
            errors.push("User with this email doesn't exist");
            return {errors};
        }

        if (user.status === "blocked") {
            errors.push("This account is blocked");
            return {errors};
        }

        if (user.role === "admin") {
            errors.push("Unauthorized");
            return {errors};
        }

        // Verify password if user is active
        const isMatch = await bcrypt.compare(password, user.password); // Compares password value with hash
        if (!isMatch) {
            errors.push("Invalid password");
            return {errors};
        }

        // Generates token if everything is correct
        token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "1d" }
        );
        return { user, token };

    } catch (error){
        throw new Error(error.message);
    }
}

async function register(firstName, lastName, email, phone, password, role){
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

        //token generation
        token = jwt.sign(
            {id: user._id, email: user.email, role: user.role}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: "1d"}
        );
        // console.log(token); 
        // console.log(user); 
        console.log(errors);

        return {user, token, errors};
   
    } catch (error){
        throw new Error(error.message);
    }
}

async function adminLogin(email, password){
    try{
       const user = await User.findOne({email});
       if (!user){
           throw new Error("User with this email doesn't exist");
       } else {
           if (user.role !== "admin") {
               throw new Error("Unauthorized");
           } else{
               //console.log(password, user.password)
               // Compare password
               // if (user.password !== password) {
               //     throw new Error("Invalid password");
               // }
               const isMatch = await bcrypt.compare(password, user.password);
               if (isMatch) {
                   //token generation
                    token = jwt.sign(
                        {id: user._id, email: user.email, role: user.role}, 
                        process.env.JWT_SECRET_KEY, 
                        {expiresIn: "1d"}
                   );
                   //console.log("this is my token", token); 
                   //console.log("this is the user", user); 
               } else{
                   throw new Error("Invalid password");
               }
           }
       }
       return {user, token};
   
    } catch (error){
       console.error(error)
       throw error;
    }
}

async function logout(id){
    return await User.findById(id);
}

async function verifyToken(token){
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        console.log("this is my user from verifyToken", user); 
        return user;
    } catch (error) {
        throw new Error("Invalid token");
    }
    
}



module.exports = {
    login,
    register,
    adminLogin,
    logout,
    verifyToken
};