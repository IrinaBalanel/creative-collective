const express = require("express");
const router = express.Router();
const clientController = require("./clientController");


router.get("/my-favorite-professionals/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const client = await clientController.getFavProfByUserId(user_id);
        //console.log("Provider:", provider);
        if (!client) {
            return res.json({ message: "Failed to fetch favorite professionals" });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

router.post("/my-favorite-professionals/:user_id/:provider_id/submit", async (req, res) => {
    const { user_id, provider_id } = req.params;
    try {
        const client = await clientController.addFavoriteProvider(user_id, provider_id );
        //console.log("client:", client);
        if (!client) {
            return res.json({ message: "Failed to fetch client with new favorite professionals" });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

router.post("/my-favorite-professionals/:user_id/:provider_id/remove", async (req, res) => {
    const { user_id, provider_id } = req.params;
    try {
        const client = await clientController.removeFavoriteProvider(user_id, provider_id );
        //console.log("client:", client);
        if (!client) {
            return res.json({ message: "Failed to fetch client with new favorite professionals" });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});


module.exports = router;


