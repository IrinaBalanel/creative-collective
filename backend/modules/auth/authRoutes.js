const express = require("express");
const router = express.Router();
const authController = require("./authController");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Req body from login route ", req.body);

    try {
        const result = await authController.login(email, password);
        //console.log("Result errors from login", result.errors);
        if (result.errors) {
            return res.json({ errors: result.errors });
        }
        const token = result.token;
        console.log("this is my token", token);
        const user = result.user;
        // Check if token or user is undefined before proceeding
        if (!token || !user) {
            return res.json({ message: "Login failed. Please try again." });
        }
        const cookie = await res.cookie("token", token, {
            httpOnly: true, // prevents client-side from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000, // cookie will expire in 1 day and be deleted from browser
        });
        //console.log("this is my cookie", cookie);
        res.json({ message: "Login successful", user: result.user });
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Something went wrong. Please try again." });
    }
});

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, phone, password, role } = req.body;
    //console.log(req.body);

    try {
        const result = await authController.register(firstName, lastName, email, phone, password, role);
        const token = result.token;
        console.log("Token", token);
        const cookie = await res.cookie("token", token, {
            httpOnly: true, // prevents client-side from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000, // cookie will expire in 1 day and be deleted from browser
        });
        console.log("Token", cookie);
        res.json({ message: "Registration successful", user: result.user });
    } catch (error) {
        console.error(error.message);
        res.json({ errors: error.message.split(", ") }); //to show error on frontend with ,
    }

});

router.post("/admin-login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authController.adminLogin(email, password);
        const token = result.token;
        //console.log("this is my token", token);
        const cookie = await res.cookie("token", token, {
            httpOnly: true, // prevents client-side from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000, // cookie will expire in 1 day and be deleted from browser
        });
        //console.log("this is my cookie", cookie);
        res.json({ message: "Admin login successful", user: result.user });
    } catch (error) {
        console.error(error.message);
        res.json({ message: error.message });
    }
});

router.post("/logout", async (req, res) => {
    const token = req.cookies.token; // get the token from cookies to identify the user
    if (!token) {
        return res.json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);
    const userId = decoded.id; // decode the token that was created from user info, so it contains id
    //console.log(userId);
    let user = await authController.logout(userId);
    console.log("Logged out user", user);
    if (!user) {
        return res.json({ message: "User not found" });
    }
    res.clearCookie("token");
    res.json({ message: "Logged out", user});
});

router.get("/verify-token", async (req, res) => {
    const token = req.cookies.token;
    console.log("Token from verify token:", token); 
    if (!token) {
        return res.json({ message: "No token provided" });
    }
    try {
        const user = await authController.verifyToken(token);
        if (!user) {
            return res.json({ message: "User not found" });
        }
        //console.log("User from verify token:", user); 
        res.json({ user });
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.json({ message: "Invalid token" });
    }
});

    

module.exports = router;