const express = require("express");
const router = express.Router();
const adminController = require("./adminController");

// Routes to display users on /admin page
router.get("/dashboard", async (req, res) => {
    res.json("protected by middleware");
});

router.get("/management-clients", async (req, res) => {
    try {
        // Fetch users using the controller
        const users = await adminController.getClients();
        // console.log(users);
        res.json(users);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});


router.post("/new-user/submit", async (req, res) => {
    const { firstName, lastName, email, phone, password, role } = req.body;
    console.log(req.body);

    try {
        const user = await adminController.createNewUser(firstName, lastName, email, phone, password, role);
        res.json({ message: "User has been successfully created", user });
        if (!user) {
            return res.json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error(error.message);
        res.json({ errors: error.message.split(", ") }); //to show error on frontend with ,
    }

});



router.get("/update-client/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const client = await adminController.getClientById(id);
        console.log("Client:", client);
        res.json(client);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/update-client/:id/submit", async (req, res) => {
    const { id } = req.params;
    const { clientData, userData } = req.body;
    try {
        const updatedClient = await adminController.updateClient(id, clientData, userData);
        res.json({ message: "Updated successfully", updatedClient });
        if (!updatedClient) {
            return res.json({ message: "Failed to update user" });
        }
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

module.exports = router;