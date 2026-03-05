const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require ("cookie-parser");
const { authJWT, authorize } = require('./middleware/middleware');
const fs = require("fs");
const path = require("path"); 

const app = express ();
const port = process.env.PORT || "8000";

const defaultAllowedOrigins = [
  "https://creative-collective.irinabalanel.com",
  "https://creative-collective-api.irinabalanel.com",
  "http://localhost:5173",
  "https://creative-collective-frontend.onrender.com",
];
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : defaultAllowedOrigins;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //need this line to be able to receive/parse JSON from request
app.use(cookieParser());

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

// app.options('*', cors());



// Database connection
//const dbUrl= `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/creative-collective?retryWrites=true&w=majority&appName=creative-collective`;
const dbUrl= `${process.env.MONGO_URI}`;
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
// app.use("/admin", authJWT, authorize(['admin']), adminRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/provider", providerRoutes);
app.use("/", publicRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const frontendDistPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // Catch-all route to serve React app when frontend build is bundled with backend.
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Start server only after DB connection
app.listen(port, () => { 
  console.log(`Listening on http://localhost:${port}`);
});
