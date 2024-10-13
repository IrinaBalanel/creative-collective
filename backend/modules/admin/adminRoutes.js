const express = require("express");
const router = express.Router();
const adminController = require("./adminController");


router.get("/profile/:user_id", async (req, res) => {
    console.log("Admin profile route was called")
    const { user_id} = req.params;

    //console.log("Received user_id:", user_id);

    try {
        const admin = await adminController.getUserById(user_id);
        //console.log("User fetched successfully ", admin);
        if (!admin) {
            return res.json({ message: "Failed to fetch user" });
        }
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
        const users = await adminController.getClientsByStatus(["active", "blocked"]);
        // console.log(users);
        if (!users) {
            return res.json({ message: "Failed to fetch clients" });
        }
        res.json(users);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

// UPDATE CLIENT
router.get("/update-client/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const client = await adminController.getClientById(id);
        //console.log("Client:", client);
        if (!client) {
            return res.json({ message: "Failed to fetch client" });
        }
        res.json(client);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
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
        const users = await adminController.getProvidersByStatus(["active", "blocked"]);
        // console.log(users);
        if (!users) {
            return res.json({ message: "Failed to fetch providers" });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

// UPDATE PROVIDER
router.get("/update-provider/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const provider = await adminController.getProviderById(id);
        //console.log("Provider:", provider);
        if (!provider) {
            return res.json({ message: "Failed to fetch provider" });
        }
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
            return res.json({ message: "Failed to update provider" });
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
    //console.log(req.body);

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
    //console.log("Get user to Delete route was called")
    const { id } = req.params;
    try {
        const user = await adminController.getUserById(id);
        //console.log("User:", user);
        if (!user) {
            return { message: "User not found" };
        }
        res.json(user);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

router.post("/delete-user/:id/submit", async (req, res) => {
    //console.log("Delete user route was called")
    const { id } = req.params;
    try {
        const user = await adminController.deleteUser(id);
        //console.log("User:", user);
        if (!user) {
          return res.json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error(error);
        res.json({ message: "Error"});
    }
});



// BLOCK USER
router.get("/block-user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await adminController.getUserById(id);
        //console.log("User:", user);
        if (!user) {
            return { message: "User not found" };
        }
        res.json(user);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
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
        console.error(error);
        res.json({ message: "Error"});
    }
});


// UNBLOCK USER
router.post("/unblock-user/:id/submit", async (req, res) => {
    const { id } = req.params;
    //console.log("received user id to unblock: ", id);
    try {
        const user = await adminController.unblockUser(id);
        //console.log("Unblocked user from routes", user)
        if (!user) {
          return res.json({ message: "User not found" });
        }

        res.json({ message: "User unblocked successfully", user });
    } catch (error) {
        console.error(error);
        res.json({ message: "Error"});
    }
});

///////////////////////// FORM MESSAGES MANAGEMENT /////////////////////////
router.get("/form-messages", async (req, res) => {
    try {
        const messages = await adminController.getFormMessages();
        //console.log(messages);
        if (!messages) {
            return res.json({ message: "Form messages not found" });
        }
        res.json(messages);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});


router.post("/form-messages/mark-read/:id/submit", async (req, res) => {
    const { id } = req.params;
    //console.log("Received Message idon backend", id);
    try {
        const message = await adminController.setMsgRead(id);
        //console.log(message);
        if (!message) {
            return res.json({ message: "Message not found" });
        }
        res.json(message);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});


///////////////////////// PROVIDER VERIFICATION /////////////////////////
router.get("/provider-verification", async (req, res) => {

    try {
        const requests = await adminController.getVerificationRequests();
        //console.log(requests);
        if (!requests) {
            return res.json({ message: "Verification requests not found" });
        }
        res.json(requests);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

router.post("/provider-verification/:provider_id/approve-credential/:credential_id/submit", async (req, res) => {
    //console.log("Credential approve verificaiton endpoint has been called")
    const { provider_id, credential_id } = req.params;

    //console.log("Received credential info on backend", credential_id, provider_id);
    try {
        const request = await adminController.approveVerifRequest(provider_id, credential_id);
        //console.log(request);
        if (!request) {
            return res.json({ message: "Credential not found" });
        }
        res.json(request);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

router.get("/provider-verification/reject-credential/:credential_id", async (req, res) => {
    //console.log("Credential get reject verificaiton endpoint has been called")
    const { credential_id } = req.params;

    //console.log("Received credential info on backend", credential_id);
    try {
        const request = await adminController.getCredentialById(credential_id);
        //console.log("Credential to reject", request);
        if (!request) {
            return res.json({ message: "Credential not found" });
        }
        res.json(request);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

router.post("/provider-verification/:provider_id/reject-credential/:credential_id/submit", async (req, res) => {
    //console.log("Credential reject verificaiton endpoint has been called")
    const { provider_id, credential_id } = req.params;
    const { feedback } = req.body;

    //console.log("Received credential info on backend", credential_id, provider_id, feedback);
    try {
        const request = await adminController.rejectVerifRequest(provider_id, credential_id, feedback);
        //console.log(request);
        if (!request) {
            return res.json({ message: "Credential not found" });
        }
        res.json(request);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

module.exports = router;