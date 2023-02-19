const express = require("express");
const verify = require("../middleware/verifyToken");

const router = new express.Router();

// Show All Posts JSON
router.get("/", verify, (req, res) => {
    return res.status(200).json({ message: "Posts Details Fetched Successfully" });
});

module.exports = router;