const express = require("express");
const router = express.Router();
const adminController = require("./adminController");

// Routes to display users on /admin page


router.get("/management-clients", async (req, res) => {
    try {
        // Fetch users using the controller
        const users = await adminController.getClients();
        // const user = await adminController.getOneUser(email);
        console.log(users);
        res.json(users);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/new-user/submit", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    console.log(req.body);

    try {
        const user = await adminController.createNewUser(firstName, lastName, email, password, role);
        res.json({ message: "User has been successfully created", user });
        if (!user) {
            return res.json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error(error.message);
        res.json({ errors: error.message.split(", ") }); //to show error on frontend with ,
    }

});

module.exports = router;