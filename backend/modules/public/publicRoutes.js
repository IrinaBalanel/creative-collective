const express = require("express");
const router = express.Router();
const publicController = require("./publicController");

// Routes to display users on /admin page
router.get("/", async (req, res) => {
    try {
        // Fetch users using the controller
        const categories = await publicController.getCategories();
        //console.log(categories);
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});


router.get("/professionals", async (req, res) => {
    try {
        // Fetch users using the controller
        const professionals = await publicController.getAllProfessionals();
        //console.log(professionals);
        if(!professionals){
            res.json({ message: "No professionals found"});
        }
        res.json(professionals);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
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
        res.json({ message: "Server Error" });
    }
});


router.get("/professionals/:category/:id", async (req, res) => {
    try {
        const { category, id } = req.params;
        
        const professional = await publicController.getProfessionalByCatAndId(category, id);
        console.log(professional);
        
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
module.exports = router;