const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require ("cookie-parser");
const { authJWT, authorize } = require('./middleware/middleware');

const app = express ();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //need this line to be able to receive/parse JSON from request
app.use(cookieParser());

app.use(cors({
  //origin: "*" //allow requests from all servers: to be changed for subdomain
  //for token auth
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));

// Database connection
const dbUrl= `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/creative-collective?retryWrites=true&w=majority&appName=creative-collective`;
const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
  }
};
connect();

// Import Routes
const adminRoutes = require("./modules/admin/adminRoutes");
const authRoutes = require("./modules/auth/authRoutes");
const clientRoutes = require("./modules/client/clientRoutes");
const publicRoutes = require("./modules/public/publicRoutes");
const providerRoutes = require("./modules/provider/providerRoutes");

// Routes to define the beginning of the path
app.use("/admin", authJWT, authorize(['admin']), adminRoutes);
app.use("/auth", authRoutes);
app.use("/client", authJWT, authorize(['client']), clientRoutes);
app.use("/provider", providerRoutes);
app.use("/", publicRoutes);


// Start server only after DB connection
app.listen(port, () => { 
  console.log(`Listening on http://localhost:${port}`);
});
