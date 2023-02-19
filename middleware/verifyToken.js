const Jwt = require("jsonwebtoken");

// Middleware For Verify Token
module.exports = async (req, res, next) => {
    try {
        // Check For Header
        const token = req.header("token");
        if (!token) {
            return res.status(400).json({ message: "Token Not Found" });
        }
        // Check For Unverified
        const verify = Jwt.verify(token, process.env.SECRET_KEY);
        if (!verify) {
            return res.status(401).json({ message: "Unverified Token Found" });
        }
        // Call Middleware After Verified Completely
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Formate Token Found" });
    }
};