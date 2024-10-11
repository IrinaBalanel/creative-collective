const express = require("express");
const router = express.Router();
const adminController = require("./adminController");

// Routes to display users on /admin page
router.get("/profile/:user_id", async (req, res) => {
    console.log("Admin profile route was called")
    const { user_id} = req.params;

    console.log("Received user_id:", user_id);

    try {
        const admin = await adminController.getUserById(user_id);
        if (!admin) {
            return res.json({ message: "Failed to fetch user" });
        }
        console.log("User fetched successfully ", admin);
        res.json({ message: "User fetched successfully", admin});
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }
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
    console.log("Get user to Delete route was called")
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
    console.log("Delete user route was called")
    const { id } = req.params;
    try {
        const user = await adminController.deleteUser(id);
        if (!user) {
          return res.json({ message: "User not found" });
        }
        console.log("User:", user);
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
    console.log("received user id to unblock: ", id);
    try {
        const user = await adminController.unblockUser(id);
        if (!user) {
          return res.json({ message: "User not found" });
        }
        console.log("Unblocked user from routes", user)
        res.json({ message: "User unblocked successfully", user });
    } catch (error) {
        console.error("Error blocking user: ", error);
        res.json({ message: "Error blocking user"});
    }
});


router.get("/form-messages", async (req, res) => {

    try {
        const messages = await adminController.getFormMessages();
        console.log(messages);
        res.json(messages);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});


router.post("/form-messages/mark-read/:id/submit", async (req, res) => {
    const { id } = req.params;
    console.log("Received Message idon backend", id);
    try {
        const message = await adminController.setMsgRead(id);
        
        if (!message) {
            return res.json({ message: "Message not found" });
        }
        console.log(message);
        res.json(message);
    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});


//PROVIDER VERIFICATION 

router.get("/provider-verification", async (req, res) => {

    try {
        const requests = await adminController.getVerificationRequests();
        console.log(requests);
        res.json(requests);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/provider-verification/:provider_id/approve-credential/:credential_id/submit", async (req, res) => {
    console.log("Credential approve verificaiton endpoint has been called")
    const { provider_id, credential_id } = req.params;

    console.log("Received credential info on backend", credential_id, provider_id);
    try {
        const request = await adminController.approveVerifRequest(provider_id, credential_id);
        
        if (!request) {
            return res.json({ message: "Credential not found" });
        }
        console.log(request);
        res.json(request);
    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});




router.get("/provider-verification/reject-credential/:credential_id", async (req, res) => {
    console.log("Credential get reject verificaiton endpoint has been called")
    const { credential_id } = req.params;

    console.log("Received credential info on backend", credential_id);
    try {
        const request = await adminController.getCredentialById(credential_id);
        
        if (!request) {
            return res.json({ message: "Credential not found" });
        }
        console.log("Credential to reject", request);
        res.json(request);
    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/provider-verification/:provider_id/reject-credential/:credential_id/submit", async (req, res) => {
    console.log("Credential reject verificaiton endpoint has been called")
    const { provider_id, credential_id } = req.params;
    const { feedback } = req.body;

    console.log("Received credential info on backend", credential_id, provider_id, feedback);
    try {
        const request = await adminController.rejectVerifRequest(provider_id, credential_id, feedback);
        
        if (!request) {
            return res.json({ message: "Credential not found" });
        }
        console.log(request);
        res.json(request);
    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

module.exports = router;