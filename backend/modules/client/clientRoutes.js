// const express = require("express");
// const router = express.Router();
// const clientController = require("./clientController");

// // Define your admin routes here
// router.get("/home", (req, res) => {
//     res.send("Welcome to the client home page panel");
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const clientController = require("./clientController");

// Routes to display users on /admin page
router.get("/", async (req, res) => {
    try {
        // Fetch users using the controller
        const categories = await clientController.getCategories();
        console.log(categories);
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.json({ message: "Server Error" });
    }
});


module.exports = router;