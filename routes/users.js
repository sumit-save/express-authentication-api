const express = require("express");
const usersController = require("../controllers/usersController");

const router = new express.Router();

// New User Signup
router.post("/signup", (req, res) => {
    usersController.Signup(req, res);
});

// New User Signin
router.post("/signin", (req, res) => {
    usersController.Signin(req, res);
});

module.exports = router;