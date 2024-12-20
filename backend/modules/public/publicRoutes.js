const express = require("express");
const router = express.Router();
const publicController = require("./publicController");

router.get("/", async (req, res) => {
    try {
        const categories = await publicController.getCategories();
        //console.log(categories);
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});


router.get("/professionals", async (req, res) => {
    try {
        const professionals = await publicController.getAllProfessionals();
        //console.log(professionals);
        if(!professionals){
            res.json({ message: "No professionals found"});
        }
        res.json(professionals);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});


router.get("/professionals/:category", async (req, res) => {
    try {
        // Fetch users using the controller
        const { category } = req.params;
        const professionals = await publicController.getProfessionalsByCat(category);
        //console.log(professionals);
        if(!professionals){
            res.json({ message: "No professionals found"});
        }
        res.json(professionals);

    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});


router.get("/professionals/:category/:id", async (req, res) => {
    try {
        const { category, id } = req.params;
        
        const professional = await publicController.getProfessionalByCatAndId(category, id);
        //console.log(professional);
        
        if(!professional){
            return res.json({ message: "No professional found"});
        }

        if (!category) {
            return res.json({ message: "Category is required" });
        }
        res.json(professional);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});


router.post("/contact-us-form/submit", async (req, res) => {
    //console.log("Contact us form route has been called");
    const { formData } = req.body;

    //console.log("Received form data ", formData); 
    try {
        const response = await publicController.contactUs(formData);
        if (!response) {
            return res.json({ message: "Failed to submit a message" });
        }
        const submittedMessage = response.newMessage;
        //console.log("Submitted message", submittedMessage);
        res.json({ message: "Submitted message successfully", submittedMessage });
    } catch (error) {
        console.error(error.message);
        res.json({ error: "Error" });
    }

});
module.exports = router;