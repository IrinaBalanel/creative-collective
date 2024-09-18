const express = require("express");
const router = express.Router();
const authController = require("./authController");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const result = await authController.login(email, password);
        if (result.errors) {
            return res.json({ errors: result.errors });
        }
        const token = result.token;
        console.log("this is my token", token);
        const cookie = await res.cookie("token", token, {
            httpOnly: true, // prevents client-side from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000, // cookie will expire in 1 day and be deleted from browser
        });
        console.log("this is my cookie", cookie);
        res.json({ message: "Login successful", user: result.user });
    } catch (error) {
        console.error(error.message);
        res.json({ message: "Something went wrong. Please try again." });
    }
});

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    console.log(req.body);

    try {
        const result = await authController.register(firstName, lastName, email, password, role);
        const token = result.token;
        console.log("this is my token", token);
        const cookie = await res.cookie("token", token, {
            httpOnly: true, // prevents client-side from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000, // cookie will expire in 1 day and be deleted from browser
        });
        console.log("this is my cookie", cookie);
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
    console.log(userId);
    let user = await authController.logout(userId);
    console.log(user);
    if (!user) {
        return res.json({ message: "User not found" });
    }
    res.clearCookie("token");
    res.json({ message: "Logged out", user});
});
    

module.exports = router;