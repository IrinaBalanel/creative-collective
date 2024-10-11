const express = require("express");
const router = express.Router();
const providerController = require("./providerController");


router.get("/profile-customization/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const provider = await providerController.getProviderByUserId(user_id);
        //console.log("Provider:", provider);
        res.json(provider);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await providerController.getCategories();
        //console.log("Categories: ", categories);
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

//UPDATE PROVIDER PERSONAL INFO AND PORTFOLIO
router.post("/profile-customization/update-info-portfolio/:user_id/submit", async (req, res) => {
    
    const { user_id } = req.params;
    console.log("Update provider info route called, user_id:", user_id);
    //console.log("Received user_id:", typeof user_id);
    const providerData = req.body;

    console.log("Received user_id:", user_id); 
    console.log("Received provider data:", providerData);
    try {
        const response = await providerController.updateProvider(user_id, providerData);
        if (!response) {
            return res.json({ message: "Failed to update provider" });
        }
        const updatedProvider = response.updatedProvider;
        console.log(updatedProvider);
        res.json({ message: "Updated successfully", updatedProvider });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

//ADD SERVICE
router.post("/profile-customization/add-service/submit", async (req, res) => {
    console.log("Add service route called");

    const {provider_id, serviceData} = req.body;

    console.log("Received provider_id:", provider_id);
    console.log("Received newService data:", serviceData);

    try {
        const response = await providerController.addNewService(provider_id, serviceData);
        if (!response) {
            return res.json({ message: "Failed to add service" });
        }
        console.log("Added service ", response.newService);
        const newService = response.newService;
        res.json({ message: "Service added successfully", newService });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

//UPDATE SERVICE
router.post("/profile-customization/update-service/:service_id/submit", async (req, res) => {
    console.log("Update service route called");
    const { service_id} = req.params;
    const { provider_id, serviceData } = req.body;

    console.log("Received service_id:", service_id);
    console.log("Received provider_id:", provider_id);
    console.log("Received updatedService data:", serviceData);

    try {
        const response = await providerController.updateService(provider_id, service_id, serviceData);
        if (!response) {
            return res.json({ message: "Failed to update service" });
        }
        console.log("Updated service ", response.updatedService);
        const updatedService = response.updatedService;
        res.json({ message: "Service updated successfully", updatedService});
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});


//DELETE SERVICE
router.post("/profile-customization/delete-service/:service_id/submit", async (req, res) => {
    const { service_id} = req.params;

    console.log("Received service_id:", service_id);

    try {
        const response = await providerController.deleteService(service_id);
        if (!response) {
            return res.json({ message: "Failed to delete service" });
        }
        console.log(response);
        res.json({ message: "Service deleted successfully", serviceData: response.deletedService});
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});


router.get("/dashboard/:user_id", async (req, res) => {
    console.log("Provider Dashboard route was called")
    const { user_id} = req.params;

    console.log("Received user_id:", user_id);

    try {
        const provider = await providerController.getProviderByUserId(user_id);
        if (!provider) {
            return res.json({ message: "Failed to fetch user" });
        }
        console.log("User fetched successfully ", provider);
        res.json({ message: "User fetched successfully", provider});
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});


//UPDATE PROVIDER SOCIALS
router.post("/profile-customization/update-socials/:user_id/submit", async (req, res) => {
    console.log("Update provider socials route called");
    const { user_id } = req.params;

    //console.log("Received user_id:", typeof user_id);
    const socials = req.body;

    console.log("Received user_id:", user_id); 
    console.log("Received socials :", socials);
    try {
        const response = await providerController.updateProviderSocials(user_id, socials);
        if (!response) {
            return res.json({ message: "Failed to update provider" });
        }
        const updatedProvider = response.updatedProvider;
        console.log(updatedProvider);
        res.json({ message: "Updated successfully", updatedProvider });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

router.get("/fetch-provider/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const provider = await providerController.getProviderByUserId(user_id);
        //console.log("Provider:", provider);
        res.json(provider);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/credentials-verification/submit", async (req, res) => {
    console.log("Add verification request route called");

    const {credentialData} = req.body;

    console.log("Received credential data:", credentialData);

    try {
        const response = await providerController.submitCredentialVerification(credentialData);
        if (!response) {
            return res.json({ message: "Failed to submit credential verification" });
        }
        console.log("credential verification ", response.newVerification);
        const newVerification = response.newVerification;
        res.json({ message: "Verification was added successfully", newVerification });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

router.get("/credentials-verification/attempts-list/:provider_id", async (req, res) => {
    const { provider_id } = req.params;
    try {
        const credentials = await providerController.getCredentialsByProviderId(provider_id);
        //console.log("Provider:", provider);
        res.json(credentials);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

module.exports = router;