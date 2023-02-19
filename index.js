const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());

// Homepage
app.get("/", (req, res) => {
    return res.status(200).send("<h1>ExpressJs Application For Authentication API'S</h1>");
});

// Routes
const usersRoutes = require("./routes/users");
app.use("/api/v1.0/user", usersRoutes);
const postsRoutes = require("./routes/posts");
app.use("/api/v1.0/post", postsRoutes);

// MongoDB Database Connection Using Mongoose ODM
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, (error) => {
    if (error) throw error;
    console.log("MongoDB Database Connected Successfully");
});

// Create Server Started On Localhost:8000
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server Started On Localhost:${PORT}`);
});