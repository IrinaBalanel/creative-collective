const express = require("express");
const router = express.Router();
const providerController = require("./providerController");


router.get("/profile-customization/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const provider = await providerController.getProviderByUserId(user_id);
        console.log("Provider:", provider);
        res.json(provider);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await providerController.getCategories();
        console.log("Categories: ", categories);
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});

router.post("/profile-customization/:user_id/submit", async (req, res) => {
    const { user_id } = req.params;
    //console.log("Received user_id:", typeof user_id);
    const providerData = req.body;

    // console.log("Received user_id:", user_id);
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



module.exports = router;