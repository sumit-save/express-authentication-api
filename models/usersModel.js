const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: [ true, "{PATH} is Required" ] },
    fullname: { type: String, trim: true,required: [ true, "{PATH} is Required" ] },
    email: { type: String, trim: true, required: [ true, "{PATH} is Required" ] },
    password: { type: String, trim: true, required: [ true, "{PATH} is Required" ] },
    isActive: { type: Boolean, trim: true, required: [ true, "{PATH} is Required" ] }
}, { timestamps: true });

module.exports = mongoose.model("users", usersSchema);