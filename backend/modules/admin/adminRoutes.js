const express = require("express");
const router = express.Router();
const adminController = require("./adminController");

// Routes to display users on /admin page
router.get("/dashboard", async (req, res) => {
    res.json("protected by middleware");
});



/////////////////////////USER MANAGEMENT/////////////////////////
///////////CLIENT//////////////
router.get("/management-clients", async (req, res) => {

    try {
        // Fetch users using the controller
        const users = await adminController.getClientsByStatus(["active", "blocked"]);
        // console.log(users);
        res.json(users);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

// UPDATE CLIENT
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
///////////PROVIDER//////////////
router.get("/management-providers", async (req, res) => {
    try {
        // Fetch users using the controller
        const users = await adminController.getProvidersByStatus(["active", "blocked"]);
        // console.log(users);
        res.json(users);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

// UPDATE PROVIDER
router.get("/update-provider/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const provider = await adminController.getProviderById(id);
        console.log("Provider:", provider);
        res.json(provider);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/update-provider/:id/submit", async (req, res) => {
    const { id } = req.params;
    const { providerData, userData } = req.body;
    try {
        const updatedProvider = await adminController.updateProvider(id, providerData, userData);
        res.json({ message: "Updated successfully", updatedProvider });
        if (!updatedProvider) {
            return res.json({ message: "Failed to update user" });
        }
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});


///////////USER//////////////
// CREATE USER
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

// SOFT DELETE USER
router.get("/delete-user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await adminController.getUserById(id);
        if (!user) {
            return { message: 'User not found' };
        }
        console.log("User:", user);
        res.json(user);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/delete-user/:id/submit", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await adminController.deleteUser(id);
        if (!user) {
          return res.json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.json({ message: "Error deleting user"});
    }
});



// BLOCK USER
router.get("/block-user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await adminController.getUserById(id);
        if (!user) {
            return { message: 'User not found' };
        }
        console.log("User:", user);
        res.json(user);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/block-user/:id/submit", async (req, res) => {
    const { id } = req.params;
    const { blockReason } = req.body;
    try {
        const user = await adminController.blockUser(id, blockReason);
        if (!user) {
          return res.json({ message: "User not found" });
        }
        res.json({ message: "User blocked successfully", user });
    } catch (error) {
        console.error("Error blocking user: ", error);
        res.json({ message: "Error blocking user"});
    }
});


// UNBLOCK USER
router.post("/unblock-user/:id/submit", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await adminController.unblockUser(id);
        if (!user) {
          return res.json({ message: "User not found" });
        }
        res.json({ message: "User unblocked successfully", user });
    } catch (error) {
        console.error("Error blocking user: ", error);
        res.json({ message: "Error blocking user"});
    }
});


module.exports = router;