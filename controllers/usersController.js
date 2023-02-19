const SALT_WORK_FACTOR = 10;
const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

const Signup = async (req, res) => {
    let { username, fullname, email, password } = req.body;
    try {
        // Check For User Already Exists With Username Or Email
        const userExists = await usersModel.findOne({ $or: [ { username: username }, { email: email } ] });
        if (userExists) {
            return res.status(400).json({ message: "Username Or Email Already Exists" });
        }
        // Generate Salt And Hash
        const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await Bcrypt.hash(password, salt);
        // Insert User Details Into Collection
        const newUser = new usersModel({ username: username, fullname: fullname, email: email, password: hash, isActive: true });
        const savedUser = await newUser.save();
        return res.status(200).json({ message: "User Added Successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong: " + error.message });
    }
}

const Signin = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        // Check Username Or Email Into Collection
        const usernameOrEmailExists = await usersModel.findOne({ $or: [ { username: username }, { email: email } ] });
        if (!usernameOrEmailExists) {
            return res.status(400).json({ message: "Enter Username Or Email Invalid" });
        }
        // Check Password Into Collection
        const matchPassword = await Bcrypt.compare(password, usernameOrEmailExists.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Enter Password Invalid" });
        }
        // Create JSON Webtoken
        const token = Jwt.sign({ email: usernameOrEmailExists.email }, process.env.SECRET_KEY);
        return res.status(200).json({ message: "User Login Successfully", token: token });
    } catch (error) {
        return res.status(400).json({ message: "Something Went Wrong: " + error.message });
    }
}

module.exports = { Signup, Signin };