const express = require("express");
const router = express.Router();
const clientController = require("./clientController");

// // Define your admin routes here
router.get("/appointments", async (req, res) => {
    const test = await clientController.test();
    return test;
});

module.exports = router;


