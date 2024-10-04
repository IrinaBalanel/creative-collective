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
router.post("/profile-customization/:user_id/submit", async (req, res) => {
    const { user_id } = req.params;
    //console.log("Received user_id:", typeof user_id);
    const providerData = req.body;

    //console.log("Received user_id:", user_id);
    try {
        const updatedProvider = await providerController.updateProvider(user_id, providerData);
        if (!updatedProvider) {
            return res.json({ message: "Failed to update provider" });
        }
        res.json({ message: "Updated successfully", updatedProvider });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

//ADD SERVICE
router.post("/profile-customization/add-service/submit", async (req, res) => {
    const { provider_id } = req.body;
    const serviceData = req.body;

    // console.log("Received provider_id:", provider_id);
    // console.log("Received newService data:", serviceData.newService);
    try {
        const response = await providerController.addNewService(provider_id, serviceData);
        if (!response) {
            return res.json({ message: "Failed to add service" });
        }
        res.json({ message: "Service added successfully", newService: response.newService });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});

//UPDATE SERVICE
router.post("/profile-customization/update-service/:service_id/submit", async (req, res) => {
    const { service_id} = req.params;
    const { provider_id, serviceData } = req.body;

    // console.log("Received service_id:", service_id);
    // console.log("Received provider_id:", provider_id);
    // console.log("Received updatedService data:", serviceData);
    try {
        const response = await providerController.updateService(provider_id, service_id, serviceData);
        if (!response) {
            return res.json({ message: "Failed to update service" });
        }
        res.json({ message: "Service updated successfully", serviceData: response.updatedService });
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


module.exports = router;