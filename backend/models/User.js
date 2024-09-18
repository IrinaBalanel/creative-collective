const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client", "provider", "admin"],
    required: true
  },
});
    
const User = mongoose.model("User", UserSchema, "users");

//SEED TABLE
const seedUsers = async () => {
  // await connect();
  const users = [
    { email: "admin@example.com", password: "$2a$10$sBosYSrP4QhxtAWYKB7QZeTS70YyshlsvE1avenRWV//gUuc2dS3O", role: "admin" }, //password is admin123
    { email: "prover.one@gmail.com", password: "$2a$10$byUINTKZFx6pffu9ifjhseDYIkLRt/mJdDDnl5a0dAsyS26zKiuRC", role: "provider" }, //password is provider123
    { email: "client.one@gmail.com", password: "$2a$10$tAURvwaJFdgaI.ABveXZrOlTVc7B0NMLEb4foXYr3fOzh1pmNOJye", role: "client" } //password is client123
  ];
  
  try {
    // Fetch all users from the collection
    const existingUsers = await User.find();
    
    // Check the length of the fetched documents
    if (existingUsers.length === 0) {
      await User.insertMany(users);
      console.log("Users seeded successfully");
    } else {
      console.log("Users already exist, no need to seed.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

  
seedUsers();

module.exports = User;